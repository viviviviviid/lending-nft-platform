import React, { useState, useEffect } from 'react';
import platformABI from '../abi/platform_ABI';

const platformHx = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

const MyListing = ({ web3, account }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const fetchedListings = await fetchListings(account);
      setListings(fetchedListings);
    }
    loadData();
  }, []);

  const closeListing = async (selectedNFT) => {
    const platformContract = new web3.eth.Contract(platformABI, platformHx);
    await platformContract.methods.closeListing(selectedNFT.ID).send({ from: account });

    const data = {
      id: selectedNFT.ID
    }

    const response = await fetch('http://localhost:8080/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
 
  };

  return (
    <div>
      <h1>내가 상장한 리스트</h1>
      {listings && listings.map((listing, index) => (
        <div key={index}>
          <p>Poster: {listing.Poster}</p>
          <p>Collection: {listing.Collection}</p>
          <p>TokenId: {listing.TokenId}</p>
          <p>Amount: {listing.Amount}</p>
          <p>Duration: {listing.Duration}</p>
          <p>APR: {listing.APR}</p>
          {listing.ImageUrl && (
            <img
              src={listing.ImageUrl}
              alt={`NFT Image for ${listing.TokenId}`}
              style={{ maxWidth: '200px' }}
              onError={(e) => {
                e.target.src = 'fallback-image-url';
              }}
            />
          )}
          <button onClick={() => closeListing(listing)}>상장 취소</button>
        </div>
      ))}
    </div>
  );
};

async function fetchListings(account) {
  try {
    const response = await fetch('http://localhost:8080/list/' + account);
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

export default MyListing;
