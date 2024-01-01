// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lending {

    event NewListing(address owner, NFT info);

     struct NFT{
        uint256 idx;
        string nftHash;
        uint256 amount;
        uint256 duration;
        uint256 APR;
    }

   uint256 idx = 0;

    mapping (address => NFT) public list;

    function _listing(string memory nftHash, uint256 amount, uint256 duration, uint256 APR) public {
        NFT memory info = NFT(idx, nftHash, amount, duration, APR);
        list[msg.sender] = info;
        emit NewListing(msg.sender, info);
        idx++;
    }

    // function _delisting

    function _viewListing() public view returns (NFT memory){
        return list[msg.sender];
    }
}