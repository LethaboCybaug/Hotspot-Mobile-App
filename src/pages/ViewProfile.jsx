// 223005357 M Ndlovu
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBell, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Alerts.css'; // Using shared styles

const ViewProfile = () => {
  const [profile, setProfile] = useState({
    username: 'username',
    email: 'john@example.com',
    phone: '081 234 5678',
    address: '123 Main Street, City',
    profilePic: '',
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProfile({
      username: localStorage.getItem('username') || 'No name',
      email: localStorage.getItem('email') || 'john@example.com',
      phone: localStorage.getItem('phone') || '081 234 5678',
      address: localStorage.getItem('address') || '123 Main Street, City',
      profilePic: localStorage.getItem('profilePic') || '',
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

  const handleRemoveProfilePic = () => {
    setProfile((prev) => ({ ...prev, profilePic: '' }));
    localStorage.removeItem('profilePic');
  };

  const handleProfileClick = () => {
    if (!profile.profilePic) {
      fileInputRef.current.click();
    } else {
      const choice = window.prompt('Type "view" to view, "edit" to change, or "remove" to delete your profile picture.');
      if (choice === 'view') {
        window.open(profile.profilePic, '_blank');
      } else if (choice === 'edit') {
        fileInputRef.current.click();
      } else if (choice === 'remove') {
        handleRemoveProfilePic();
      }
    }
  };

  return (
    <div className="alerts-wrapper" style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', backgroundColor: 'white' }}>
        <button
          onClick={() => navigate('/home')}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'black' }}
        >
          ←
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: '20px', margin: 0 }}>My Profile</h1>
        <div style={{ width: '24px' }}></div>
      </div>

      <hr className="bottom-divider" />

      {/* Profile Section */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }} onClick={handleProfileClick}>
          <img
            src={profile.profilePic || 'https://via.placeholder.com/120'}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid red',
            }}
          />
          {/* Instagram-style + icon */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'red',
              color: 'white',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
              cursor: 'pointer',
            }}
          >
            +
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleProfilePicChange}
        />

        {/* Profile Info */}
        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <h2 style={{ fontSize: '18px' }}>{profile.username}</h2>
          <p><strong>EMAIL:</strong> {profile.email}</p>
          <p><strong>PHONE:</strong> {profile.phone}</p>
          <p><strong>ADDRESS:</strong> {profile.address}</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button
            style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '5px' }}
            onClick={() => navigate('/edit-profile')}
          >
            Edit My Details
          </button>
          <button
            style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
            onClick={() => navigate('/changemypassword')}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flexGrow: 1 }} />

      {/* Bottom Navigation */}
      <hr className="bottom-divider" />
      <div className="bottom-navigation">
        <div className="nav-item" onClick={() => navigate('/home')}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/alerts')}>
          <FaBell />
          <span>Alerts</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/profile')}>
          <FaUser style={{ color: 'red' }} />
          <span style={{ color: 'red' }}>Profile</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/map')}>
          <FaMapMarkerAlt />
          <span>Map</span>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;