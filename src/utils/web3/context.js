import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import * as UAuthWeb3Modal from "@uauth/web3modal";
import { BrowserProvider } from "ethers";
import { ChainIds, availableChains } from "./chains";
import { clearLocalItems, getLocalItem, setLocalItem } from "../base";
import { MUNITY_CONFIG } from "./addresses";
import {
  getResponseFromUri,
  uploadFileToIPFS,
  uploadJSONToIPFS,
} from "../pinata/tools";
import Moralis from "moralis";
import { useAccount, useChainId } from "wagmi";

export const MORALISSDK = Moralis.start({
  apiKey: "j5AxAJv5eBBEU0n4S4IkoOX4lOO3q8dG813cRvRXijb1GVjPSMp4t2EL3c48v9vU",
});

const Web3Modal = dynamic(() => import("web3modal"), { ssr: false });
const UAuthWeb3Modal = dynamic(() => import("@uauth/web3modal"), {
  ssr: false,
});

const Web3Context = createContext(null);

// const web3Modal = new Web3Modal({
//   cacheProvider: true,
//   providerOptions: { connector: UAuthWeb3Modal.connector },
// });

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  const { onChainProvider } = web3Context;
  return useMemo(() => {
    return { ...onChainProvider };
  }, [onChainProvider]);
};

