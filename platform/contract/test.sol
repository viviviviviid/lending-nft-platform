// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ERC721 토큰 인터페이스
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTDepositContract {
    // NFT 컨트랙트 주소
    IERC721 public nftContract;

    // 예치된 NFT의 소유자 정보를 추적
    mapping(uint256 => address) public depositors;

    // 컨트랙트 생성자
    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    // NFT 권한 부여 및 예치
    function approveAndDeposit(uint256 tokenId) public {
        // NFT 권한 부여
        nftContract.approve(address(this), tokenId);

        // NFT 예치
        nftContract.transferFrom(msg.sender, address(this), tokenId);

        // 예치자 정보 저장
        depositors[tokenId] = msg.sender;
    }

    // 예치된 NFT 인출
    function withdrawNFT(uint256 tokenId) public {
        // 호출자가 예치자인지 확인
        require(depositors[tokenId] == msg.sender, "Caller is not the depositor");

        // NFT 반환
        nftContract.transferFrom(address(this), msg.sender, tokenId);

        // 예치자 정보 삭제
        depositors[tokenId] = address(0);
    }
}
