import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Listing from './component/listing';
import Header from './component/header'; 
import Mypage from './component/myPage'; 

function App() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();

  const connectWallet = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header account={account} connectWallet={connectWallet} />
        <button
          className="Metamask"
          onClick={() => {
            connectWallet();
          }}>
          Connect to Metamask
        </button>
        <div className="userInfo">주소: {account}</div>
        <Routes>
          <Route path="/mypage" element={<Mypage web3={web3} account={account} />} />
          <Route path="/list" element={<Listing web3={web3} account={account} />} />

          {/* 다른 라우트들 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
