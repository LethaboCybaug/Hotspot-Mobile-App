<<<<<<< HEAD
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpScreen from './pages/SignUpScreen';
import SignInScreen from './pages/SignInScreen';
import HomeScreen from './pages/HomeScreen'; 
=======
// part of this 223005357 M Ndlovu
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Home from './pages/home/Home';
import HomePage from './pages/HomePage';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignUpScreen';
//import Report from './pages/report/Report';
import Report from "./pages/Report";
import Alerts from './pages/Alerts';
>>>>>>> 2c59cd9 (Added home page and resport)

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/signIn" element={<SignInScreen />} />
        <Route path="/home" element={<HomeScreen />} /> 
=======
        <Route path="/" element={<Home />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/alerts" element={<Alerts />} />
>>>>>>> 2c59cd9 (Added home page and resport)
      </Routes>
    </Router>
  );
}

export default App;
