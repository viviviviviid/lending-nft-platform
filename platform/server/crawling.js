import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_KEY, 
  network: Network.ETH_MAINNET, 
};

const alchemy = new Alchemy(settings);
const ownerAddr = "0x093018c5F85DeDeC37AbE7ec189C669B1c117245"; // Import from Metamask Wallet

console.log("fetching NFTs for address:", ownerAddr);
const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);
console.log("number of NFTs found:", nftsForOwner.totalCount);

for (const nft of nftsForOwner.ownedNfts) {
  console.log("===");
  console.log("collection name:", nft.contract.openSeaMetadata.collectionName);
  console.log("token name:", nft.contract.name);
  console.log("token ID:", nft.tokenId);
  console.log("type:", nft.contract.tokenType);
  console.log("contract address:", nft.contract.address);
  console.log(nft.image) // 추후 프론트에 뿌리기위해 이용
}
console.log("===");
