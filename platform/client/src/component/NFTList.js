// NFTList.js

import React, { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import '../styles/listingModal.css'; // 추가된 부분

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const NFTList = ({ web3, account }) => {
  const [nfts, setNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [apr, setApr] = useState('');

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

  const submitLoanProposal = () => {
    console.log('Loan proposal submitted:', { amount, duration, apr, selectedNFT });
    closeModal();
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
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            <label>
              Duration:
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </label>
            <label>
              APR:
              <input type="text" value={apr} onChange={(e) => setApr(e.target.value)} />
            </label>
            <button onClick={submitLoanProposal}>대출 제안</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTList;
