// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";



contract Platform {

    // constructor(address initialOwner) Ownable(initialOwner) {}

    event NewListing(address owner, ListingInfo info);
    event CancelListing(address owner, ListingInfo info);
    event ApprovalListing(address loaner, ListingInfo info);
    event repaying(address owner, ListingInfo info);
    event check(uint256 num);
    
    struct ListingInfo {
        address payable poster;
        address collectionAddr;
        uint256 tokenId;
        uint256 amount;
        uint256 duration;
        uint256 APR;
        bytes32 status;
    }

    mapping(uint256 => ListingInfo) public listNum;
    mapping(address => uint256[]) addrList;
    mapping(uint256 => uint256) updatedTime;
    mapping(uint256 => address payable) loaner;

    uint256 counter = 1;
    uint256 yearToDay = 365;
    uint256 monthToSec = 2592000;
    uint256 dayToSec = 86400;
    uint256 minTosec = 60;
    
    function getListing(address addr) public view returns (uint256[] memory) {
        return addrList[addr];
    }

    function getListingInfo(uint256 num) public view returns (ListingInfo memory) {
        return listNum[num];
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function ownerOf(address collectionAddr, uint256 tokenId) public view returns (address) {
        return IERC721(collectionAddr).ownerOf(tokenId);
    }

    function isApprove(address collectionAddr) public view returns (bool) {
        return IERC721(collectionAddr).isApprovedForAll(msg.sender, address(this));
    }

    function loanerOf(uint256 num) public view returns (address) {
        return loaner[num];
    }

    function getUpdateTime(uint256 num) public view returns (uint256) {
        return updatedTime[num];
    }

    function openListing(
        address collectionAddr,
        uint256 tokenId,
        uint256 amount,
        uint256 duration,
        uint256 APR
    ) public {
        require(amount > 0 && duration > 0 && APR > 0, "Values must be greater than zero");
        require(IERC721(collectionAddr).ownerOf(tokenId) == msg.sender, "You are not holder of this token");
        ListingInfo memory info = ListingInfo(payable(msg.sender), collectionAddr, tokenId, amount, duration, APR, "open");
        listNum[counter] = info;
        addrList[msg.sender].push(counter);
        IERC721(collectionAddr).transferFrom(msg.sender, address(this), tokenId);
        updateTime(counter);
        counter++;
        emit NewListing(msg.sender, info);
    }
    
    function closeListing(uint256 listingIndex) public {
        ListingInfo storage info = listNum[listingIndex];
        require(info.poster == msg.sender, "You are not poster of the list");
        require(info.status == bytes32("open"), "Not opening list"); // 새로 추가된 제약 -> 에러 확인 못했음
        info.status = "cancel";
        updateTime(listingIndex);
        emit CancelListing(msg.sender, info);
    }

    function updateTime(uint256 listingIndex) public {
        updatedTime[listingIndex] = block.timestamp;
    }

    function isExpired(uint256 listingIndex) public view returns (uint256, bool) {
        ListingInfo memory info = getListingInfo(listingIndex);
        // require(info.status == bytes32("excuting"), "Not excuted list"); // 테스트 끝나면 주석 해제. 현재는 대출승인이 안된 상태에서도 사용가능하게끔 되어있음
        uint256 expirationTime = updatedTime[listingIndex] + info.duration * minTosec; // 테스트용으로 분 단위
        uint256 remainingTime = expirationTime - block.timestamp;
        return (remainingTime, remainingTime < 0);
    }

    function approveLoan(uint256 listingIndex) public payable {
        ListingInfo storage info = listNum[listingIndex]; 
        require(msg.sender != info.poster, "It's your own loan application.");
        uint256 amountInWei = info.amount * 1 ether; // 이더 단위에서 Wei 단위로 변환
        require(msg.sender.balance >= amountInWei, "You haven't enough balance for lending");
        info.status = "executing";
        loaner[listingIndex] = payable(msg.sender);
        updateTime(listingIndex);
        bool sent = info.poster.send(msg.value);
        require(sent, "Failed to send Ether");
        emit ApprovalListing(msg.sender, info);
    }

    function repayLoan(uint256 listingIndex) public payable {
        ListingInfo storage info = listNum[listingIndex];
        require(info.poster == msg.sender, "You are not poster");
        require(info.status == bytes32("executing"), "This is expired or not excuted yet");
        uint256 repayAmount = calculateRepayAmount(listingIndex);
        require(repayAmount < msg.sender.balance, "Not enough balance for repaying");
        bool sent = loaner[listingIndex].send(msg.value);
        require(sent, "Failed to send Ether");
        info.status = "repayed";
        giveBackNFT(listingIndex);
        emit repaying(msg.sender, info);
    }

    function calculateRepayAmount(uint256 listingIndex) public view returns (uint256) {
        ListingInfo memory info = getListingInfo(listingIndex);
        uint256 scaledAPR = info.APR * 1000; // APR을 고정 소수점 수로 변환 (10% -> 1000)
        uint256 interestPerDay = info.amount * scaledAPR / 100 / 1000 / yearToDay; 
        uint256 elapsedDays = (block.timestamp - updatedTime[listingIndex]) / dayToSec;
        uint256 totalInterest = interestPerDay * elapsedDays;
        uint256 sumResult = info.amount + totalInterest;
        return sumResult;
    }

    
    function giveBackNFT(uint256 listingIndex) public {
        ListingInfo memory info = getListingInfo(listingIndex);
        require(info.poster == msg.sender, "You are not poster");
        require(info.status == bytes32("repayed"), "This isn't repay yet");
        IERC721(info.collectionAddr).transferFrom(address(this), msg.sender, info.tokenId);
        info.status = "closed";
        updateTime(listingIndex);
    }
}

// contract NFTOwner {
//     IERC721 public nftContract;
//     address public depositContract;

//     constructor(address _nftContract, address _depositContract) {
//         nftContract = IERC721(_nftContract);
//         depositContract = _depositContract;
//     }

//     function approveAndDeposit(uint256 tokenId) public {
//         // NFT를 예치 컨트랙트에 권한 부여
//         nftContract.approve(depositContract, tokenId);

//         // NFT를 예치 컨트랙트로 이동 (여기서는 예치 컨트랙트의 depositNFT 함수를 호출해야 함)
//         // 이 부분은 예치 컨트랙트의 구현에 따라 달라질 수 있습니다.
//     }
// }