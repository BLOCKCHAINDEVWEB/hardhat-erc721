const hre = require("hardhat");
const fs = require('fs');
require('dotenv').config();


async function main() {
  const NFT = await hre.ethers.getContractFactory("tokenNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to:", nft.address); // NFT deployed to: 0xb3915db9c5069897ac3a10c2ad431100882ebf8a

  // deploy contract token ERC
  const ERC = await hre.ethers.getContractFactory("tokenERC");
  const erc = await ERC.deploy();
  await erc.deployed();
  console.log("ERC deployed to:", erc.address); // ERC deployed to: 0x84C29225DFa41E3c493576c85b21201e636EA63E

  let config = `
    module.exports = {
      nftaddress: "${nft.address}",
      ercaddress: "${erc.address}",
    }
  `
  
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
