import { ZeroAddress } from "ethers";
import { addresses } from "./addresses";
import { ChainIds } from "./chains";
import * as assets from "../../../public";

export const currencies = {
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    icon: assets.tokens.ETH,
    addresses: {
      [ChainIds.Ethereum]: ZeroAddress,
      [ChainIds.Polygon]: ZeroAddress,
    },
  },
  WETH: {
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
    icon: assets.tokens.WETH,
    addresses: {
      [ChainIds.Ethereum]: addresses[ChainIds.Ethereum].addresses["WETH"],
      [ChainIds.Polygon]: addresses[ChainIds.Polygon].addresses["WETH"],
    },
  },
  MATIC: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
    icon: assets.tokens.MATIC,
    addresses: {
      [ChainIds.Ethereum]: ZeroAddress,
      [ChainIds.Polygon]: ZeroAddress,
    },
  },
  WMATIC: {
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    icon: assets.tokens.WMATIC,
    addresses: {
      [ChainIds.Ethereum]: addresses[ChainIds.Ethereum].addresses["WMATIC"],
      [ChainIds.Polygon]: addresses[ChainIds.Polygon].addresses["WMATIC"],
    },
  },
  DAI: {
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    icon: assets.tokens.DAI,
    addresses: {
      [ChainIds.Ethereum]: addresses[ChainIds.Ethereum].addresses["DAI"],
      [ChainIds.Polygon]: addresses[ChainIds.Polygon].addresses["DAI"],
    },
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    icon: assets.tokens.USDC,
    addresses: {
      [ChainIds.Ethereum]: addresses[ChainIds.Ethereum].addresses["USDC"],
      [ChainIds.Polygon]: addresses[ChainIds.Polygon].addresses["USDC"],
    },
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    icon: assets.tokens.USDT,
    addresses: {
      [ChainIds.Ethereum]: addresses[ChainIds.Ethereum].addresses["USDT"],
      [ChainIds.Polygon]: addresses[ChainIds.Polygon].addresses["USDT"],
    },
  },
};
