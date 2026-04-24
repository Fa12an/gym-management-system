import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

// Try different possible paths for the logo
const logoPaths = [
  process.env.PUBLIC_URL + '/assets/images/Muscle_Universe_Logo.jpeg',
  process.env.PUBLIC_URL + '/assets/images/logo.jpeg',
  process.env.PUBLIC_URL + '/images/Muscle_Universe_Logo.jpeg',
  process.env.PUBLIC_URL + '/logo.jpeg',
  '/assets/images/Muscle_Universe_Logo.jpeg',
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
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

  // Use the first valid logo path
  const logoSrc = logoError ? null : logoPaths[0];

  return (
    <nav className={`navbar-premium ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container-premium">
        <Link to="/" className="logo-premium" onClick={() => setMobileMenuOpen(false)}>
          {!logoError && logoSrc && (
            <img 
              src={logoSrc} 
              alt="Muscle Universe Logo" 
              className="logo-img-premium" 
              onError={() => setLogoError(true)}
            />
          )}
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
