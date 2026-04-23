import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>MUSCLE UNIVERSE</span></h1>
          <p>Where Champions Are Made. Join the best gym in BTM Layout, Bengaluru!</p>
          <div className="hero-buttons">
            <Link to="/book-trial" className="btn">Book Free Trial</Link>
            <a href="#contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Muscle Universe?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏋️</div>
              <h3>Modern Equipment</h3>
              <p>Latest fitness equipment from top brands</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Certified trainers with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Personalized Plans</h3>
              <p>Custom workout plans for your goals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>Open 5 AM to 11 PM daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <h2 className="section-title">Membership Plans</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <h3>Monthly</h3>
              <div className="price">₹1,499<span>/month</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Basic Training</li>
                <li>✓ Locker Facility</li>
                <li>✓ Free WiFi</li>
              </ul>
              <Link to="/book-trial" className="btn">Book Trial</Link>
            </div>
            <div className="price-card popular">
              <div className="popular-badge">Most Popular</div>
              <h3>Quarterly</h3>
              <div className="price">₹3,999<span>/3 months</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Personal Training (2x/week)</li>
                <li>✓ Locker + Towel</li>
                <li>✓ Diet Consultation</li>
              </ul>
              <Link to="/book-trial" className="btn">Book Trial</Link>
            </div>
            <div className="price-card">
              <h3>Yearly</h3>
              <div className="price">₹12,999<span>/year</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Unlimited Personal Training</li>
                <li>✓ Premium Locker</li>
                <li>✓ Diet Plan + Supplements</li>
              </ul>
              <Link to="/book-trial" className="btn">Book Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location" id="contact">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="location-grid">
            <div className="location-info">
              <h3>📍 Our Address</h3>
              <p>No 50, JKN ARCADE, 3rd & 4th Floor,<br />
              1st Cross, 27th Main, BTM 1st Stage,<br />
              Bengaluru, Karnataka 560068</p>
              
              <h3>📞 Contact</h3>
              <p>Phone: 95356 68280</p>
              
              <h3>🕐 Opening Hours</h3>
              <p>Mon-Fri: 5:00 AM - 11:00 PM</p>
              <p>Saturday: 6:00 AM - 10:00 PM</p>
              <p>Sunday: 7:00 AM - 9:00 PM</p>
              
              <h3>💳 Payment Methods</h3>
              <p>Cash • Google Pay</p>
              
              <h3>🅿️ Parking</h3>
              <p>Free parking lot available • On-site parking</p>
            </div>
            <div className="location-map">
              <iframe
                title="Muscle Universe Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.6075!3d12.9165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15c8a5c0e0f1%3A0x8f8f8f8f8f8f8f8!2sBTM%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Best gym in BTM Layout! The trainers are very supportive and helped me lose 15 kgs in 3 months."</p>
              <h4>- Rahul Sharma</h4>
            </div>
            <div className="testimonial-card">
              <p>"Amazing atmosphere and top-notch equipment. Highly recommend Muscle Universe!"</p>
              <h4>- Priya Patel</h4>
            </div>
            <div className="testimonial-card">
              <p>"Joined 6 months ago and I'm in the best shape of my life. Thank you Muscle Universe!"</p>
              <h4>- Amit Kumar</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
