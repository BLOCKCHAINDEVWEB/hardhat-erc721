const hre = require("hardhat");
const sigUtil = require('eth-sig-util')
const XKOAbi = require('../abis/NFT-abi.json')
require('dotenv').config();

async function main() {
  const contracts = [{
    nft: '0xb3915db9c5069897ac3a10c2ad431100882ebf8a' ,
    erc: '0x84C29225DFa41E3c493576c85b21201e636EA63E' 
  }];
  const tokenNTF = [];
  const nft = Object.values(contracts[0])[0];
  const erc = Object.values(contracts[0])[1];

  const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z";
  const WALLET_ADDRESS = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";
  const CONTRACT_ADDRESS = `${nft}`;

  // User Ko account
  const from =  '0xdB238259407A537CA73f3BC6e9Cba13a786D616b'
  const privateKeyUser = process.env.PRIVATE_KEY_USER;

  const contractXKO = ethers.Contract(CONTRACT_ADDRESS , XKOAbi , hre)
  const nonce = await contractXKO.getNonce(from)
  console.log(nonce)

  const chainId = 80001 // chain ID Mumbai testnet
  // const chainId = 137 // chain ID Mainnet

  // EIP712 => domain separator
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32"}
  ]
  const metaTransactionType = [
    { name: "nonce", type: "uint256" },
    { name: "from", type: "address" },
    { name: "functionSignature", type: "bytes" }
  ]
  const domainData = {
    name: "Ko (PoS)", // TESTNET: "Ko (PoS)"
    // name: "Koin (PoS)", // MAINNET: "Koin (PoS)"
    version: "1",
    verifyingContract: CONTRACT_ADDRESS,
    salt: '0x' + chainId.toString(16).padStart(64, '0')
  }

  const msgParams = {
    types: {
      EIP712Domain: domainType,
      MetaTransaction: metaTransactionType
    },
    domain: domainData,
    primaryType: "MetaTransaction",
    message: {
      nonce: nonce.toNumber(),
      from,
      functionSignature
    }
  }
  console.log({msgParams: JSON.stringify(msgParams)})

  const privateKey = Buffer.from(privateKeyUser, "hex")
  const sig = sigUtil.signTypedData_v4(
    privateKey, 
    {data: msgParams}
  )
  console.log({signature: sig})

  const wallet = await ethers.Wallet(privateKey)
  console.log({wallet: wallet})

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
