// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Platform {

    // constructor() ERC721("NFTTransferContract", "NTC") {}    

    event NewListing(address owner, ListingInfo info);
    event StatusChange(bytes32 hash, string status);

    struct ListingInfo{
        address poster;
        address collectionAddr;
        uint256 tokenId;
        uint256 amount;
        uint256 duration;
        uint256 APR;
        bytes32 status; // Open, Executed, Cancelled // 가스비 절약을 위해 string 대신 고정된크기의 bytes, 검색에도 빠름
    }

    mapping (uint256 => ListingInfo) public listNum;
    mapping (address => uint256[]) addrList;

    uint256 counter;

    function getListing(address addr) public view returns (uint256[] memory){
        return addrList[addr];
    }

    function getMyListing() public view returns (uint256[] memory){
        return addrList[msg.sender];
    }

    function getListingInfo(uint256 num) public view returns (ListingInfo memory) {
        return listNum[num];
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }
    
    // function getAllListing() public view returns (uint256[] memory){
    //     return addrList[msg.sender];
    // }

    function approveAll(address collectionAddr) public {
        IERC721(collectionAddr).setApprovalForAll(address(this), true);
    }

    function isApprove(address collectionAddr) public view returns (bool) {
        return IERC721(collectionAddr).isApprovedForAll(msg.sender, address(this));
    }

    function openListing(address collectionAddr, uint256 tokenId, uint256 amount, uint256 duration, uint256 APR) public {
        require(amount > 0 && duration > 0 && APR > 0, "Values must over zero");

        ListingInfo memory info = ListingInfo(msg.sender, collectionAddr, tokenId, amount, duration, APR, "Open");
        listNum[counter] = info;
        addrList[msg.sender].push(counter);
        ++counter; // 앞에 쓸 경우 가스 살짝 더 절약  

        IERC721(collectionAddr).transferFrom(msg.sender, address(this), tokenId);

        emit NewListing(msg.sender, info);
    }

    // function excuteListing(){
    // }

    // function cancelListing(){
    // }


    function _structHash(ListingInfo memory src) public pure returns(bytes32) {
        return keccak256(abi.encode(src));
    }
}