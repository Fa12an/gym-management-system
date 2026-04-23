import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    classes: 0,
    years: 0
  });

  useEffect(() => {
    // Animate stats counter
    const animateValue = (start, end, duration, setter) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Start counter animations when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(0, 5000, 2000, (val) => setStats(prev => ({ ...prev, members: val })));
          animateValue(0, 50, 2000, (val) => setStats(prev => ({ ...prev, trainers: val })));
          animateValue(0, 20, 2000, (val) => setStats(prev => ({ ...prev, classes: val })));
          animateValue(0, 8, 2000, (val) => setStats(prev => ({ ...prev, years: val })));
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            TRANSFORM YOUR<br />
            <span>BODY, TRANSFORM</span><br />
            YOUR LIFE
          </h1>
          <p className="hero-subtitle">
            Join Muscle Universe Gym - The premier fitness destination in BTM Layout, Bengaluru
          </p>
          <div className="hero-buttons">
            <Link to="/join" className="btn">Start Your Journey →</Link>
            <a href="#features" className="btn btn-outline">Explore More</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{stats.members}+</div>
              <div className="stat-label">Happy Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.trainers}+</div>
              <div className="stat-label">Expert Trainers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.classes}+</div>
              <div className="stat-label">Classes Weekly</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.years}+</div>
              <div className="stat-label">Years Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏋️</div>
              <h3>Modern Equipment</h3>
              <p>Latest fitness equipment from top brands with regular maintenance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Certified professionals with years of experience in fitness training</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Personalized Plans</h3>
              <p>Custom workout and diet plans tailored to your specific goals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>Open from 5:30 AM to 10:30 PM, 7 days a week</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧘</div>
              <h3>Diverse Classes</h3>
              <p>Yoga, Zumba, CrossFit, HIIT, and more group classes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Community</h3>
              <p>Supportive and motivating fitness community environment</p>
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
              <div className="price-badge">Basic</div>
              <h3>Monthly</h3>
              <div className="price">₹1,499<span>/month</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Basic Training Guidance</li>
                <li>✓ Locker Facility</li>
                <li>✓ Free WiFi</li>
                <li>✓ Changing Rooms</li>
              </ul>
              <Link to="/join" className="btn">Get Started</Link>
            </div>
            <div className="price-card popular">
              <div className="price-badge">Most Popular</div>
              <h3>Quarterly</h3>
              <div className="price">₹3,999<span>/3 months</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Personal Training (2x/week)</li>
                <li>✓ Locker + Towel Service</li>
                <li>✓ Diet Consultation</li>
                <li>✓ Body Composition Analysis</li>
              </ul>
              <Link to="/join" className="btn">Get Started</Link>
            </div>
            <div className="price-card">
              <div className="price-badge">Best Value</div>
              <h3>Yearly</h3>
              <div className="price">₹12,999<span>/year</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Unlimited Personal Training</li>
                <li>✓ Premium Locker</li>
                <li>✓ Custom Diet Plan</li>
                <li>✓ Monthly Progress Tracking</li>
              </ul>
              <Link to="/join" className="btn">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Fitness Journey?</h2>
            <p>Get 3 days FREE trial. No commitment required!</p>
            <Link to="/join" className="btn">Book Free Trial →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
