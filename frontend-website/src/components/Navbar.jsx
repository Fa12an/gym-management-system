import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

// Use require for logo
const logo = process.env.PUBLIC_URL + '/assets/images/Muscle_Universe_Logo.jpeg';

function Navbar() {
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
          <img src={logo} alt="Muscle Universe Logo" className="logo-img-premium" onError={(e) => { e.target.style.display = 'none' }} />
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
