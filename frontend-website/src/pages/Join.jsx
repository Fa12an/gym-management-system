import { useState, useEffect } from 'react';
import './Join.css';

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: '',
    preferred_date: '',
    preferred_time: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reviews = [
    {
      name: "RITIK MENARIA",
      rating: 5,
      text: "This gym offers a great environment for both beginners and experienced fitness enthusiasts. The equipment is well-maintained, and the trainers are knowledgeable and supportive."
    },
    {
      name: "Mohit Kumar",
      rating: 5,
      text: "Amazing place to train with top-quality equipment. The trainers are super helpful and always motivate you to push harder."
    },
    {
      name: "shruti shukla",
      rating: 5,
      text: "Great gym with excellent trainers! They're supportive, knowledgeable, and really help you stay consistent."
    }
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.review-card-small, .join-benefit');
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
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const formatWhatsAppMessage = (data) => {
    return `*🏋️‍♂️ MUSCLE UNIVERSE GYM - NEW TRIAL BOOKING 🏋️‍♀️*%0A%0A
*📋 MEMBER DETAILS*%0A
━━━━━━━━━━━━━━━━━━━━%0A
*Name:* ${data.name}%0A
*Phone:* ${data.phone}%0A
*Email:* ${data.email}%0A
━━━━━━━━━━━━━━━━━━━━%0A%0A
*🎯 FITNESS GOAL*%0A
${data.goal}%0A%0A
*📅 PREFERRED DATE & TIME*%0A
*Date:* ${data.preferred_date}%0A
*Time:* ${data.preferred_time}%0A%0A
━━━━━━━━━━━━━━━━━━━━%0A
*⏰ Booking Time:* ${new Date().toLocaleString()}%0A
*Status:* Pending Confirmation%0A
━━━━━━━━━━━━━━━━━━━━%0A%0A
*✅ Next Steps:*%0A
1. Call the customer to confirm%0A
2. Schedule a gym tour%0A
3. Assign a trainer%0A%0A
*📞 Contact: 95356 68280*`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate all fields
    if (!formData.name || !formData.phone || !formData.email || !formData.goal || !formData.preferred_date || !formData.preferred_time) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    try {
      const phoneNumber = "919535668280"; // Gym WhatsApp number
      const message = formatWhatsAppMessage(formData);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        goal: '',
        preferred_date: '',
        preferred_time: ''
      });
      
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="join-premium">
        <div className="success-premium">
          <div className="success-card-premium">
            <div className="success-icon">✅</div>
            <h2>Trial Booked Successfully!</h2>
            <p>Thank you for choosing Muscle Universe Gym!</p>
            <p>WhatsApp will open with your booking details.</p>
            <p className="success-note">Our team will contact you within 24 hours to confirm your trial.</p>
            <button onClick={() => setSubmitted(false)} className="btn-primary">Book Another Trial</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="join-premium">
      <div className="join-hero">
        <div className="join-hero-overlay"></div>
        <div className="join-hero-content">
          <h1>Start Your <span className="gradient-text">Fitness Journey</span></h1>
          <p>Book your free trial today and experience the Muscle Universe difference</p>
        </div>
      </div>

      <div className="container">
        <div className="join-container-premium">
          {/* Benefits Section */}
          <div className="join-benefits">
            <h2>What's Included in Your <span className="gradient-text">Free Trial?</span></h2>
            <div className="benefits-grid">
              <div className="join-benefit">
                <div className="benefit-icon">🏋️</div>
                <h3>3 Days Full Access</h3>
                <p>Complete access to all gym equipment and facilities</p>
              </div>
              <div className="join-benefit">
                <div className="benefit-icon">👨‍🏫</div>
                <h3>Personal Training Session</h3>
                <p>One-on-one session with expert trainer</p>
              </div>
              <div className="join-benefit">
                <div className="benefit-icon">📊</div>
                <h3>Body Composition Analysis</h3>
                <p>Detailed analysis of your body metrics</p>
              </div>
              <div className="join-benefit">
                <div className="benefit-icon">🥗</div>
                <h3>Diet Consultation</h3>
                <p>Basic nutrition guidance from experts</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="join-form-container">
            <h2>Book Your <span className="gradient-text">Free Trial</span></h2>
            <p className="form-note">Fill your details below. We'll contact you on WhatsApp to confirm your trial.</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="join-form-premium">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <select name="goal" value={formData.goal} onChange={handleChange} required>
                  <option value="">Select Your Goal</option>
                  <option value="Weight Loss">🏋️ Weight Loss</option>
                  <option value="Muscle Gain">💪 Muscle Gain</option>
                  <option value="General Fitness">🎯 General Fitness</option>
                  <option value="Strength Training">⚡ Strength Training</option>
                  <option value="Flexibility & Mobility">🧘 Flexibility & Mobility</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="date"
                    name="preferred_date"
                    placeholder="Preferred Date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select name="preferred_time" value={formData.preferred_time} onChange={handleChange} required>
                    <option value="">Preferred Time</option>
                    <option value="6:00 AM - 8:00 AM">🌅 6:00 AM - 8:00 AM</option>
                    <option value="8:00 AM - 10:00 AM">☀️ 8:00 AM - 10:00 AM</option>
                    <option value="4:00 PM - 6:00 PM">🌤️ 4:00 PM - 6:00 PM</option>
                    <option value="6:00 PM - 8:00 PM">🌙 6:00 PM - 8:00 PM</option>
                    <option value="8:00 PM - 10:00 PM">🌃 8:00 PM - 10:00 PM</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Book Free Trial →'}
              </button>
            </form>
            <p className="terms">*No commitment required. Cancel anytime.</p>
            <p className="whatsapp-note">📱 Your booking details will be sent to our WhatsApp. We'll respond within 24 hours.</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="join-reviews">
          <h2>What Our <span className="gradient-text">Members Say</span></h2>
          <div className="join-reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card-small">
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p>"{review.text}"</p>
                <h4>- {review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
