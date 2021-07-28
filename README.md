# ERC20  
// .env -> completed PRIVATE_KEY_USER account ethereum-wallet (Metamask)  
// contract address = '0xDaD0E15dD3B7561370F5CB94b4a216E6f62FE99a' // Mumbai testnet network  
// contract address = '0x7B276A55987E3020026Bb098F15E968313Bd1aF2' // Mainnet network  

# Get Started
cp .env.sample .env npm run build

Running Sig for EIP712 signature with token ERC20
$ npm run start:erc


# ERC721  
// .env -> completed PRIVATE_KEY_USER account ethereum-wallet (Metamask)  

// network: Mumbai Testnet  
// token NFT deployed to: 0xb3915db9c5069897ac3a10c2ad431100882ebf8a  
// token ERC deployed to: 0x84C29225DFa41E3c493576c85b21201e636EA63E  

## Start blockchain  
$ yarn build  
$ yarn local-testnet  
// yarn deploy:contract  
$ yarn deploy:nft  

## Start server node  
$ yarn start:dev  

