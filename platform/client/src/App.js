import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();

  const connectWallet = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

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
    <div className="App">
      <h1>Lend with NFT!</h1>
      <button
        className="Metamask"
        onClick={() => {
          connectWallet();
        }}
      >
        Connect to Metamask
      </button>
      <div className="userInfo">주소: {account}</div>
    </div>
  );
}

export default App;
