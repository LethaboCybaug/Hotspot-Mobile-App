import React, { useState, useEffect } from 'react';
import '../styles/ViewProfile.css'; 
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load existing data into form
    setFormData({
      username: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || '',
      phone: localStorage.getItem('phone') || '',
      address: localStorage.getItem('address') || '',
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to localStorage
    localStorage.setItem('username', formData.username);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('address', formData.address);

    // Navigate back to the profile page
    navigate('/viewProfile');
  };

  return (
    <div className="homepage-container">
      <h1 className="hotspot-title">Edit My Details</h1>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Living Address</label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit" className="red-btn">
            Save Changes
          </button>
          <button
            type="button"
            className="red-btn"
            onClick={() => navigate('/viewProfile')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;