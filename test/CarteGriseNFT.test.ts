import { expect } from "chai";
import { ethers } from "hardhat";

describe("CarteGriseNFT", function () {
  let contract: any;
  let owner: any;
  let concessionnaire: any;
  let buyer: any;

  beforeEach(async function () {
    [owner, concessionnaire, buyer] = await ethers.getSigners();
    const CarteGriseNFT = await ethers.getContractFactory("CarteGriseNFT");
    contract = await CarteGriseNFT.deploy();
    await contract.waitForDeployment();

    // Owner assigns concessionnaire role
    await contract.connect(owner).setConcessionnaire(concessionnaire.address, true);
  });

  it("Only concessionnaire can mint", async function () {
    // Should succeed
    await expect(
      contract.connect(concessionnaire).mintCarteGrise(
        buyer.address,
        "VIN123",
        "Tesla",
        "Model 3",
        10000,
        "ipfs://test"
      )
    ).to.not.be.reverted;

    // Should fail if not concessionnaire
    await expect(
      contract.connect(buyer).mintCarteGrise(
        buyer.address,
        "VIN456",
        "Toyota",
        "Corolla",
        5000,
        "ipfs://test2"
      )
    ).to.be.revertedWith("Not authorized: only concessionnaire");
  });

  it("Owner of NFT can transfer", async function () {
    await contract.connect(concessionnaire).mintCarteGrise(
      buyer.address,
      "VIN123",
      "Tesla",
      "Model 3",
      10000,
      "ipfs://test"
    );
    // Buyer transfers NFT to another address
    await contract.connect(buyer).transferFrom(
      buyer.address,
      owner.address,
      0 // tokenId
    );
    expect(await contract.ownerOf(0)).to.equal(owner.address);
  });
});
