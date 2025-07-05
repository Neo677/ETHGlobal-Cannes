// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConfidentialNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) private _secretMetadata;      // e.g., secret IPFS hash or data
    mapping(uint256 => string) private _publicMetadataCID;   // Store only the IPFS hash (CID)

    // Pass msg.sender as the initial owner to Ownable
    constructor() Ownable(msg.sender) ERC721("ConfidentialNFT", "CNFT") {}

    function mint(
        address to,
        string memory publicMetadataCID,  // Pass the IPFS CID here
        string memory secretMeta
    ) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _publicMetadataCID[tokenId] = publicMetadataCID;
        _secretMetadata[tokenId] = secretMeta;
    }

    // Standard ERC721 function for public metadata
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        string memory cid = _publicMetadataCID[tokenId];
        return string(abi.encodePacked("ipfs://", cid));
    }

    // Only the owner of the NFT can access the secret metadata
    function revealSecretMetadata(uint256 tokenId) external view returns (string memory) {
        require(ownerOf(tokenId) == msg.sender, "Not authorized");
        return _secretMetadata[tokenId];
    }
}
