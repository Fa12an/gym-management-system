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

    const statsSection = document.querySelector('.home-stats-premium');
    if (statsSection) observer.observe(statsSection);

    // Animate feature cards on scroll
    const cards = document.querySelectorAll('.feature-card-premium');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      cardObserver.observe(card);
    });

    return () => {
      cardObserver.disconnect();
    };
  }, []);

  return (
    <div className="home-premium">
      {/* Hero Section */}
      <section className="home-hero-premium">
        <div className="hero-bg-premium"></div>
        <div className="hero-overlay-premium"></div>
        <div className="hero-gradient-premium"></div>
        <div className="hero-content-premium">
          <div className="hero-badge-premium">🏆 #1 Gym in BTM Layout</div>
          <h1 className="hero-title-premium">
            TRANSFORM YOUR<br />
            <span className="gradient-text">BODY, TRANSFORM</span><br />
            YOUR LIFE
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
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-premium">
              <div className="hero-stat-number">{stats.trainers}+</div>
              <div className="hero-stat-label">Expert Trainers</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-premium">
              <div className="hero-stat-number">20+</div>
              <div className="hero-stat-label">Classes Weekly</div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div className="scroll-mouse"></div>
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
              <p>Latest fitness equipment from top brands with regular maintenance and upgrades</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Certified professionals with years of experience in fitness training and nutrition</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">💪</div>
              <h3>Personalized Plans</h3>
              <p>Custom workout and diet plans tailored to your specific goals and lifestyle</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>Open from 5:30 AM to 10:30 PM, 7 days a week to fit your schedule</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">🧘</div>
              <h3>Diverse Classes</h3>
              <p>Yoga, Zumba, CrossFit, HIIT, and more group classes for all fitness levels</p>
              <div className="feature-hover"></div>
            </div>
            <div className="feature-card-premium">
              <div className="feature-icon">🤝</div>
              <h3>Community</h3>
              <p>Supportive and motivating fitness community that keeps you accountable</p>
              <div className="feature-hover"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats-premium">
        <div className="stats-bg"></div>
        <div className="stats-overlay"></div>
        <div className="container">
          <div className="stats-grid-premium">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{stats.members}+</div>
              <div className="stat-label">Happy Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">{stats.trainers}+</div>
              <div className="stat-label">Expert Trainers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-number">{stats.classes}+</div>
              <div className="stat-label">Classes Weekly</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">{stats.years}+</div>
              <div className="stat-label">Years Excellence</div>
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
