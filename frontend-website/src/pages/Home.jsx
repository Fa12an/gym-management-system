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

    const statsSection = document.querySelector('.hero-stats-premium');
    if (statsSection) observer.observe(statsSection);

    // Animate feature cards
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
  }, []);

  const features = [
    { icon: '🏋️', title: 'Modern Equipment', desc: 'Latest fitness equipment from top brands with regular maintenance' },
    { icon: '👨‍🏫', title: 'Expert Trainers', desc: 'Certified professionals with years of experience in fitness training' },
    { icon: '💪', title: 'Personalized Plans', desc: 'Custom workout and diet plans tailored to your specific goals' },
    { icon: '🕐', title: 'Flexible Hours', desc: 'Open from 5:30 AM to 10:30 PM, 7 days a week' },
    { icon: '🧘', title: 'Diverse Classes', desc: 'Yoga, Zumba, CrossFit, HIIT, and more group classes' },
    { icon: '🤝', title: 'Supportive Community', desc: 'A motivating environment that keeps you accountable' }
  ];

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

      {/* Features Section - 6 Cards */}
      <section className="features-premium">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Experience the <span className="gradient-text">Difference</span></h2>
            <p className="section-subtitle">We provide everything you need to achieve your fitness goals</p>
          </div>
          <div className="features-grid-premium">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-premium">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className="feature-hover"></div>
              </div>
            ))}
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
