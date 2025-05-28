import React from "react";
import "./HomePage.css";
import {Link} from 'react-router-dom';
const HomePage = ()=> {
  return (
    <div className="home-container">
      <h2 className="home-header">Transforming Waste into Resources</h2>
      <p className="home-subtitle">Join Us in Making Clean Communities a Reality!</p>

      <div className="button-container">
      <Link to='/'><button className="home-button">🏠 HOME</button></Link>
        <button className="home-button">🚛 TRACK COLLECTION</button>
       <Link to='/reportbin'><button className="home-button">🗑 REPORT BIN</button></Link> 
        <button className="home-button">📖 EDUCATIONAL RESOURCES</button>
        <button className="home-button">🤝 COMMUNITY INITIATIVES</button>
        <button className="home-button">🌟 ALERTS</button>
        <button className="home-button">⚙ SETTINGS</button>
        <button className="home-button">👍 FEEDBACK</button>
      </div>
    </div>
  );
}

export default HomePage;