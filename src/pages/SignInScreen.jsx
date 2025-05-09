import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { motion } from 'framer-motion';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!email) validationErrors.email = 'Email is required';
    if (!phoneNumber) validationErrors.phoneNumber = 'Phone number is required';
    if (!otp) validationErrors.otp = 'OTP is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Logging in with:', { email, phoneNumber, otp });
    navigate('/home');
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  const handleGmailSignUp = () => {
    console.log('Signing in with Gmail');
  };

  return (
    <div className="signup-container">
      <motion.form
        className="signup-form"
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="signup-title">Login</h1>

        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="Enter your email address"
            required
            autoComplete="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group mb-3">
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setErrors((prev) => ({ ...prev, phoneNumber: '' }));
            }}
            placeholder="Enter your phone number"
            required
            autoComplete="tel"
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control"
            id="otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setErrors((prev) => ({ ...prev, otp: '' }));
            }}
            placeholder="Enter the OTP"
            required
          />
          {errors.otp && <p className="error-message">{errors.otp}</p>}
        </div>

        <button type="submit" className="btn login-button">
          Login
        </button>
        <div className="divider"></div>
        <button
          type="button"
          className="btn signup-navigation-button"
          onClick={handleGmailSignUp}
        >
          Gmail
        </button>

        <div className="divider">Don't have an account?</div>

        <button
          type="button"
          className="btn signup-navigation-button"
          onClick={handleNavigateToSignUp}
        >
          Sign Up Now
        </button>
      </motion.form>
    </div>
  );
};

export default SignInScreen;
