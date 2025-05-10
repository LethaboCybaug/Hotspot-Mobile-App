import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewProfile.css';

const ViewProfile = () => {
  const [profile, setProfile] = useState({
    username: 'No name',
    email: 'No email',
    phone: 'No phone',
    address: 'No address',
    profilePic: 'https://via.placeholder.com/150',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load profile data from localStorage
    setProfile({
      username: localStorage.getItem('username') || 'No name',
      email: localStorage.getItem('email') || 'No email',
      phone: localStorage.getItem('phone') || 'No phone',
      address: localStorage.getItem('address') || 'No address',
      profilePic: localStorage.getItem('profilePic') || 'https://via.placeholder.com/150',
    });
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, profilePic: reader.result }));
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      {/* Profile Picture */}
      <div className="profile-pic-container">
        <img id="profile-pic" src={profile.profilePic} alt="Profile Picture" />
        <input
          type="file"
          id="pic-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfilePicChange}
        />
        <button
          id="change-pic-btn"
          onClick={() => document.getElementById('pic-upload').click()}
        >
          Change Profile Picture
        </button>
      </div>

      {/* Info Display */}
      <div className="info-display">
        <p>
          <strong>Username:</strong> <span id="display-username">{profile.username}</span>
        </p>
        <p>
          <strong>Email:</strong> <span id="display-email">{profile.email}</span>
        </p>
        <p>
          <strong>Phone:</strong> <span id="display-phone">{profile.phone}</span>
        </p>
        <p>
          <strong>Address:</strong> <span id="display-address">{profile.address}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button
          className="button-link"
          onClick={() => navigate('/changepassword')} // Correct route
        >
          Change Password
        </button>
        <button
          className="button-link"
          onClick={() => navigate('/editprofile')} // Correct route
        >
          Edit My Details
        </button>
      </div>

      <div id="password-change-msg" style={{ display: 'none', color: 'red', marginTop: '1rem' }}>
        Password change feature coming soon.
      </div>
    </div>
  );
};

export default ViewProfile;