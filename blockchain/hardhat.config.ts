import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sapphireTestnet: {
      url: "https://testnet.sapphire.oasis.dev",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 23295,
      gasPrice: 1000000000, // 1 gwei
    },
    sapphireMainnet: {
      url: "https://sapphire.oasis.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 23294,
      gasPrice: 1000000000, // 1 gwei
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  etherscan: {
    apiKey: {
      sapphireTestnet: "not-needed",
      sapphireMainnet: "not-needed",
    },
    customChains: [
      {
        network: "sapphireTestnet",
        chainId: 23295,
        urls: {
          apiURL: "https://explorer.testnet.oasis.io/api",
          browserURL: "https://explorer.testnet.oasis.io",
        },
      },
      {
        network: "sapphireMainnet",
        chainId: 23294,
        urls: {
          apiURL: "https://explorer.oasis.io/api",
          browserURL: "https://explorer.oasis.io",
        },
      },
    ],
  },
};

export default config;
