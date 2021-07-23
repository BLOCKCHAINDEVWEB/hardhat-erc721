const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const contracts = [{
    nft: '0xb3915db9c5069897ac3a10c2ad431100882ebf8a' ,
    erc: '0x84C29225DFa41E3c493576c85b21201e636EA63E' 
  }];
  const nft = Object.values(contracts[0])[0];
  const erc = Object.values(contracts[0])[1];

  const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z";
  const WALLET_ADDRESS = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";
  const CONTRACT_ADDRESS = `${nft}`;

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
