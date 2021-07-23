const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const contracts = [{
    ntf: '' ,
    erc: '' 
  }];
  console.log(contracts[0].nft)

  // const transferNFT = () => {}

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
