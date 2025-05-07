import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import '../styles/signup.css';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const handleBackButton = () => {
        navigate('/signin');
      };

      App.addListener('backButton', handleBackButton);

      return () => {
        App.removeAllListeners();
      };
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!username) validationErrors.username = 'Username is required';
    if (!email) validationErrors.email = 'Email is required';
    if (!phoneNumber) validationErrors.phoneNumber = 'Phone number is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign up successful:', data);
        navigate('/signin');
      } else {
        console.error('Sign up failed:', data.message);
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setErrors({ general: 'An error occurred. Please try again later.' });
    }
  };

  const handleGmailSignUp = () => {
    console.log('Signing up with Gmail');
  };

  const handleNavigateToSignIn = () => {
    navigate('/signin');
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <form className="signup-form" onSubmit={handleSignUp}>
        <h1 className="signup-title">SignUp</h1>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <div className="form-group">
          <motion.input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: '' }));
            }}
            placeholder="Enter your username"
            required
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            autoComplete="username"
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <motion.input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="Enter your email"
            required
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            autoComplete="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <motion.input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setErrors((prev) => ({ ...prev, phoneNumber: '' }));
            }}
            placeholder="Enter your phone number"
            required
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            autoComplete="tel"
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <motion.button
          type="submit"
          className="signup-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
        <div className="divider">OR</div>
        <motion.button
          className="gmail-signup-button"
          onClick={handleGmailSignUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up with Gmail
        </motion.button>
        <motion.button
          className="signin-navigation-button"
          onClick={handleNavigateToSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Sign In
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SignUpScreen;
