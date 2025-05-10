// 223005357 M Ndlovu
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportIncident.css';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
const ReportIncident = () => {
  const navigate = useNavigate();
  

  const handleBack = () => {
    navigate('/homescreen'); //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/'); 
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
    <div className="report-incident-container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <h2>REPORT INCIDENT</h2>
      </div>

      <form className="incident-form" onSubmit={handleSubmit}>
        <label>Title Field</label>
        <input type="text" placeholder="Enter title" required />

        <label>Description Field</label>
        <textarea placeholder="Enter description" rows="4" required></textarea>

        <button type="button" className="upload-photo-button">
          <FaCamera className="camera-icon" /> Upload Photo
        </button>

        <p className="location-text">Location: Auto-detected</p>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ReportIncident;