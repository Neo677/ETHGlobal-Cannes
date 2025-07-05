import { task } from "hardhat/config";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();


task("deploy-carte-grise").setAction(async (_args, hre) => {
  const CarteGriseNFT = await hre.ethers.getContractFactory("CarteGriseNFT");
  const carteGriseNFT = await CarteGriseNFT.deploy();
  const carteGriseAddr = await carteGriseNFT.waitForDeployment();
  const address = await carteGriseNFT.getAddress(); // <-- Correct way
  console.log(`CarteGriseNFT address: ${address}`);

  // Save to .env
  updateEnv("CONTRACT_ADDRESS", address);

  return address;
});

task("set-role")
  .addParam("address", "The address to assign a role to", process.env.MY_ADDRESS)
  .addParam("role", "The role to assign (0=None, 1=Admin, 2=Concessionnaire, 3=Assurance, 4=ControleTechnique)")
  .addParam("contract", "Deployed contract address", process.env.CONTRACT_ADDRESS)
  .setAction(async (args, hre) => {
    const contract = await hre.ethers.getContractAt("CarteGriseNFT", args.contract);
    const tx = await contract.setRole(args.address, parseInt(args.role));
    await tx.wait();
    console.log(`✅ Role ${args.role} assigned to ${args.address}`);
  });

task("mint-vehicle")
  .addParam("contract", "Deployed contract address", process.env.CONTRACT_ADDRESS)
  .addParam("to", "Owner wallet address", process.env.MY_ADDRESS)
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

  function updateEnv(key: string, value: string) {
  const envPath = path.resolve(__dirname, "../.env");
  let env = "";
  if (fs.existsSync(envPath)) {
    env = fs.readFileSync(envPath, "utf8");
    // Remove any existing line for the key
    env = env.replace(new RegExp(`^${key}=.*$`, "m"), "");
    // Remove extra blank lines
    env = env.replace(/^\s*[\r\n]/gm, "");
  }
  // Add the new key-value pair
  env += `\n${key}=${value}\n`;
  fs.writeFileSync(envPath, env);
}