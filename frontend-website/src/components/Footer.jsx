import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>💪 MUSCLE UNIVERSE</h3>
          <p>Transform your body, transform your life.</p>
          <p>📍 No 50, JKN ARCADE, 3rd & 4th Floor,<br />1st Cross, 27th Main, BTM 1st Stage,<br />Bengaluru, Karnataka 560068</p>
          <p>📞 95356 68280</p>
          <p>✉️ info@muscleuniverse.com</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/book-trial">Free Trial</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 5:00 AM - 11:00 PM</p>
          <p>Saturday: 6:00 AM - 10:00 PM</p>
          <p>Sunday: 7:00 AM - 9:00 PM</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <p>✅ Outdoor services</p>
          <p>✅ On-site services</p>
          <p>✅ Wheelchair accessible</p>
          <p>✅ LGBTQ+ friendly</p>
          <p>✅ Free Parking</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Muscle Universe Gym. All rights reserved.</p>
        <p>Payments: Cash • Google Pay</p>
      </div>
    </footer>
  );
}

export default Footer;
