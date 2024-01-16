import React, { useState, useEffect } from 'react';

const Listing = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const fetchedListings = await fetchListings();
      setListings(fetchedListings);
    }
    loadData();
  }, []);

  return (
    <div>
      <h1>오픈된 담보 리스트</h1>
      {listings.map((listing, index) => (
        <div key={index}>
          <p>Owner: {listing.Owner}</p>
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
                e.target.src = 'fallback-image-url'; // 이미지 로드 실패 시 대체 이미지 URL
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

async function fetchListings() {
  try {
    const response = await fetch('http://localhost:8080/list');
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
