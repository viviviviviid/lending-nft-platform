// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Lending {

    event NewListing(address owner, ListingInfo info);
    event StatusChange(bytes32 hash, string status);

    struct ListingInfo{
        address poster;
        string collectionHash;
        uint256 collectionNum;
        uint256 amount;
        uint256 duration;
        uint256 APR;
        bytes32 status; // Open, Executed, Cancelled
    }

    mapping (uint256 => ListingInfo) listNum;
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
    
    // function getAllListing() public view returns (uint256[] memory){
    //     return addrList[msg.sender];
    // }

    function openListing(string memory collectionHash, uint256 collectionNum, uint256 amount, uint256 duration, uint256 APR) public {
        ListingInfo memory info = ListingInfo(msg.sender, collectionHash, collectionNum, amount, duration, APR, "Open");
        ++counter; // 앞에 쓸 경우 가스 살짝 더 절약  
        addrList[msg.sender].push(counter);
        emit NewListing(msg.sender, info);
    }

    // 여러개를 추가했을 경우, 위 list[msg.sender] = info 때문에 최근거만 덮어쓰게됨. push 로 추가할 수 있는 이중매핑 필요

    // function excuteListing(){
    // }

    // function cancelListing(){
    // }


    function _structHash(ListingInfo memory src) public pure returns(bytes32) {
        return keccak256(abi.encode(src));
    }
}