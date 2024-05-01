import { IS_TEST_MODE } from "@/context/RinbowkitWagmiContext";
import * as assets from "../../../public";

export const ChainIds = {
  Ethereum: IS_TEST_MODE ? 11155111 : 1,
  Polygon: IS_TEST_MODE ? 80001 : 137,
};

export const availableChains = {
  [ChainIds.Ethereum]: {
    chainName: IS_TEST_MODE?"Sepolia":"Ethereum",
    rpcUrls: IS_TEST_MODE?["https://sepolia.infura.io/v3/"]:[""],
    decimals: 18,
    chainHex: IS_TEST_MODE?"0xaa36a7":"0x1",
    symbol: "ETH",
    icon: assets.tokens.ETH,
    blockExplorerUrls: IS_TEST_MODE?["https://sepolia.etherscan.io/"]:["https://etherscan.io/"],
  },
  [ChainIds.Polygon]: {
    chainName: IS_TEST_MODE?"Mumbai":"Polygon",
    rpcUrls: IS_TEST_MODE?[
      "https://polygon-mumbai.g.alchemy.com/v2/nG6gQkQMe3IEDIcpfbtRyF1MC1FhP-b6",
    ]:[""],
    decimals: 18,
    chainHex: IS_TEST_MODE?"0x13881":"0x89",
    symbol: "MATIC",
    icon: assets.tokens.MATIC,
    blockExplorerUrls: IS_TEST_MODE?["https://mumbai.polygonscan.com/"]:["https://polygonscan.com/"],
  },
};

export const defaultChain = ChainIds.Ethereum;

// export const ChainIds = {
//   Ethereum: 1,
//   Polygon: 137,
// };

// export const availableChains = {
//   [ChainIds.Ethereum]: {
//     chainName: "Ethereum Mainnet",
//     rpcUrls: ["https://mainnet.infura.io/v3/84842078b09946638c03157f83405213"],
//     decimals: 18,
//     symbol: "ETH",
//     icon: assets.tokens.ETH,
//     blockExplorerUrls: ["https://etherscan.io/"],
//   },
//   [ChainIds.Polygon]: {
//     chainName: "Polygon",
//     rpcUrls: ["https://polygon.llamarpc.com/"],
//     decimals: 18,
//     symbol: "MATIC",
//     icon: assets.tokens.MATIC,
//     blockExplorerUrls: ["https://polygonscan.com/"],
//   },
// };

// export const defaultChain = ChainIds.Ethereum;
