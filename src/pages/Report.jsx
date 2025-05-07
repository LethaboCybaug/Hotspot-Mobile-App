// 223005357 M Ndlovu
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportIncident.css';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
const ReportIncident = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logic to handle form submission
    navigate('/'); //
  };

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