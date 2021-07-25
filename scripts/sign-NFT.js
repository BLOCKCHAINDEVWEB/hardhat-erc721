const hre = require("hardhat");
const { ethers } = require('ethers')
const sigUtil = require('eth-sig-util')
// const { nftaddress, ercaddress } = require('../config');
require('dotenv').config();


async function main() {
  const from = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";  // Owner
  const to = "0xF16506f520c3f224219b60f596A14f7E5a5ed535";  // Recipient
  const nftaddress = "0xb3915db9c5069897ac3a10c2ad431100882ebf8a";  // Mumbai testnet network
  const tokenId = 3;

  // const NFT = await hre.ethers.getContractFactory("tokenNFT");
  // const contract = NFT.attach(nftaddress);

  const chainId = 80001; // chain ID Mumbai testnet
  // const chainId = 137 // chain ID Mainnet
  
  // EIP712 => domain separator
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32"}
  ];
  const metaTransactionType = [
     { name: "nonce", type: "uint256" },
     { name: "from", type: "address" },
     { name: "functionSignature", type: "bytes" }
  ];
  const domainData = {
    name: "Ko (PoS)", // TESTNET: "Ko (PoS)"
    // name: "Koin (PoS)", // MAINNET: "Koin (PoS)"
    version: "1",
    verifyingContract: nftaddress,
    salt: '0x' + chainId.toString(16).padStart(64, '0')
  };

  const transferFunctionAbi = ["function approve(address to, uint256 tokenId)"];
  const interfaceTransferFunction = new ethers.utils.Interface(transferFunctionAbi);
  const functionSignature = interfaceTransferFunction.encodeFunctionData("approve", [ to, tokenId ]);

  const msgParams = {
		types: {
			EIP712Domain: domainType,
			MetaTransaction: metaTransactionType
		},
		domain: domainData,
		primaryType: "MetaTransaction",
		message: {
			nonce: 0,
			from: from,
			functionSignature: functionSignature
		}
  }

  const privateKey = Buffer.from(process.env.PRIVATE_KEY_USER, "hex")
	const sig = sigUtil.signTypedData_v4(
		privateKey,
		{data: msgParams}
  )

  const wallet = new ethers.Wallet(privateKey)

  console.log({from})
  console.log({to})
  console.log({functionParameters: [to, tokenId]})
  console.log({functionSignature})
  console.log({signature: sig})
  console.log({msgParams: JSON.stringify(msgParams)})
  // console.log({wallet: wallet})
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
