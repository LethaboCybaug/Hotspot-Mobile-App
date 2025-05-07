<<<<<<< HEAD
import React, { useEffect } from 'react';
import '../styles/home.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const HomeScreen = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const handleBackButton = () => {
        App.exitApp();
      };

      App.addListener('backButton', handleBackButton);

      return () => {
        App.removeAllListeners(); 
      };
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to HOTSPOT</h1>
      <div className="home-sections">
        <div className="section">
          <h2>Voice Commands</h2>
          <p>Store and manage voice inputs that trigger app functions.</p>
          <button className="section-button">View Commands</button>
        </div>
        <div className="section">
          <h2>Routes</h2>
          <p>Track navigation routes and travel times.</p>
          <button className="section-button">View Routes</button>
        </div>
        <div className="section">
          <h2>Traffic Incidents</h2>
          <p>Log and monitor traffic-related events like accidents and roadblocks.</p>
          <button className="section-button">View Incidents</button>
        </div>
        <div className="section">
          <h2>Alerts</h2>
          <p>Receive safety alerts and notifications about incidents.</p>
          <button className="section-button">View Alerts</button>
        </div>
        <div className="section">
          <h2>Locations</h2>
          <p>Manage geographical points for incidents and routes.</p>
          <button className="section-button">View Locations</button>
        </div>
      </div>
    </div>
  );
};

=======
import React, { useEffect } from 'react';
import '../styles/home.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const HomeScreen = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const handleBackButton = () => {
        App.exitApp();
      };

      App.addListener('backButton', handleBackButton);

      return () => {
        App.removeAllListeners(); 
      };
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to HOTSPOT</h1>
      <div className="home-sections">
        <div className="section">
          <h2>Voice Commands</h2>
          <p>Store and manage voice inputs that trigger app functions.</p>
          <button className="section-button">View Commands</button>
        </div>
        <div className="section">
          <h2>Routes</h2>
          <p>Track navigation routes and travel times.</p>
          <button className="section-button">View Routes</button>
        </div>
        <div className="section">
          <h2>Traffic Incidents</h2>
          <p>Log and monitor traffic-related events like accidents and roadblocks.</p>
          <button className="section-button">View Incidents</button>
        </div>
        <div className="section">
          <h2>Alerts</h2>
          <p>Receive safety alerts and notifications about incidents.</p>
          <button className="section-button">View Alerts</button>
        </div>
        <div className="section">
          <h2>Locations</h2>
          <p>Manage geographical points for incidents and routes.</p>
          <button className="section-button">View Locations</button>
        </div>
      </div>
    </div>
  );
};

>>>>>>> 2c59cd9 (Added home page and resport)
export default HomeScreen;