import React, { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import StandardABI from '../abi/ERC721_ABI';
import platformABI from '../abi/platform_ABI';
import '../styles/listingModal.css'; 

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);
const platformHx = "0x6A4383823E40578C29853721Da1cc38e747C1f59";

const NFTList = ({ web3, account }) => {
  const [nfts, setNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [APR, setAPR] = useState('');

  const fetchNFTs = async () => {
    try {
      const nftsForOwner = await alchemy.nft.getNftsForOwner(account);
      setNFTs(nftsForOwner.ownedNfts);
    } catch (error) {
      console.error('Error fetching owned NFTs:', error);
    }
  };

  const openModal = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNFT(null);
    setIsModalOpen(false);
  };

  const approve = async (standardContract_721) => {
    await standardContract_721.methods.setApprovalForAll(platformHx, true)
    .send({ from: account })
    .then(result => console.log(result))
    .catch(err => console.error(err))
  }

  const openListing = async (platformContract) => {
    await platformContract.methods.openListing(
      selectedNFT.contract.address, Number(selectedNFT.tokenId),
      amount, duration, APR
    ).send({ from: account })
    .then(result => console.log(result))
    .catch(err => console.error(err))
  }

  const submitLoanProposal = async (selectedNFT) => {
    const standardContract_721 = new web3.eth.Contract(StandardABI, selectedNFT.contract.address);
    const platformContract = new web3.eth.Contract(platformABI, platformHx);
    const owner = (await platformContract.methods.ownerOf(selectedNFT.contract.address, Number(selectedNFT.tokenId)).call()).toUpperCase();
    
    if(owner !== account.toUpperCase()){
      console.error("Not holder");
      closeModal();
      return;
    }
    
    const isApproved = await platformContract.methods.isApprove(selectedNFT.contract.address).call({ from: account });
    if(isApproved){
      await approve(standardContract_721)
      .then(result => console.log(result))
      .catch(err => {
        console.error(err);
        return;
      })
    }
  
    await openListing(platformContract);
    closeModal();
    // 그 뒤 listing page로 리다이렉트
  };

  useEffect(() => {
    if (web3 && account) {
      fetchNFTs();
    }
  }, [web3, account]);

  return (
    <div>
      <h1>NFT 목록</h1>
      {nfts.map((nft) => (
        <div key={nft.tokenId} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <h3>컬렉션 이름: {nft.contract.openSeaMetadata.collectionName}</h3>
          <p>토큰 이름: {nft.contract.name}</p>
          <p>토큰 ID: {nft.tokenId}</p>
          <p>타입: {nft.contract.tokenType}</p>
          <p>컨트랙트 주소: {nft.contract.address}</p>
          {nft.image && (
            <img
              src={nft.image.originalUrl}
              alt={`NFT Image for ${nft.tokenId}`}
              style={{ maxWidth: '200px' }}
              onError={(e) => {
                e.target.src = 'fallback-image-url';
              }}
            />
          )}
          {/* <button onClick={() => approve(nft)}>Approve</button> */}
          <button onClick={() => openModal(nft)}>담보로 맡기기</button>
        </div>
      ))}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>담보로 맡기기</h2>
            <p>NFT 정보: {selectedNFT.tokenId}</p>
            <label>
              Amount:
              <input type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </label>
            <label>
              Duration:
              <input type="text" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            </label>
            <label>
              APR:
              <input type="text" value={APR} onChange={(e) => setAPR(Number(e.target.value))} />
            </label>
            <button onClick={() => submitLoanProposal(selectedNFT)}>대출 제안</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTList;
