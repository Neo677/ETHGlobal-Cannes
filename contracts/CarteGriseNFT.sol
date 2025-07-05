// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarteGriseNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Only one special role: Concessionnaire
    mapping(address => bool) public isConcessionnaire;

    struct VehicleInfo {
        string vin;
        string brand;
        string model;
        uint256 mileage;
    }

    mapping(uint256 => VehicleInfo) public vehicleData;

    // Only owner can assign or remove concessionnaire status
    function setConcessionnaire(address user, bool status) public onlyOwner {
        isConcessionnaire[user] = status;
    }

    // Only concessionnaire can mint
    function mintCarteGrise(
        address to,
        string memory vin,
        string memory brand,
        string memory model,
        uint256 mileage,
        string memory tokenURI
    ) public returns (uint256) {
        require(isConcessionnaire[msg.sender], "Not authorized: only concessionnaire");
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        vehicleData[newItemId] = VehicleInfo(vin, brand, model, mileage);
        _tokenIds.increment();
        return newItemId;
    }

    // Standard ERC721 transfer functions handle resale
}
