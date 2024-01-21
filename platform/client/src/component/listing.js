import React, { useState, useEffect } from 'react';
import platformABI from '../abi/platform_ABI';

const platformHx = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

const Listing = ({ web3, account }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const fetchedListings = await fetchListings(account);
      setListings(fetchedListings);
    }
    loadData();
  }, []);

  const approveLoan = async (selectedNFT) => {
    try {
      const platformContract = new web3.eth.Contract(platformABI, platformHx);
      const amountInWei = web3.utils.toWei(selectedNFT.Amount.toString(), 'ether');
      await platformContract.methods.approveLoan(selectedNFT.ID).send({
        from: account,
        value: amountInWei
      });
      const response = await fetch('http://localhost:8080/lend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: selectedNFT.ID}),
      });
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <div>
      <h1>오픈된 담보 리스트</h1>
      {listings && listings.map((listing, index) => (
        <div key={index}>
          <p>Poster: {listing.Poster}</p>
          <p>Collection: {listing.Collection}</p>
          <p>TokenId: {listing.TokenId}</p>
          <p>Amount: {listing.Amount}</p>
          <p>Duration: {listing.Duration}</p>
          <p>APR: {listing.APR}</p>
          <p>Status: {listing.Status}</p>
          {listing.ImageUrl && (
            <img
              src={listing.ImageUrl}
              alt={`NFT Image for ${listing.TokenId}`}
              style={{ maxWidth: '200px' }}
              onError={(e) => {
                e.target.src = 'fallback-image-url'; // 이미지 로드 실패 시 대체 이미지 URL
              }}
            />
          )}
          {listing.Status === 'open' && listing.Poster !== account && (
            <button onClick={() => approveLoan(listing)}>대출 승인</button>
          )}
        </div>
      ))}
    </div>
  );
};

async function fetchListings(account) {
  try {
    const response = await fetch('http://localhost:8080/list/' + account + "?all=true");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const listings = await response.json();
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export default Listing;