export const Web3ContextProvider = ({ children }) => {
  const { address: connectedWallet } = useAccount(); 

  // const {chain:connectedChainId} = useChainId()
  const connectedChainId = useChainId();

  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState("");
  const [address, setAddress] = useState("");
  const [addressCommunitiesData, setAddressCommunitiesData] = useState([]);
  const [addressCommunitiesDataLoading, setAddressCommunitiesDataLoading] =
    useState(false);
  const [provider, setProvider] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(() => {
    console.log("connectedWallet", connectedWallet);
    if (connectedWallet) {
      setAddress(connectedWallet);
      setConnected(true);
      setLocalItem("connected_address", connectedWallet);
      setLocalItem("connected_state", true);
    } else {
      setConnected(false);
      setAddress("");
      clearLocalItems();
    }
  }, [connectedWallet]);

  useEffect(() => {
    console.log("connectedChainId", connectedChainId);
    if (connectedChainId) {
      setChainId(connectedChainId);
      setLocalItem("connected_chain", connectedChainId);
    } else {
      setChainId("");
    }
  }, [connectedChainId]);

  useEffect(() => {
    const initWeb3Modal = async () => {
      const Web3Modal = (await import("web3modal")).default;
      const UAuthWeb3Modal = (await import("@uauth/web3modal")).default;

      const newWeb3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: { connector: UAuthWeb3Modal.connector },
      });

      UAuthWeb3Modal.registerWeb3Modal(newWeb3Modal);
      setWeb3Modal(newWeb3Modal);
    };

    initWeb3Modal();
  }, []);

  const alertMessage = (message, type = 0) => {
    if (type == 0) {
      message = "Default : " + message;
    } else if (type == 1) {
      message = "Success : " + message;
    } else if (type == 2) {
      message = "Error : " + message;
    } else if (type == 3) {
      message = "Warn : " + message;
    }
    alert(message);
  };

  const hasCachedProvider = useCallback(() => {
    if (!web3Modal) return false;
    UAuthWeb3Modal.registerWeb3Modal(web3Modal);
    return !!web3Modal.cachedProvider;
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    clearLocalItems();
    setConnected(false);
    setProvider(null);
    setAddress("");
    setChainId("");
  }, [web3Modal]);

  const _initListeners = useCallback(
    (rawProvider) => {
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on("accountsChanged", async () => {
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("chainChanged", async (chain) => {
        let newChainId;
        // On mobile chain comes in as a number but on web it comes in as a hex string
        if (typeof chain === "number") {
          newChainId = chain;
        } else {
          newChainId = parseInt(chain, 16);
        }
        if (!Object.keys(availableChains).includes("" + newChainId)) {
          setProvider(null);
          disconnect();
        } else connect(newChainId);
      });

      rawProvider.on("network", (_newNetwork, oldNetwork) => {
        if (!oldNetwork) return;
        window.location.reload();
      });
    },
    [disconnect]
  );

  const switchChain = useCallback(async (targetChain) => {
    const chainId = "0x" + targetChain.toString(16);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      return true;
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                chainName: availableChains[targetChain].chainName,
                nativeCurrency: {
                  symbol: availableChains[targetChain].symbol,
                  decimals: availableChains[targetChain].decimals,
                },
                blockExplorerUrls:
                  availableChains[targetChain].blockExplorerUrls,
                rpcUrls: availableChains[targetChain].rpcUrls,
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error(addError);
          return false;
        }
      } else {
        console.error(e);
        return false;
      }
    }
  }, []);

  const connect = useCallback(
    async (_targetChain) => {
      // const currentChainId = Number(getLocalItem("connected_chain"))
      const targetChain = _targetChain ? _targetChain : ChainIds.Ethereum;
      // console.log("_targetChain before:", _targetChain,"currentChainId",currentChainId);
      console.log("targetChain before:", targetChain);
      // console.log("before:", targetChain);
      if (!Object.keys(availableChains).includes("" + targetChain)) {
        web3Modal.clearCachedProvider();
        const switched = await switchChain(ChainIds.Ethereum);
        if (!switched) {
          console.error(
            "Unable to connect. Please change network using provider.1"
          );
          return;
        }
      }

      let rawProvider;
      try {
        rawProvider = await web3Modal.connect();
      } catch (error) {
        return;
      }

      _initListeners(rawProvider);
      let connectedProvider = new BrowserProvider(rawProvider, "any");
      let connectedChainId = await connectedProvider
        .getNetwork()
        .then((network) =>
          typeof network.chainId === "number"
            ? network.chainId
            : parseInt(network.chainId)
        );
      // console.log(
      //   "connectedChainId:",
      //   connectedChainId,
      //   "targetChain:",
      //   targetChain
      // );
      if (connectedChainId !== targetChain) {
        web3Modal.clearCachedProvider();
        const switched = await switchChain(targetChain);
        if (!switched) {
          console.error(
            "Unable to connect. Please change network using provider.2"
          );
          return;
        }
      }

      try {
        rawProvider = await web3Modal.connect();
      } catch (error) {
        return;
      }

      _initListeners(rawProvider);
      connectedProvider = new BrowserProvider(rawProvider, "any");
      connectedChainId = await connectedProvider
        .getNetwork()
        .then((network) =>
          typeof network.chainId === "number"
            ? network.chainId
            : parseInt(network.chainId)
        );

      const connectedAddress = await (
        await connectedProvider.getSigner()
      ).getAddress();

      setChainId(connectedChainId);
      setAddress(connectedAddress);
      setProvider(connectedProvider);
      setConnected(true);
      setLocalItem("connected_chain", connectedChainId);
      setLocalItem("connected_address", connectedAddress);
      setLocalItem("connected_state", true);

      return {
        connectedProvider: connectedProvider,
        address: connectedAddress,
      };
    },
    [_initListeners, switchChain]
  );

  useEffect(() => {
    if (web3Modal && getLocalItem("connected_state")) {
      connect(+getLocalItem("connected_chain", ChainIds.Ethereum));
    }
  }, [connect, web3Modal]);

  //========================== CONTRACT =========================

  function isBoolean(param) {
    return typeof param === "boolean";
  }

  async function getLatestBlockNumber() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request the user to enable the app to connect to MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create a new provider using window.ethereum
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get the latest block number
        const blockNumber = await provider.getBlockNumber();

        console.log(
          "getLatestBlockNumber The latest block number is:",
          blockNumber
        );
        return blockNumber;
      } catch (error) {
        console.error("getLatestBlockNumber An error occurred:", error);
        return null;
      }
    } else {
      console.error("getLatestBlockNumber Please install MetaMask!");
      return null;
    }
  }

  const getMunityContract = async () => {
    if (address !== "") {
      try {
        // const provider = new ethers.BrowserProvider(MUNITY_CONFIG[chainId==ChainIds.Ethereum?ChainIds.Ethereum:ChainIds.Polygon].rpcUrl);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const munityContract = new ethers.Contract(
          // MUNITY_CONFIG[chainId==ChainIds.Ethereum?ChainIds.Ethereum:ChainIds.Polygon].address,
          // MUNITY_CONFIG[chainId==ChainIds.Ethereum?ChainIds.Ethereum:ChainIds.Polygon].abi,
          MUNITY_CONFIG[chainId].address,
          MUNITY_CONFIG[chainId].abi,
          signer
        );
        // console.log("munityContract",munityContract);
        // console.log("munityContract",await munityContract.owner());
        return munityContract;
      } catch (error) {
        console.error("Error ", error);
        return null;
      }
    }
  };

  const getMunityContractToRead = async () => {
    if (chainId != "") {
      try {
        // console.log("CHain",chainId)

        // console.log("ddadadaa",MUNITY_CONFIG[chainId==ChainIds.Ethereum?ChainIds.Ethereum:ChainIds.Polygon]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const munityContract = new ethers.Contract(
          // MUNITY_CONFIG[chainId==ChainIds.Ethereum?ChainIds.Ethereum:ChainIds.Polygon].address,
          // MUNITY_CONFIG[chainId==ChainIds.Ethereum?ChainIds.Ethereum:ChainIds.Polygon].abi,
          MUNITY_CONFIG[chainId].address,
          MUNITY_CONFIG[chainId].abi,
          provider
        );
        return munityContract;
      } catch (error) {
        console.error("Error ", error);
        return null;
      }
    }
  };

  //   useEffect(() => {
  //   getMunityContract()
  // }, [address])

  //================== STATES =============================
  const [contractState, setContractState] = useState({
    name: null,
    symbol: null,
    communityFee: null,
    communityFeeRecipient: null,
  });

  const [ownerAddress, setOwnerAddress] = useState(null);
  const [isAddressOwner, setIsAddressOwner] = useState(false);

  useEffect(() => {
    setIsAddressOwner(
      address != "" &&
        ownerAddress &&
        address.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()
        ? true
        : false
    );
  }, [address, ownerAddress]);

  //================== READS =============================

  //royaltyInfo

  const getContractState = async () => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const owner = await contract.owner();
      setOwnerAddress(owner.toLowerCase());

      const contractName = await contract.name();
      const symbol = await contract.symbol();
      const communityFee = await contract.getCommunityFee();
      const communityFeeRecipient = await contract.getPlatformFeeRecipient();

      setContractState({
        name: contractName,
        symbol: symbol,
        communityFee: communityFee.toString(),
        communityFeeRecipient: communityFeeRecipient.toLowerCase(),
      });
    }
  };

  const getCommunityURI = async (communityId) => {
    if (Number(communityId) == 0) return null;
    const contract = await getMunityContractToRead();
    if (contract) {
      const uri = await contract.uri(String(communityId));
      console.log(uri);
      return uri;
    } else {
      return null;
    }
  };

  const isUserWhiteListed = async (communityId, userAddres) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const response = await contract.isWhiteListed(
        String(communityId),
        userAddres
      );
      return response;
    } else {
      return false;
    }
  };

  const getUserCommunityMinting = async (communityId, userAddres) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      const noOfMinting = await contract.getMinting(
        userAddres,
        String(communityId)
      );
      console.log(noOfMinting.toString());
      return noOfMinting.toString();
    } else {
      return "0";
    }
  };

  const getCommunityDetailsById = async (communityId) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      // console.log("Hiiiit",communityId)
      let totalNoOfCommunities = await contract?.totalCommunities();
      // let totalNoOfCommunities = 0
      if (
        Number(communityId) == 0 ||
        Number(totalNoOfCommunities) < Number(communityId)
      ) {
        // console.log(Number(await contract.totalCommunities()),"RABEEB",communityId,totalNoOfCommunities)
        return null;
      }

      const res = await contract.getCommunityDetails(String(communityId));
      const uri = await contract.uri(String(communityId));
      const uriData = await getResponseFromUri(uri);

      // console.log({
      //   communityData:uriData,
      //   price: res[0].toString(),
      //   supply: res[1].toString(),
      //   discount: res[2].toString(),
      //   creator: res[3].toLowerCase(),
      // });
      return {
        chainId,
        communityId,
        communityData: uriData,
        price: res[0].toString(),
        supply: res[1].toString(),
        discount: res[2].toString(),
        creator: res[3].toLowerCase(),
      };
    } else {
      return null;
    }
  };

  const getUserCommunityBalance = async (userAddres, communityId) => {
    const contract = await getMunityContractToRead();
    // console.log("hiiiiiiiiiiiiiiiiiiiit",{userAddres, communityId});
    const totalNoOfNft = await contract.balanceOf(
      userAddres,
      String(communityId)
    );
    console.log(totalNoOfNft.toString());
    return totalNoOfNft.toString();
  };

  const getBatchUserCommunityBalance = async (userAddresses, communityIds) => {
    const contract = await getMunityContractToRead();
    if (contract) {
      if (
        !(
          userAddresses.length > 0 &&
          userAddresses.length === communityIds.length
        )
      ) {
        console.log("Invalid array of parameters provided");
        return [];
      }
      let totalNoOfNft = await contract.balanceOfBatch(
        userAddresses,
        communityIds
      );
      totalNoOfNft = totalNoOfNft.map((number, i) => {
        return {
          address: userAddresses[i],
          communityId: communityIds[i],
          balance: number.toString(),
        };
      });
      console.log(totalNoOfNft);
      return totalNoOfNft;
    } else {
      return [];
    }
  };

  const getTotalCommunitiesRegistered = async () => {
    const contract = await getMunityContractToRead();
    if (contract) {
      let totalNoOfCommunities = await contract.totalCommunities();

      //  console.log("sdjfhbsdkfbsldiufwe",totalNoOfCommunities);
      return Number(totalNoOfCommunities);
    } else {
      return null;
    }
  };

  const getUserAllCommunitiesRegistered = async (userAddresses, _chainId) => {
    try {
      setAddressCommunitiesDataLoading(true);
      const latestBlock = await getLatestBlockNumber()
      console.log("getUserAllCommunitiesRegistered", userAddresses, _chainId);
    
      const topic = "0x1e4089ace5d0cd6d2af8387227e93295f77ffe5ffd68c974fbfab9b9f718a6a7"; //CommunityRegistered
    
      const abi =  {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "_by", type: "address" },
          { indexed: false, internalType: "uint256", name: "_id", type: "uint256" },
        ],
        name: "CommunityRegistered",
        type: "event",
      };
      const response = await Moralis.EvmApi.events.getContractEvents({
        address:MUNITY_CONFIG[chainId].address,
        chain: availableChains[chainId].chainHex,
        topic,        
        limit: 500,
        order: "DESC",
        fromBlock: MUNITY_CONFIG[chainId].creationBlock, //1st community registered block no
        toBlock: latestBlock, 
        abi,
      });
    const RESULT = response.toJSON().result

    
    
    const userCommunityIds = RESULT
    .filter(commnuity => commnuity.data._by === userAddresses.toLowerCase())
    .map(commnuity => commnuity.data._id);
    
    console.log("getUserAllCommunitiesRegistered", userAddresses, userCommunityIds);

        let allCommunityData = [];
        for (let idx = 0; idx < userCommunityIds.length; idx++) {
          const currentID = userCommunityIds[idx];
          const communityData = await getCommunityDetailsById(currentID);
          const joinedUsers = await getCommunityJoinedMembers(
            currentID,
            communityData.chainId
          );
          communityData.joinedUsers = joinedUsers;
          if (communityData) allCommunityData.push(communityData);
        }

        // console.log("allCommunityData",allCommunityData);
        setAddressCommunitiesData(allCommunityData);
        setAddressCommunitiesDataLoading(false);

        return allCommunityData;
     
    } catch (error) {
      console.log("getUserAllCommunitiesRegistered Error", error.message);
      setAddressCommunitiesData([]);
      setAddressCommunitiesDataLoading(false);

      return [];
    }
  };
  const [allCommunitiesMainLoading, setAllCommunitiesMainLoading] =
    useState(false);
  const [allCommunitiesMain, setAllCommunitiesMain] = useState([]);
  const getAllRegisteredCommunities = async () => {
    try {
      setAllCommunitiesMainLoading(true);
      const contract = await getMunityContractToRead();
      // console.log("allCommunityData here",{contract});
      if (contract) {
        const total = await getTotalCommunitiesRegistered();
        console.log("getTotalCommunitiesRegistered", total);

        let allCommunityData = [];
        for (let _id = 1; _id <= Number(total); _id++) {
          const data = await getCommunityDetailsById(_id);
          if (data) {
            const joinedUsers = await getCommunityJoinedMembers(
              _id,
              data.chainId
            );
            allCommunityData.push({
              _id,
              title: data?.communityData ? data?.communityData?.name : null,
              // communityIMG: data?.communityData
              community_avatar: data?.communityData?.avatarImage
                ? data?.communityData?.avatarImage
                : "/images/community01.png",
              users: joinedUsers ? joinedUsers.result.length : "0",
              slotsLeft: data?.supply ?? "0",
              url: `community/${_id}`,
            });

            if (_id === 9) {
              setAllCommunitiesMainLoading(false);
              setAllCommunitiesMain(allCommunityData);
            }
          }
        }

        console.log("allCommunityData", allCommunityData);
        setAllCommunitiesMain(allCommunityData);
        setAllCommunitiesMainLoading(false);
      } else {
        setAllCommunitiesMainLoading(false);
        setAllCommunitiesMain([]);
      }
    } catch (error) {
      setAllCommunitiesMain([]);
    } finally {
      setAllCommunitiesMainLoading(false);
    }
  };

  //================== WRITES =============================
  const [registerCommunityLoading, setRegisterCommunityLoading] =
    useState(false);
  const registerCommunity = async (nftData) => {
    setRegisterCommunityLoading(true);
    let {
      name,
      community_nft_image,
      community_avatar,
      community_banner,
      description,
      minting_price,
      key_quantity,
      discount,
    } = nftData;
    // console.log("registerCommunity", {
    //   name,
    //   community_nft_image,
    //   community_avatar,
    //   community_banner,
    //   description,
    //   minting_price,
    //   key_quantity,
    //   discount,
    // });
    try {
      if (!community_avatar || !community_banner || !community_nft_image) {
        throw new Error(
          "Provide community nft image, community avatar and community banner"
        );
      }
      if (!name || !minting_price || !key_quantity || !description) {
        throw new Error("Provide other fields");
      }
      discount = discount ? Number(discount) * 10 : 0;
      minting_price = ethers.parseEther(minting_price.toString()).toString();
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      const communityNftImageRes = await uploadFileToIPFS(community_nft_image);

      if (!communityNftImageRes.success) {
        throw new Error("Error Uploading NFT Image");
      }

      const communityAvatarRes = await uploadFileToIPFS(community_avatar);

      if (!communityAvatarRes.success) {
        throw new Error("Error Uploading NFT Avatar");
      }

      const communityBannerRes = await uploadFileToIPFS(community_banner);

      if (!communityBannerRes.success) {
        throw new Error("Error Uploading NFT Banner Image");
      }

      const nftJSON = {
        name: `${name}`,
        description: `${description}`,
        image: `${communityNftImageRes.pinataURL}`,
        bannerImage: `${communityBannerRes.pinataURL}`,
        avatarImage: `${communityAvatarRes.pinataURL}`,
      };

      const NFTuriLinkRes = await uploadJSONToIPFS(nftJSON);

      if (!NFTuriLinkRes.success) {
        throw new Error("Error Uploading NFT URI JSON");
      }

      // console.log("ggggggggggggg", {
      //   minting_price,
      //   key_quantity,
      //   discount,
      //   url: NFTuriLinkRes.pinataURL,
      // });

      const tx = await contract.registerCommunity(
        minting_price,
        key_quantity,
        discount,
        NFTuriLinkRes.pinataURL
      );
      // console.log("tx1:", tx);
      const eventdata = await tx.wait();
      // console.log("tx2:", tx);
      // Filter events
      const events = await contract.queryFilter(
        "CommunityRegistered",
        eventdata.blockNumber
      );
      // return ethers.utils.formatEther(events[0].args[1]._hex);

      //   const eventFilter = contract.filters.CommunityRegistered(address);
      //   const events = await contract.queryFilter(
      //     eventFilter,
      //     MUNITY_CONFIG[chainId]?.creationBlock
      //   );
      // console.log("events",events);
      //last and the latest event of registration
      const registeredCommunityId = events[0]?.args[1]?.toString();
      console.log("registeredCommunityId", registeredCommunityId);
      alertMessage("Community Registration Successful", 1);

      return { contract_community_id: registeredCommunityId, isExecuted: true };
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.message);
      return { isExecuted: false };
    } finally {
      setRegisterCommunityLoading(false);
    }
  };

  const getCommunityNftPayAmount = async (communityId, tokenAmountsToBuy) => {
    let payAmount = 0;
    let discountPerSupply = 0;
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const _details = await contract.getCommunityDetails(String(communityId));

      const supplyLeft = _details[1].toString();
      const creator = _details[3].toLowerCase();
      let pricePerSupply = parseFloat(
        ethers.formatEther(_details[0].toString())
      );
      const discountPercentage = parseFloat(_details[2].toString());
      const isCreator = creator == address.toLocaleLowerCase();
      let isWhiteListed = false;

      if (!isCreator) {
        isWhiteListed = await contract.isWhiteListed(
          String(communityId),
          address
        );
        if (isWhiteListed) {
          discountPerSupply = (pricePerSupply * discountPercentage) / 1000;
          pricePerSupply = pricePerSupply - discountPerSupply;

          payAmount = pricePerSupply * parseFloat(tokenAmountsToBuy);
        } else {
          payAmount = pricePerSupply * parseFloat(tokenAmountsToBuy);
        }
      }

      return {
        communityId,
        tokenAmountsToBuy,
        payAmount,
        discountPerSupply,
        isCreator,
        pricePerSupply,
        isWhiteListed,
        supplyLeft,
        error: false,
      };
    } catch (err) {
      console.error(err.message);
      return {
        communityId,
        tokenAmountsToBuy,
        payAmount,
        discountPerSupply,
        isCreator: false,
        pricePerSupply: 0,
        isWhiteListed: false,
        error: true,
        supplyLeft: 0,
      };
    } finally {
    }
  };

  const buyCommunityNft = async (communityId, tokenAmountsToBuy, payAmount) => {
    console.log("here", { communityId, tokenAmountsToBuy, payAmount });

    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const tx = await contract.buy(communityId, tokenAmountsToBuy, {
        value: payAmount,
      });
      await tx.wait();
      alertMessage("Community Key Minted Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.message);
      return false;
    } finally {
    }
  };

  const addMoreCommunitySupply = async (communityId, tokenAmountsToAdd) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      if (Number(tokenAmountsToAdd) <= 0) {
        throw new Error("Amount cant be zero or less");
      }
      const tx = await contract.addSupply(communityId, tokenAmountsToAdd);
      await tx.wait();

      alertMessage("More Supply Added To Community Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.reason || err.message || "Something went wrong!");
      return false;
    } finally {
    }
  };

  const addMoreCommunityWhiteListings = async (communityId, addressesArray) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const tx = await contract.addWhiteListing(communityId, addressesArray);
      await tx.wait();

      alertMessage("Address List added to Community Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.reason || err.message || "Something went wrong!");
      return false;
    } finally {
    }
  };

  const changeCommunityUri = async (communityId, newUriString) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const tx = await contract.changeUri(communityId, newUriString);
      await tx.wait();

      alertMessage("New Community Uri Updated Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.reason || err.message || "Something went wrong!");
      return false;
    } finally {
    }
  };

  const removeCommunityWhiteListings = async (communityId, addressesArray) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      const tx = await contract.removeWhiteListing(communityId, addressesArray);
      await tx.wait();

      alertMessage("Address List removed from Community Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.reason || err.message || "Something went wrong!");
      return false;
    } finally {
    }
  };

  const changeCommunityDiscount = async (communityId, discountInBips) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      if (Number(discountInBips) > 1000) {
        throw new Error("Invalid community discount");
      }

      const tx = await contract.changeDiscount(communityId, discountInBips);
      await tx.wait();
      alertMessage("Community Discount Percentage Updated Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.reason || err.message || "Something went wrong!");
      return false;
    } finally {
    }
  };

  const changeCommunityTokenPrice = async (communityId, newPriceInWei) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      if (Number(newPriceInWei) <= 0) {
        throw new Error("Invalid community newPrice");
      }

      const tx = await contract.changePrice(communityId, newPriceInWei);
      await tx.wait();
      alertMessage("Community New Price Updated Successfully", 1);

      return true;
    } catch (err) {
      alertMessage(err.reason || err.message || "Something went wrong!", 2);
      console.error(err.message);
      return false;
    } finally {
    }
  };

  const setNewRoyaltyInfo = async (_receiver, _royaltyFeesInBipsImWei) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }

      if (Number(_royaltyFeesInBipsImWei) < 0) {
        throw new Error("Invalid community newPrice");
      }

      const tx = await contract.setRoyaltyInfo(
        _receiver,
        _royaltyFeesInBipsImWei
      );
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

  // haveAccess:boolean
  const setApprovalForAll = async (_operator, haveAccess) => {
    try {
      const contract = await getMunityContract();
      if (!contract) {
        throw new Error("Contract instance not found");
      }
      if (!isBoolean(haveAccess)) {
        throw new Error("Invalid access parameter");
      }

      const tx = await contract.setApprovalForAll(_operator, haveAccess);
      await tx.wait();

      return true;
    } catch (err) {
      console.error(err.message);
      // console.log(err.reason);
      return false;
    } finally {
    }
  };

  const getCommunityJoinedMembers = async (communityId, chainId) => {
    if (Number(communityId) == 0) return [];

    try {
      const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
        chain: availableChains[chainId].chainHex,
        format: "decimal",
        address: MUNITY_CONFIG[chainId].address,
        tokenId: communityId,
        normalizeMetadata: false,
        mediaItems: false,
      });

      // console.log("getCommunityJoinedMembers", response?.hasNext());
      // const nextData = await response?.next();
      // console.log("getCommunityJoinedMembers nextData", nextData);
      const data = response?.jsonResponse;
      console.log("getCommunityJoinedMembers", { communityId, ...data });

      return { communityId, ...data };
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    if (chainId != "") {
      // getAllRegisteredCommunities();
    }
  }, [chainId]);

  useEffect(() => {
    if (address !== "" && chainId !== "") {
      getUserAllCommunitiesRegistered(address, chainId);
    } else {
      setAddressCommunitiesData([]);
    }
  }, [address, chainId]);

  //================== TEST CODE =================
  useEffect(() => {
    const adds = [
      "0x808f0597D8B83189ED43d61d40064195F71C0D15",
      "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4",
    ];
    const ids = ["1", "1"];

    if (address !== "" && chainId !== "") {
      // any function
    }
  }, [address, chainId]);

  const onChainProvider = useMemo(
    () => ({
      connected,
      address,
      chainId,
      addressCommunitiesDataLoading,
      // connect,
      // disconnect,
      // provider,
      // web3Modal,
      // hasCachedProvider,
      // switchChain,
      //======= READ FUNCTIONS =====
      addressCommunitiesData,
      contractState,
      ownerAddress,
      isAddressOwner,
      getContractState,
      getCommunityURI,
      isUserWhiteListed,
      getUserCommunityMinting,
      getCommunityDetailsById,
      getUserCommunityBalance,
      getBatchUserCommunityBalance,
      getTotalCommunitiesRegistered,
      allCommunitiesMain,
      allCommunitiesMainLoading,
      getAllRegisteredCommunities,
      //======= WRITE FUNCTIONS =====
      getCommunityJoinedMembers,
      registerCommunityLoading,
      setRegisterCommunityLoading,
      registerCommunity,
      getCommunityNftPayAmount,
      buyCommunityNft,
      addMoreCommunitySupply,
      addMoreCommunityWhiteListings,
      changeCommunityUri,
      removeCommunityWhiteListings,
      changeCommunityTokenPrice,
      changeCommunityDiscount,
      setNewRoyaltyInfo,
      setApprovalForAll,
      getUserAllCommunitiesRegistered,
      alertMessage,
      getCommunityJoinedMembers,
      addressCommunitiesDataLoading,
    }),
    [
      connected,
      address,
      chainId,
      addressCommunitiesDataLoading,
      // connect,
      // disconnect,
      // provider,
      // web3Modal,
      // hasCachedProvider,
      // switchChain,
      //======= READ FUNCTIONS =====
      addressCommunitiesData,
      contractState,
      ownerAddress,
      isAddressOwner,
      getContractState,
      getCommunityURI,
      isUserWhiteListed,
      getUserCommunityMinting,
      getCommunityDetailsById,
      getUserCommunityBalance,
      getBatchUserCommunityBalance,
      getTotalCommunitiesRegistered,
      allCommunitiesMain,
      allCommunitiesMainLoading,
      getAllRegisteredCommunities,
      //======= WRITE FUNCTIONS =====
      getCommunityJoinedMembers,
      registerCommunityLoading,
      setRegisterCommunityLoading,
      registerCommunity,
      getCommunityNftPayAmount,
      buyCommunityNft,
      addMoreCommunitySupply,
      addMoreCommunityWhiteListings,
      changeCommunityUri,
      removeCommunityWhiteListings,
      changeCommunityTokenPrice,
      changeCommunityDiscount,
      setNewRoyaltyInfo,
      setApprovalForAll,
      getUserAllCommunitiesRegistered,
      alertMessage,
      getCommunityJoinedMembers,
    ]
  );

  return (
    <Web3Context.Provider value={{ onChainProvider }}>
      {children}
    </Web3Context.Provider>
  );
};
