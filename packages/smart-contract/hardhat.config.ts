import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { EtherscanConfig } from "@nomicfoundation/hardhat-verify/types";
require('dotenv').config()

const config: HardhatUserConfig&{etherscan:Partial<EtherscanConfig>} = {
  solidity: {
    version:"0.8.24",
    settings:{
      evmVersion:"london",
      viaIR:true,
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    }
  },
  networks: {
    development: {
      url: "http://127.0.0.1:8545",     // Localhost (default: none)
      chainId: 31337,
    },
    sepolia: {
      url: `${process.env.SEPOLIA_RPC_URL}`,
      chainId: 11155111, // Sepolia's network ID
      accounts:{
        mnemonic:`${process.env.MNEMONIC}`,
      }
    }
    //
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  paths:{
    cache:"./build/cache",
    artifacts:"./build/artifacts"
  },
  typechain:{
    outDir:"build/typechain-types"
  }
};

export default config;
