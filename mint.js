const { ethers } = require("hardhat");

async function main() {
  // Get the contract address from deployment
  const contractAddress = "0x312f97cD5EBd44043730f687Bb8793919a572abe"; //YOUR_DEPLOYED_CONTRACT_ADDRESS

  // Connect to the deployed contract
  const ConfidentialNFT = await ethers.getContractFactory("ConfidentialNFT");
  const contract = ConfidentialNFT.attach(contractAddress);

  // Example data:
  const recipient = "0x1c7ceC71029FF175a48Ac4a3A904ac68E0a918fe";  // address to receive the NFT
  const publicCID = "QmR56Gvq6T5Sj648wycZ7Yy7vgAM5LeM6ygNm8td4PpYej"; // IPFS CID from pinata
  const secretData = "it s me i m hacking you"; // whatever you want to keep private

  // Call mint (only contract owner can call!)
  const tx = await contract.mint(recipient, publicCID, secretData);
  await tx.wait();

  console.log("NFT minted successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
