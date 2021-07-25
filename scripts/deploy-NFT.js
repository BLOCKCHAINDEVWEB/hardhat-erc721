const hre = require("hardhat");
require('dotenv').config();
// const { nftaddress, ercaddress } = require('../config');


async function main() {
  const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z";
  const from = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";
  const nftaddress = "0xb3915db9c5069897ac3a10c2ad431100882ebf8a";  // Mumbai testnet network

  const NFT = await hre.ethers.getContractFactory("tokenNFT");
  const contract = NFT.attach(nftaddress);
  const resp = await contract.mint(from, URI);
  // console.log("NFT minted:", contract);
  const tx = await resp.wait()
  console.log(tx)
  const tokenId = tx.events[0].args[2].toNumber()
  console.log(tokenId)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
