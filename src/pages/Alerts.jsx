// 223005357 M Ndlovu
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBell, FaHome, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Alerts.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const Alerts = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/homescreen');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const handleBackButton = () => {
        App.exitApp();
      };
      App.addListener('backButton', handleBackButton);
      return () => App.removeAllListeners();
    }
  }, []);

  return (
    <div className="alerts-wrapper">
      <div className="alerts-container">
        <div className="alerts-header">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <div className="header-center">
            <FaBell className="top-bell-icon" />
            <h2>Notifications</h2>
          </div>
        </div>

        <hr className="header-line" />

        <div className="alerts-subtitle">
          <p>List of nearby alerts</p>
        </div>

        <div className="alert-box">
          <div className="alert-circle" />
          <div>
            <p className="alert-title">Robbery</p>
            <p className="alert-distance">300m away</p>
          </div>
        </div>

        <div className="alert-box">
          <div className="alert-circle" />
          <div>
            <p className="alert-title">Assault</p>
            <p className="alert-distance">800m away</p>
          </div>
        </div>
      </div>

      <hr className="bottom-divider" />

      <div className="bottom-navigation">
        <div className="nav-item" onClick={() => handleNavigate('/homescreen')}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigate('/alerts')}>
          <FaBell />
          <span>Alerts</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigate('/profile')}>
          <FaUser />
          <span>Profile</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigate('/map')}>
          <FaMapMarkerAlt />
          <span>Map</span>
        </div>
      </div>
    </div>
  );
};

export default Alerts;