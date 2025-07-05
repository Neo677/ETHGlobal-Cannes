import { task } from "hardhat/config";

// Task: Deploy the Vigil contract
task("deploy").setAction(async (_args, hre) => {
  // Get the contract factory for Vigil
  const Vigil = await hre.ethers.getContractFactory("Vigil");
  // Deploy the Vigil contract
  const vigil = await Vigil.deploy();
  // Wait for the deployment to complete and get the deployed address
  const vigilAddr = await vigil.waitForDeployment();

  // Print the deployed contract address
  console.log(`Vigil address: ${vigilAddr.target}`);
  // Return the contract address for use in other tasks
  return vigilAddr.target;
});

// Task: Create a secret in the Vigil contract
task("create-secret")
  .addParam("address", "contract address") // Requires the deployed contract address as a parameter
  .setAction(async (args, hre) => {
    // Get the Vigil contract instance at the specified address
    const vigil = await hre.ethers.getContractAt("Vigil", args.address);

    // Call the createSecret function with a label, duration, and secret value
    const tx = await vigil.createSecret(
      "ingredient",                // Label for the secret
      30 /* seconds */,            // Duration before the secret can be revealed
      Buffer.from("brussels sprouts"), // The secret value, encoded as bytes
    );
    // Log the transaction hash
    console.log("Storing a secret in", tx.hash);
  });

// Task: Check and reveal the secret from the Vigil contract
task("check-secret")
  .addParam("address", "contract address") // Requires the deployed contract address as a parameter
  .setAction(async (args, hre) => {
    // Get the Vigil contract instance at the specified address
    const vigil = await hre.ethers.getContractAt("Vigil", args.address);

    try {
      console.log("Checking the secret");
      // Try to reveal the secret immediately (should fail if not enough time has passed)
      await vigil.revealSecret(0);
      console.log("Uh oh. The secret was available!");
      process.exit(1);
    } catch (e: any) {
      // Expected failure if the secret is not yet available
      console.log("failed to fetch secret:", e.message);
    }
    console.log("Waiting...");

    // Wait for 30 seconds before trying again
    await new Promise((resolve) => setTimeout(resolve, 30_000));
    console.log("Checking the secret again");
    // Use a static call to get the secret value without sending a transaction
    const secret = await vigil.revealSecret.staticCallResult(0); // Get the value.
    // Decode and print the secret value
    console.log(
      "The secret ingredient is",
      Buffer.from(secret[0].slice(2), "hex").toString(),
    );
  });

// Task: Run the full Vigil workflow (compile, deploy, create secret, check secret)
task("full-vigil").setAction(async (_args, hre) => {
  // Compile the contracts
  await hre.run("compile");

  // Deploy the Vigil contract and get its address
  const address = await hre.run("deploy");

  // Create a secret in the deployed contract
  await hre.run("create-secret", { address });
  // Check and reveal the secret after the waiting period
  await hre.run("check-secret", { address });
});

// Task: Deploy the CarteGriseNFT contract
task("deploy-carte-grise").setAction(async (_args, hre) => {
  // Get the contract factory for CarteGriseNFT
  const CarteGriseNFT = await hre.ethers.getContractFactory("CarteGriseNFT");
  // Deploy the CarteGriseNFT contract
  const carteGriseNFT = await CarteGriseNFT.deploy();
  // Wait for the deployment to complete and get the deployed address
  const carteGriseAddr = await carteGriseNFT.waitForDeployment();

  // Print the deployed contract address
  console.log(`CarteGriseNFT address: ${carteGriseAddr.target}`);
  // Return the contract address for use in other tasks
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
