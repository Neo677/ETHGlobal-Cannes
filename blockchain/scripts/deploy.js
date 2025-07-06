async function main() {
  const ConfidentialNFT = await ethers.getContractFactory("ConfidentialNFT");
  const contract = await ConfidentialNFT.deploy();
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("ConfidentialNFT deployed to:", address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
