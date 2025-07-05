import { task } from "hardhat/config";

task("deploy-carte-grise").setAction(async (_args, hre) => {
  const CarteGriseNFT = await hre.ethers.getContractFactory("CarteGriseNFT");
  const carteGriseNFT = await CarteGriseNFT.deploy();
  const carteGriseAddr = await carteGriseNFT.waitForDeployment();
  console.log(`CarteGriseNFT address: ${carteGriseAddr.target}`);
  return carteGriseAddr.target;
});

task("set-role")
  .addParam("address", "The address to assign a role to")
  .addParam("role", "The role to assign (0=None, 1=Admin, 2=Concessionnaire, 3=Assurance, 4=ControleTechnique)")
  .addParam("contract", "Deployed contract address")
  .setAction(async (args, hre) => {
    const contract = await hre.ethers.getContractAt("CarteGriseNFT", args.contract);
    const tx = await contract.setRole(args.address, parseInt(args.role));
    await tx.wait();
    console.log(`✅ Role ${args.role} assigned to ${args.address}`);
  });

task("mint-vehicle")
  .addParam("contract", "Deployed contract address")
  .addParam("to", "Owner wallet address")
  .addParam("vin", "VIN number")
  .addParam("brand", "Vehicle brand")
  .addParam("model", "Vehicle model")
  .addParam("mileage", "Initial mileage")
  .addParam("uri", "Token metadata URI (from IPFS)")
  .setAction(async (args, hre) => {
    const contract = await hre.ethers.getContractAt("CarteGriseNFT", args.contract);
    const tx = await contract.mintCarteGrise(
      args.to,
      args.vin,
      args.brand,
      args.model,
      args.mileage,
      args.uri
    );
    await tx.wait();
    console.log(`🚗 Vehicle NFT minted for ${args.to}`);
  });
