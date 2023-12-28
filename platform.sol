// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './libraries/SafeMath.sol';
import './lending.sol';
import './borrow.sol';

contract Lending {
     struct NFT{
        string nftHash;
        uint256 amount;
        uint256 duration;
        uint256 APR;
    }

    mapping (address => NFT) public NFTmapping;

    function listing(string memory nftHash, uint256 amount, uint256 duration, uint256 APR) public {
        NFT memory newNFT = NFT(nftHash, amount, duration, APR);
        NFTmapping[msg.sender] = newNFT;
    }
}