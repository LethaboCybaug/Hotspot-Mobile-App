import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewProfile.css';

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
      const choice = window.prompt('Type "view" to view profile picture, "edit" to change it, or "remove" to delete it.');
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
    <div className="view-profile-container" style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'black' }}
          >
            ←
          </button>
          <h1 style={{ flex: 1, textAlign: 'center', fontSize: '22px', margin: 0 }}>My Profile</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        <div className="profile-pic-wrapper" onClick={handleProfileClick} style={{ width: '80px', height: '80px', margin: '0 auto' }}>
          <img
            src={profile.profilePic || 'https://via.placeholder.com/80'}
            alt="Profile"
            className="profile-pic"
            style={{ width: '80px', height: '80px' }}
          />
          <div className="plus-icon" style={{ width: '20px', height: '20px', fontSize: '14px', lineHeight: '20px' }}>+</div>
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleProfilePicChange}
        />

        <div className="profile-details" style={{ marginTop: '20px', fontSize: '14px' }}>
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
    </div>
  );
};

export default ViewProfile;