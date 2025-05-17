import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomeScreen from './pages/HomeScreen';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';
import Report from './pages/Report';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ViewProfile from './pages/ViewProfile'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/report" element={<Report />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<Profile />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
