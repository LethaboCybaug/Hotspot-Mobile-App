// 223005357 M Ndlovu
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBell } from 'react-icons/fa';
import '../styles/Alerts.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const Alerts = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/homescreen');
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
    <div className="alerts-container">
      <div className="alerts-header">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <h2>NOTIFICATIONS</h2>
      </div>

      <div className="notification-item">
        <FaBell className="bell-icon" />
        <p>No new notifications</p>
      </div>
    </div>
  );
};

export default Alerts;