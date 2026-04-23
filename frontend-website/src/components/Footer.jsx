import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>💪 MUSCLE UNIVERSE</h3>
          <p>Transform your body, transform your life.</p>
          <p>📍 No 50, JKN ARCADE, 4th & 5th Floor,<br />
          1st Cross, 27th Main, BTM 1st Stage,<br />
          Bengaluru, Karnataka 560068</p>
          <p>📞 95356 68280</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/trainers">Trainers</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/join">Join Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 5:30 AM - 10:30 PM</p>
          <p>Saturday: 6:00 AM - 9:00 PM</p>
          <p>Sunday: 6:00 AM - 9:00 PM</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">▶️</a>
          </div>
          <p>Payment: Cash • Google Pay</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Muscle Universe Gym. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
