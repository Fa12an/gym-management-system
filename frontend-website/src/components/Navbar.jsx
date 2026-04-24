import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/images/Muscle_Universe_Logo.jpeg';
import './Navbar.css';

function Navbar({ isAuthenticated, userRole, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/plans', label: 'Membership' },
    { path: '/trainers', label: 'Trainers' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/join', label: 'Join Us' },
  ];

  return (
    <nav className={`navbar-premium ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container-premium">
        <Link to="/" className="logo-premium" onClick={() => setMobileMenuOpen(false)}>
          <img src={logo} alt="Muscle Universe Logo" className="logo-img-premium" />
          <div className="logo-text-premium">
            MUSCLE <span>UNIVERSE</span>
          </div>
        </Link>

        <div className={`nav-menu-premium ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-premium ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated && userRole === 'admin' ? (
            <>
              <Link to="/admin-dashboard" className="nav-link-premium admin-link">Admin</Link>
              <button onClick={onLogout} className="nav-logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/admin-login" className="nav-admin-btn">Admin</Link>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
