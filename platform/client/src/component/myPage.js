// Mypage.js

import React from 'react';
import NFTList from './NFTList'; // NFTList 컴포넌트 import
import '../styles/myPage.css'

// 내가 리스팅한 목록만 나오도록 쿼리문 -> GET API로 특정 address를 보냈을때 그 목록이 나오게 -> http://localhost:8080/list?address="" 이런식의 쿼리문
// 불러오면 화면에 뿌려주고, 취소버튼 만들어두기
// 취소버튼 누르면 만들어둔 컨트랙트 함수 호출하고, 컨펌되면 delisting API 쏴서 close로 변경되도록.



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
