const hre = require("hardhat");
const sigUtil = require('eth-sig-util')
require('dotenv').config();

async function main() {
  const NFT = await hre.ethers.getContractFactory("MyXKO");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to:", nft.address); // NFT deployed to: 0xf5e5984c3cfE123a1A7dA46dD9dC9d3E4fB89dc6

  const URI = "ipfs://QmaQNPLWTSKNXCvzURSi3WrkywJ1qcnYC56Dw1XMrxYZ7Z";
  const WALLET_ADDRESS = "0xdB238259407A537CA73f3BC6e9Cba13a786D616b";
  const CONTRACT_ADDRESS = `${nft.address}`;

  const contract = NFT.attach(CONTRACT_ADDRESS);
  await contract.mint(WALLET_ADDRESS, URI);
  // console.log("NFT minted:", contract);

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
    verifyingContract: contractAddress,
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

  const privateKey = Buffer.from(process.env.PRIVATE_KEY, "hex")
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
