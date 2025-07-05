// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Import OpenZeppelin's ERC721 implementation with URI storage extension
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Import OpenZeppelin's Ownable contract for access control
import "@openzeppelin/contracts/access/Ownable.sol";
// Import Counters utility for incrementing token IDs
import "@openzeppelin/contracts/utils/Counters.sol";



// Main contract for vehicle registration NFTs
contract CarteGriseNFT is ERC721URIStorage, Ownable {

    enum Role { None, Admin, Concessionnaire, Assurance, ControleTechnique }
    mapping(address => Role) public roles;

    modifier onlyRole(Role _role) {
        require(roles[msg.sender] == _role, "Not authorized for this role");
        _;
    }
    // Use the Counters library for managing token IDs
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Counter for token IDs

    // Struct to store vehicle information
    struct VehicleInfo {
        string vin;      // Vehicle Identification Number
        string brand;    // Vehicle brand
        string model;    // Vehicle model
        uint256 mileage; // Vehicle mileage
    }

    // Mapping from token ID to vehicle information
    mapping(uint256 => VehicleInfo) public vehicleData;

    // Constructor sets the token name and symbol
    constructor() ERC721("CarteGriseNFT", "CGNFT") {}

    // Function to mint a new vehicle NFT
    // Only the contract owner can call this
    function mintCarteGrise(
        address to,
        string memory vin,
        string memory brand,
        string memory model,
        uint256 mileage,
        string memory tokenURI
    ) public onlyRole(Role.Concessionnaire) returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        vehicleData[newItemId] = VehicleInfo(vin, brand, model, mileage);
        _tokenIds.increment();
        return newItemId;
    }

    // Function to update the mileage of a vehicle NFT
    // Only the contract owner can call this
    function updateMileage(uint256 tokenId, uint256 newMileage) public {
        require(_exists(tokenId), "Token doesn't exist");
        require(
            roles[msg.sender] == Role.ControleTechnique || roles[msg.sender] == Role.Assurance,
            "Only CT or Assurance can update"
        );
        vehicleData[tokenId].mileage = newMileage;
    }



}
