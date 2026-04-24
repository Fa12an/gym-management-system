import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Plans.css';

function Plans() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = {
    monthly: [
      {
        id: 1,
        name: 'Basic',
        price: '1,499',
        period: 'month',
        features: [
          'Full Gym Access',
          'Basic Training Guidance',
          'Locker Facility',
          'Free WiFi',
          'Changing Rooms',
          'Drinking Water'
        ],
        popular: false,
        color: '#f5a623'
      },
      {
        id: 2,
        name: 'Pro',
        price: '2,499',
        period: 'month',
        features: [
          'Full Gym Access',
          'Personal Training (4x/week)',
          'Premium Locker',
          'Free WiFi + Towel',
          'Diet Consultation',
          'Body Composition Analysis',
          'Guest Pass (1/month)'
        ],
        popular: true,
        color: '#f5a623'
      },
      {
        id: 3,
        name: 'Elite',
        price: '3,999',
        period: 'month',
        features: [
          '24/7 Gym Access',
          'Unlimited Personal Training',
          'VIP Locker',
          'Custom Diet Plan',
          'Monthly Progress Tracking',
          'Supplement Discounts',
          'Guest Pass (2/month)',
          'Priority Class Booking'
        ],
        popular: false,
        color: '#f5a623'
      }
    ],
    quarterly: [
      {
        id: 4,
        name: 'Basic',
        price: '3,999',
        period: '3 months',
        features: [
          'Full Gym Access',
          'Basic Training Guidance',
          'Locker Facility',
          'Free WiFi',
          'Changing Rooms'
        ],
        popular: false,
        color: '#f5a623'
      },
      {
        id: 5,
        name: 'Pro',
        price: '6,999',
        period: '3 months',
        features: [
          'Full Gym Access',
          'Personal Training (4x/week)',
          'Premium Locker + Towel',
          'Diet Consultation',
          'Body Composition Analysis',
          'Free Protein Shake (1/week)'
        ],
        popular: true,
        color: '#f5a623'
      },
      {
        id: 6,
        name: 'Elite',
        price: '10,999',
        period: '3 months',
        features: [
          '24/7 Gym Access',
          'Unlimited Personal Training',
          'VIP Locker',
          'Custom Diet Plan',
          'Monthly Progress Tracking',
          'Supplement Discounts (20%)'
        ],
        popular: false,
        color: '#f5a623'
      }
    ],
    yearly: [
      {
        id: 7,
        name: 'Basic',
        price: '12,999',
        period: 'year',
        features: [
          'Full Gym Access',
          'Basic Training Guidance',
          'Locker Facility',
          'Free WiFi',
          'Changing Rooms'
        ],
        popular: false,
        color: '#f5a623'
      },
      {
        id: 8,
        name: 'Pro',
        price: '22,999',
        period: 'year',
        features: [
          'Full Gym Access',
          'Personal Training (4x/week)',
          'Premium Locker + Towel',
          'Diet Consultation',
          'Body Composition Analysis',
          'Free Merchandise'
        ],
        popular: true,
        color: '#f5a623'
      },
      {
        id: 9,
        name: 'Elite',
        price: '35,999',
        period: 'year',
        features: [
          '24/7 Gym Access',
          'Unlimited Personal Training',
          'VIP Locker',
          'Custom Diet Plan',
          'Monthly Progress Tracking',
          'Supplement Discounts (30%)',
          'Free Annual Health Checkup'
        ],
        popular: false,
        color: '#f5a623'
      }
    ]
  };

  const currentPlans = plans[billingCycle];

  useEffect(() => {
    const cards = document.querySelectorAll('.plan-card-premium');
    const observer = new IntersectionObserver((entries) => {
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
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [billingCycle]);

  return (
    <div className="plans-page">
      <div className="plans-hero">
        <div className="plans-hero-overlay"></div>
        <div className="plans-hero-content">
          <h1>Membership Plans</h1>
          <p>Choose the perfect plan that fits your fitness journey</p>
        </div>
      </div>

      <div className="container">
        {/* Billing Toggle */}
        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'quarterly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('quarterly')}
          >
            Quarterly
            <span className="save-badge">Save 15%</span>
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <span className="save-badge">Save 30%</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid-premium">
          {currentPlans.map((plan, index) => (
            <div 
              key={plan.id} 
              className={`plan-card-premium ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge-premium">
                  🔥 Most Popular
                </div>
              )}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">₹</span>
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                <p className="plan-description">
                  {plan.name === 'Basic' && 'Perfect for beginners starting their fitness journey'}
                  {plan.name === 'Pro' && 'Best for regular fitness enthusiasts'}
                  {plan.name === 'Elite' && 'Ultimate package for serious athletes'}
                </p>
              </div>
              <div className="plan-features">
                {plan.features.map((feature, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/join" className="plan-btn">
                Get Started
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="faq-section-premium">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid-premium">
            <div className="faq-item-premium">
              <h3>Can I upgrade my plan later?</h3>
              <p>Yes, you can upgrade anytime. The remaining amount will be adjusted for your new plan.</p>
            </div>
            <div className="faq-item-premium">
              <h3>Is there a joining fee?</h3>
              <p>No joining fee! Just pay for your chosen membership plan.</p>
            </div>
            <div className="faq-item-premium">
              <h3>Can I freeze my membership?</h3>
              <p>Yes, you can freeze for up to 30 days (medical/travel reasons).</p>
            </div>
            <div className="faq-item-premium">
              <h3>What are payment options?</h3>
              <p>Cash, Card, UPI, and NetBanking all accepted.</p>
            </div>
            <div className="faq-item-premium">
              <h3>Is there a trial period?</h3>
              <p>Yes! Get 3 days free trial before committing to any plan.</p>
            </div>
            <div className="faq-item-premium">
              <h3>Family discount available?</h3>
              <p>Yes! 15% discount for 2+ family members.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="plans-cta">
          <div className="plans-cta-content">
            <h2>Not sure which plan to choose?</h2>
            <p>Book a free trial and experience our gym before committing!</p>
            <Link to="/join" className="btn-plans-cta">Book Free Trial →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;
