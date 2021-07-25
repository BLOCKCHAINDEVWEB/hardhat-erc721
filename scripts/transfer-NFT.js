const hre = require("hardhat");
require('dotenv').config();


async function main() {
  const from = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";  // Owner
  const to = "0xF16506f520c3f224219b60f596A14f7E5a5ed535";  // Recipient
  const nftaddress = "0xb3915db9c5069897ac3a10c2ad431100882ebf8a";  // Mumbai testnet network
  const tokenID = 7;

  const NFT = await hre.ethers.getContractFactory("tokenNFT");
  const contract = NFT.attach(nftaddress);
  const resp = await contract.transferFrom(from, to, tokenID);
  const tx = await resp.wait();
  console.log("NFT transferred:", resp.hash);
  console.log("Tx nonce:", resp.nonce);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
