const hre = require("hardhat");
require('dotenv').config();
const { nftaddress, ercaddress } = require('../config');

async function main() {
  const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z";
  const WALLET_ADDRESS = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";
  const CONTRACT_ADDRESS = `${nftaddress}`;

  const NFT = await hre.ethers.getContractFactory("tokenNFT");
  const contract = NFT.attach(CONTRACT_ADDRESS);
  await contract.mint(WALLET_ADDRESS, URI);
  console.log("NFT minted:", contract);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
