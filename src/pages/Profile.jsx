import React, { useState } from 'react';
import '../styles/ViewProfile.css'; 
import { useNavigate } from 'react-router-dom';
import { Toast } from '@capacitor/toast';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      await Toast.show({
        text: 'New passwords do not match!',
        duration: 'short',
      });
      return;
    }

    // Simulate password update logic
    const storedPassword = localStorage.getItem('password') || 'defaultPassword';
    if (formData.currentPassword !== storedPassword) {
      await Toast.show({
        text: 'Current password is incorrect!',
        duration: 'short',
      });
      return;
    }

    // Update password in localStorage
    localStorage.setItem('password', formData.newPassword);
    await Toast.show({
      text: 'Password updated successfully!',
      duration: 'short',
    });

    navigate('/viewProfile');
  };

  return (
    <div className="homepage-container">
      <h1 className="hotspot-title">Change Password</h1>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Current Password</label>
        <input
          type="password"
          id="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <label>New Password</label>
        <input
          type="password"
          id="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit" className="red-btn">
            Update Password
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

export default ChangePassword;