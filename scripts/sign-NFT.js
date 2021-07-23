const hre = require("hardhat");
const sigUtil = require('eth-sig-util')
const { nftaddress, ercaddress } = require('../config');
require('dotenv').config();

async function main() {
  const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z";  // metadata.json
  const WALLET_ADDRESS = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";
  const CONTRACT_ADDRESS = `${nftaddress}`;
  const XKOAbi = hre.artifacts.readArtifact("tokenNFT")

  // User Ko account
  const from =  '0xdB238259407A537CA73f3BC6e9Cba13a786D616b'
  const privateKeyUser = process.env.PRIVATE_KEY_USER;

  
  const NFT = await hre.ethers.getContractFactory("tokenNFT");
  const contract = NFT.attach(CONTRACT_ADDRESS);
  console.log(contract)
  // const nonce = await contract.getNonce(from);
  // console.log(nonce);
  
  // const matic = hre.config.defaultNetwork;
  // const contractXKO = await ethers.Contract(CONTRACT_ADDRESS, XKOAbi, matic);
  // const nonce = await contractXKO.getNonce(from)
  // console.log(contractXKO)

  // const chainId = 80001 // chain ID Mumbai testnet
  // // const chainId = 137 // chain ID Mainnet

  // // EIP712 => domain separator
  // const domainType = [
  //   { name: "name", type: "string" },
  //   { name: "version", type: "string" },
  //   { name: "verifyingContract", type: "address" },
  //   { name: "salt", type: "bytes32"}
  // ]
  // const metaTransactionType = [
  //   { name: "nonce", type: "uint256" },
  //   { name: "from", type: "address" },
  //   { name: "functionSignature", type: "bytes" }
  // ]
  // const domainData = {
  //   name: "Ko (PoS)", // TESTNET: "Ko (PoS)"
  //   // name: "Koin (PoS)", // MAINNET: "Koin (PoS)"
  //   version: "1",
  //   verifyingContract: CONTRACT_ADDRESS,
  //   salt: '0x' + chainId.toString(16).padStart(64, '0')
  // }

  // const msgParams = {
  //   types: {
  //     EIP712Domain: domainType,
  //     MetaTransaction: metaTransactionType
  //   },
  //   domain: domainData,
  //   primaryType: "MetaTransaction",
  //   message: {
  //     nonce: nonce.toNumber(),
  //     from,
  //     functionSignature
  //   }
  // }
  // console.log({msgParams: JSON.stringify(msgParams)})

  // const privateKey = Buffer.from(privateKeyUser, "hex")
  // const sig = sigUtil.signTypedData_v4(
  //   privateKey, 
  //   {data: msgParams}
  // )
  // console.log({signature: sig})

  // const wallet = await ethers.Wallet(privateKey)
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
