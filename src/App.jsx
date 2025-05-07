import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpScreen from './pages/SignUpScreen';
import SignInScreen from './pages/SignInScreen';
import HomeScreen from './pages/HomeScreen'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/signIn" element={<SignInScreen />} />
        <Route path="/home" element={<HomeScreen />} /> 
      </Routes>
    </Router>
  );
}

export default App;
