import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Trainers from './pages/Trainers';
import Gallery from './pages/Gallery';
import Join from './pages/Join';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import API_URL from './config';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth?token=${localStorage.getItem('token')}`);
      setIsAuthenticated(true);
      setUserRole(response.data.role);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-ring"></div>
          <div className="loader-text">MUSCLE UNIVERSE</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/join" element={<Join />} />
        <Route path="/admin-login" element={
          isAuthenticated ? <Navigate to="/admin-dashboard" /> : <AdminLogin onLogin={checkAuth} />
        } />
        <Route path="/admin-dashboard" element={
          isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/admin-login" />
        } />
      </Routes>
      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
