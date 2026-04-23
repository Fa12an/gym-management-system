import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo(heroTitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Stats counter animation
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(count);
          }
        }, 40);
      };
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });

    // Scroll animations for features
    gsap.utils.toArray('.feature-card, .price-card, .testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="hero-content" ref={heroTitleRef}>
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
              <div className="stat-number" data-target="5000">0</div>
              <div className="stat-label">Happy Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="50">0</div>
              <div className="stat-label">Expert Trainers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="20">0</div>
              <div className="stat-label">Classes Weekly</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="8">0</div>
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
