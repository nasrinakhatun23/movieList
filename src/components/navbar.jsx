import React from 'react';
import './navbar.css';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Movie List</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
      </ul>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for movies..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>
    </nav>
  );
};

export default Navbar;



