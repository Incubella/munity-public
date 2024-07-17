import { useEffect, useState } from "react";
import { Contract, isAddress, MaxUint256, toBigInt, ZeroAddress } from "ethers";
import erc20Abi from "../abis/erc20.json";

export const useTokenInfo = (token, from, to, provider) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState(toBigInt(0));
  const [allowance, setAllowance] = useState(toBigInt(0));

  useEffect(() => {
    const fetchNS = async () => {
      const contract = new Contract(token, erc20Abi, provider);
      setName(await contract["name"]());
      setSymbol(await contract["symbol"]());
    };

    const fetchAB = async () => {
      try {
        if (token === ZeroAddress) {
          setBalance(await provider.getBalance(from));
          setAllowance(MaxUint256);
          return;
        }
        const contract = new Contract(token, erc20Abi, provider);
        setBalance(await contract["balanceOf"](from));
        setAllowance(await contract["allowance"](from, to));
      } catch (e) {
        console.warn(`Error fetching token info, ${e}`);
      }
    };

    if (isAddress(token)) fetchNS();
    if (isAddress(token) && isAddress(from) && isAddress(to) && !!provider)
      fetchAB();
  }, [token, from, to, provider]);

  return { name, symbol, balance, allowance };
};

export const getTokenInfo = async (address, provider) => {
  const token = new Contract(address, erc20Abi, provider);
  const name = await token["name"]();
  const symbol = await token["symbol"]();
  return { name, symbol };
};

export const approveToken = async (token, to, amount, provider) => {
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const contract = new Contract(token, erc20Abi, signer);
  const { symbol } = await getTokenInfo(token, provider);
  if (symbol === "USDT") {
    const allowance = await contract["allowance"](address, to);
    if (!allowance.isZero()) {
      const tx = await contract["approve"](to, toBigInt(0));
      await tx.wait();
    }
  }
  return contract["approve"](to, amount);
};
