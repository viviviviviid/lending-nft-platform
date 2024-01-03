// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lending {

    event NewListing(address owner, NFT info);

     struct NFT{
        bytes32 hash;
        string nftHash;
        uint256 amount;
        uint256 duration;
        uint256 APR;
    }

    mapping (address => NFT) public list;
    
    function _listing(string memory nftHash, uint256 amount, uint256 duration, uint256 APR) public {
        NFT memory info = NFT("", nftHash, amount, duration, APR);
        info.hash = _structHash(info);
        list[msg.sender] = info;
        emit NewListing(msg.sender, info);
    }

    // 여러개를 추가했을 경우, 위 list[msg.sender] = info 때문에 최근거만 덮어쓰게됨. push 로 추가할 수 있는 이중매핑 필요

    // function _buy() public {
        // 
    // }

    // function _delisting

    function _viewListing() public view returns (NFT memory){
        return list[msg.sender];
    }

    function _structHash(NFT memory src) public pure returns(bytes32) {
        return keccak256(abi.encode(src));
    }
}