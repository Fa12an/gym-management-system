import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isAuthenticated, userRole, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          💪 <span>MUSCLE UNIVERSE</span>
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/book-trial">Free Trial</Link></li>
          {isAuthenticated && userRole === 'admin' ? (
            <>
              <li><Link to="/admin-dashboard">Admin Panel</Link></li>
              <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/admin-login">Admin Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
