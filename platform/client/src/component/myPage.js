// Mypage.js

import React from 'react';
import NFTList from './NFTList'; // NFTList 컴포넌트 import
import '../styles/myPage.css'

const Mypage = ({ web3, account }) => {
  return (
    <div className="mypage-container">
      <h1>내 페이지</h1>
      {/* 기존의 Mypage 컴포넌트 내용 추가 */}
      {/* 예시로 NFTList 컴포넌트 추가 */}
      <NFTList web3={web3} account={account} />
    </div>
  );
};

export default Mypage;
