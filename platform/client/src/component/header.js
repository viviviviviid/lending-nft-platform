// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'

const Header = () => {
  return (
    <div className="header">
      <Link to="/list" className="pageLink">List</Link>
      <Link to="/mypage" className="pageLink">Mypage</Link>
      <Link to="/MyListing" className="pageLink">MyListing</Link>
    </div>
  );
}

export default Header;
