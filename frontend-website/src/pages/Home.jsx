import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import heroImage from '../assets/images/gallery_1.jpeg';
import './Home.css';

function Home() {
  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    classes: 0
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
          animateValue(0, 500, 2000, (val) => setStats(prev => ({ ...prev, members: val })));
          animateValue(0, 5, 2000, (val) => setStats(prev => ({ ...prev, trainers: val })));
          animateValue(0, 10, 2000, (val) => setStats(prev => ({ ...prev, classes: val })));
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
  }, []);

  return (
    <div className="home-premium">
      {/* Hero Section with Local Image */}
      <section 
        className="hero-premium"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url(${heroImage})` }}
      >
        <div className="hero-content-premium">
          <div className="hero-badge-premium">🏆 #1 Gym in BTM Layout</div>
          <h1 className="hero-title-premium">
            TRANSFORM YOUR BODY,<br />
            <span className="gradient-text">TRANSFORM YOUR LIFE</span>
          </h1>
          <p className="hero-subtitle-premium">
            Join the most premium fitness destination in Bengaluru. State-of-the-art equipment, 
            expert trainers, and a community that pushes you to be your best.
          </p>
          <div className="hero-buttons-premium">
            <Link to="/join" className="btn-primary-premium">
              Start Free Trial <span>→</span>
            </Link>
            <Link to="/plans" className="btn-secondary-premium">
              View Plans
            </Link>
          </div>
          <div className="hero-stats-premium">
            <div className="hero-stat-premium">
              <div className="hero-stat-number">{stats.members}+</div>
              <div className="hero-stat-label">Happy Members</div>
            </div>
            <div className="hero-stat-divider-premium"></div>
            <div className="hero-stat-premium">
              <div className="hero-stat-number">{stats.trainers}+</div>
              <div className="hero-stat-label">Expert Trainers</div>
            </div>
            <div className="hero-stat-divider-premium"></div>
            <div className="hero-stat-premium">
              <div className="hero-stat-number">{stats.classes}+</div>
              <div className="hero-stat-label">Classes Weekly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-premium">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Experience the <span className="gradient-text">Difference</span></h2>
            <p className="section-subtitle">We provide everything you need to achieve your fitness goals</p>
          </div>
          <div className="features-grid-premium">
            <div className="feature-card-premium">
              <div className="feature-icon">🏋️</div>
              <h3>Modern Equipment</h3>
              <p>Latest fitness equipment from top brands with regular maintenance</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Certified professionals with years of experience in fitness training</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">💪</div>
              <h3>Personalized Plans</h3>
              <p>Custom workout and diet plans tailored to your specific goals</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>Open from 5:30 AM to 10:30 PM, 7 days a week</p>
              <div className="feature-hover"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-premium">
        <div className="cta-content">
          <h2>Ready to Start Your Fitness Journey?</h2>
          <p>Get 3 days FREE trial. No commitment required!</p>
          <Link to="/join" className="btn-primary">Book Your Free Trial →</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
