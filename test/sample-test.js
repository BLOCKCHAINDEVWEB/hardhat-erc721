const { expect } = require("chai");

describe("NFT", function() {
  it("It should deploy the contract, mint a token, and resolve to the right URI", async function() {
    const NFT = await ethers.getContractFactory("MyXKO");
    const nft = await NFT.deploy();
    console.log("MyXKO deployed to:", nft.address); // MyXKO deployed to: 0xB3915DB9C5069897AC3A10C2aD431100882eBF8A
    const URI = "ipfs://QmTjV2jUubonFoPZBQU6Yy8wcgxvwHWqZe7efAMzDcW4Hv";
    await nft.deployed();
    await nft.mint("0xdB238259407A537CA73f3BC6e9Cba13a786D616b", URI)
    expect(await nft.tokenURI(1)).to.equal(URI)
  });
});

// ECHEC: mint