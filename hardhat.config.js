require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // menbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [process.env.PRIVATE_KEY_USER]
    // },
    matic: {
      url: "https://rpc-mumbai.matic.today",
      accounts: [process.env.PRIVATE_KEY_USER]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.7.3"
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: false,
            runs: 200
          }
        }
      }
    ],
    dependencyCompiler: {
      paths: [
        '@openzeppelin/contracts/token/ERC721/ERC721.sol',
        '@openzeppelin/contracts/utils/Counters.sol',
        '@openzeppelin/contracts/access/Ownable.sol',
        '@openzeppelin/contracts/token/ERC20/ERC20.sol'
      ],
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
