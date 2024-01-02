import React, { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const NFTList = () => {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [nfts, setNFTs] = useState([]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        // Metamask 초기화 코드
        window.ethereum = new window.Web3(window.currentProvider);
      }

      await window.ethereum.enable();

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const connectedAddr = accounts[0];
      setConnectedWallet(connectedAddr);

      console.log('Wallet Connected:', connectedAddr);

      // NFT 불러오기
      const nftsForOwner = await alchemy.nft.getNftsForOwner(connectedAddr);
      console.log('Number of NFTs found:', nftsForOwner.totalCount);
      setNFTs(nftsForOwner.ownedNfts);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    connectWallet();

    // 컴포넌트 언마운트 시 cleanup 코드 추가
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
        window.ethereum.removeAllListeners('disconnect');
      }
    };
  }, []); // 빈 배열은 컴포넌트 마운트 시에만 실행

  window.onbeforeunload = () => {
    if (window.ethereum) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
      window.ethereum.removeAllListeners('disconnect');
    }
  };

  return (
    <div>
      <h1>NFT 목록</h1>
      {connectedWallet ? (
        <div>
          <p>연결된 지갑: {connectedWallet}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>지갑 연결</button>
      )}
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
                e.target.src = 'fallback-image-url'; // 대체 이미지 URL 또는 기본 이미지로 교체
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default NFTList;
