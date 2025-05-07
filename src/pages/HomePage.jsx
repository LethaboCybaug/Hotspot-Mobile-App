<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const HomePage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => navigate('/signin'), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
    <div className={`homepage-container ${isExiting ? 'page-exit' : ''}`}>
      <h1 className="hotspot-title">HOTSPOT</h1>
    </div>
  );
};

export default HomePage;
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const HomePage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => navigate('/signin'), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
    <div className={`homepage-container ${isExiting ? 'page-exit' : ''}`}>
      <h1 className="hotspot-title">HOTSPOT</h1>
    </div>
  );
};

export default HomePage;
>>>>>>> 2c59cd9 (Added home page and resport)
