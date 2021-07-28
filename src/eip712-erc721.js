import { ethers } from 'ethers'
import * as sigUtil from 'eth-sig-util'
import XKO from '../artifacts/contracts/tokenNFT.sol/tokenNFT.json'
require('dotenv').config()

// Users Ko accounts
const from = '0xdB238259407A537CA73f3BC6e9Cba13a786D616b' // Owner
const to = '0xF16506f520c3f224219b60f596A14f7E5a5ed535' // Recipient
const privateKeyUser = process.env.PRIVATE_KEY_USER;

// Metadata ipfs URI
const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z" // tokenId: 2

// project: ko-blockchain
const nftaddress = '0xb3915db9c5069897ac3a10c2ad431100882ebf8a'
// const parentProvider = `https://mainnet.infura.io/v3/${process.env.INFURA_PRIVATE_KEY}`
const maticProvider = 'https://rpc-mumbai.maticvigil.com/v1/339bfd1060db13f0f39cac79e2cca45b637c93e9'
const provider = new ethers.providers.JsonRpcProvider(maticProvider)
const contractXKO = new ethers.Contract(nftaddress , XKO.abi , provider)

const mintNFT = async (from, URI) => {
  // Create a wallet instance from a mnemonic...
  const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  const signer = wallet.connect(provider)
  const contract = new ethers.Contract(nftaddress , XKO.abi , signer)
  const resp = await contract.mint(from, URI)
  // console.log("NFT minted:", contract)
  const tx = await resp.wait()
  const tokenId = tx.events[0].args[2].toNumber()
  console.log(tokenId)
  return tokenId
}

const chainId = 80001; // chain ID Mumbai testnet
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
  verifyingContract: nftaddress,
  salt: '0x' + chainId.toString(16).padStart(64, '0')
}

const approveNFT = async (from, to) => {
  const tokenId = await mintNFT(from, URI)
  const transferFunctionAbi = ["function approve(address to, uint256 tokenId)"]
  const interfaceTransferFunction = new ethers.utils.Interface(transferFunctionAbi)
  const functionSignature = interfaceTransferFunction.encodeFunctionData("approve", [ to, tokenId ])
  
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

  const privateKey = Buffer.from(privateKeyUser, "hex")
  const sig = sigUtil.signTypedData_v4(
    privateKey,
    {data: msgParams}
  )

  console.log({from})
  console.log({to})
  console.log({functionParameters: [to, tokenId]})
  console.log({functionSignature})
  console.log({signature: sig})
  console.log({msgParams: JSON.stringify(msgParams)})
}
approveNFT(from, to)
