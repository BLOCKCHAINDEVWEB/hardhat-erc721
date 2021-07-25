import { ethers } from 'ethers'
import * as sigUtil from 'eth-sig-util'
import XKOAbi from '../abis/xko.json'
require('dotenv').config()

// Users Ko accounts
const from = '0xdB238259407A537CA73f3BC6e9Cba13a786D616b'; // Owner
const to = '0xF16506f520c3f224219b60f596A14f7E5a5ed535'; // Recipient
const privateKeyUser = process.env.PRIVATE_KEY_USER;

// project: ko-blockchain
const maticProviderURI = 'https://rpc-mumbai.maticvigil.com/v1/339bfd1060db13f0f39cac79e2cca45b637c93e9';
const provider = new ethers.providers.JsonRpcProvider(maticProviderURI);

const contractAddress = '0xDaD0E15dD3B7561370F5CB94b4a216E6f62FE99a'; // Mumbai testnet network
// const contractAddress = '0x7B276A55987E3020026Bb098F15E968313Bd1aF2'; // Mainnet network

const contractXKO = new ethers.Contract(contractAddress , XKOAbi , provider);

const amountXKO = '10';
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
  verifyingContract: contractAddress,
  salt: '0x' + chainId.toString(16).padStart(64, '0')
};

const getTransferSignature = async ({from, to, amountXKO}) => {
  const nonce = await contractXKO.getNonce(from);

  const transferFunctionAbi = ["function transfer(address to, uint amount)"];
  const interfaceTransferFunction = new ethers.utils.Interface(transferFunctionAbi);
  const functionSignature = interfaceTransferFunction.encodeFunctionData("transfer", [ to, amountXKO ]);

	const msgParams = {
		types: {
			EIP712Domain: domainType,
			MetaTransaction: metaTransactionType
		},
		domain: domainData,
		primaryType: "MetaTransaction",
		message: {
			nonce: nonce.toNumber(),
			from: from,
			functionSignature: functionSignature
		}
  };

	const privateKey = Buffer.from(privateKeyUser, "hex")
	const sig = sigUtil.signTypedData_v4(
		privateKey,
		{data: msgParams}
  );

  const wallet = new ethers.Wallet(privateKey);
  const contractInstance = new ethers.Contract(contractAddress, XKOAbi, wallet);

  console.log({from});
  console.log({to});
  console.log({functionParameters: [to, amountXKO]});
  console.log({functionSignature});
  console.log({signature: sig});
  console.log({msgParams: JSON.stringify(msgParams)});
}

getTransferSignature({from, to, amountXKO});
