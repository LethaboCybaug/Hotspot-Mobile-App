// 223005357 M Ndlovu
import React from 'react';
import './Home.css';
import { FaBell, FaArrowLeft, FaHome, FaPlus, FaExclamationTriangle, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // initialize navigation

  return (
    <div className="home-page">
      <header className="header">
        <FaArrowLeft className="icon-left" />
        <h1>Home Screen</h1>
        <FaBell className="icon-right" />
      </header>

      <div className="map-area">
        <button className="floating-button" onClick={() => navigate('/report')}>
          <FaPlus />
        </button>
      </div>

      <footer className="footer">
        <div className="nav-item active">
          <FaHome />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/report')}>
          <FaExclamationTriangle />
          <span>Report</span>
        </div>
        <div className="nav-item">
          <FaRegEye />
          <span>Alerts</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
