import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-container-premium">
        <div className="footer-grid-premium">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="footer-logo-icon">💪</span>
              <h3>MUSCLE <span>UNIVERSE</span></h3>
            </div>
            <p>Transform your body, transform your life. The premier fitness destination in Bengaluru.</p>
            <div className="footer-social">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">🎥</a>
              <a href="#" className="social-icon">💬</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/plans">Membership</Link></li>
              <li><Link to="/trainers">Trainers</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/join">Join Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li>📍 No 50, JKN ARCADE, 3rd & 4th Floor</li>
              <li>1st Cross, 27th Main, BTM 1st Stage</li>
              <li>Bengaluru, Karnataka 560068</li>
              <li>📞 95356 68280</li>
              <li>✉️ info@muscleuniverse.com</li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <ul>
              <li>Mon-Fri: 5:30 AM - 10:30 PM</li>
              <li>Saturday: 6:00 AM - 9:00 PM</li>
              <li>Sunday: 6:00 AM - 9:00 PM</li>
            </ul>
            <div className="payment-methods">
              <span>💵 Cash</span>
              <span>📱 Google Pay</span>
              <span>💳 Card</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Muscle Universe Gym. All rights reserved.</p>
          <p>🏆 #1 Gym in BTM Layout</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
