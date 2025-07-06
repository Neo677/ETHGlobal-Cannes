require('@nomicfoundation/hardhat-toolbox');
require('@oasisprotocol/sapphire-hardhat');
require('dotenv').config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    "sapphire-testnet": {
      url: "https://testnet.sapphire.oasis.io",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 23295, // 0x5aff in decimal
    },
  },
};
