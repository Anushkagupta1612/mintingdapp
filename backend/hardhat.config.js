require( "@nomiclabs/hardhat-waffle" );
require( "@nomiclabs/hardhat-etherscan" );
require( 'dotenv' ).config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const RINKEBY_URL = process.env.RINKEBY_URL;
module.exports = {
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ ALCHEMY_API_KEY }`,
      accounts: [ RINKEBY_URL ],
      timeout: 60000
    },
    hardhat: {
      forking: {
        enabled: true,
        url: `https://eth-mainnet.alchemyapi.io/v2/${ ALCHEMY_API_KEY }`,
      }
    }
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },
  paths: {
    artifacts: '../src/artifacts',
  },
  etherscan: {
    apiKey: "AurMaGtBd_KnUAIzmHNpPhA04XVU_yKA",
  }

}