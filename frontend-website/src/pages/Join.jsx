import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Join.css';

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: '',
    preferred_date: null,
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

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      preferred_date: date
    });
    setError('');
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    if (!time) return '';
    return time;
  };

  const formatWhatsAppMessage = (data) => {
    const formattedDate = formatDate(data.preferred_date);
    
    return `Dear Muscle Universe Gym Team,

My name is ${data.name}, and I am interested in booking a one-day free trial session at your gym. My fitness goal is ${data.goal}, and would appreciate the opportunity to explore your facilities, equipment, and training environment.

I would like to know if it would be possible to schedule the trial session on ${formattedDate} at ${data.preferred_time}. Please let me know if this time is convenient or if there are alternative slots available.

For your reference, my details are as follows:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

I look forward to your response and hope to visit your gym soon.

Kind regards,
${data.name}`;
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
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
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
        preferred_date: null,
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
            <h2>Trial Request Sent Successfully!</h2>
            <p>Thank you for choosing Muscle Universe Gym!</p>
            <p>WhatsApp will open with your booking details.</p>
            <p className="success-note">Our team will review your request and respond within 24 hours.</p>
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
                  <option value="">Select Your Fitness Goal</option>
                  <option value="Weight Loss">🏋️ Weight Loss</option>
                  <option value="Muscle Gain">💪 Muscle Gain</option>
                  <option value="General Fitness">🎯 General Fitness</option>
                  <option value="Strength Training">⚡ Strength Training</option>
                  <option value="Flexibility & Mobility">🧘 Flexibility & Mobility</option>
                </select>
              </div>
              <div className="form-group date-picker-group">
                <label className="date-picker-label">📅 Select Preferred Date</label>
                <DatePicker
                  selected={formData.preferred_date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Click to select a date"
                  className="date-picker-input"
                  required
                />
              </div>
              <div className="form-group">
                <select name="preferred_time" value={formData.preferred_time} onChange={handleChange} required>
                  <option value="">Select Preferred Time</option>
                  <option value="6:00 AM">🌅 6:00 AM</option>
                  <option value="7:00 AM">☀️ 7:00 AM</option>
                  <option value="8:00 AM">☀️ 8:00 AM</option>
                  <option value="9:00 AM">☀️ 9:00 AM</option>
                  <option value="10:00 AM">🌤️ 10:00 AM</option>
                  <option value="11:00 AM">🌤️ 11:00 AM</option>
                  <option value="12:00 PM">☀️ 12:00 PM</option>
                  <option value="1:00 PM">🌤️ 1:00 PM</option>
                  <option value="2:00 PM">🌤️ 2:00 PM</option>
                  <option value="3:00 PM">🌤️ 3:00 PM</option>
                  <option value="4:00 PM">🌤️ 4:00 PM</option>
                  <option value="5:00 PM">🌙 5:00 PM</option>
                  <option value="6:00 PM">🌙 6:00 PM</option>
                  <option value="7:00 PM">🌙 7:00 PM</option>
                  <option value="8:00 PM">🌃 8:00 PM</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Sending Request...' : 'Book Free Trial →'}
              </button>
            </form>
            <p className="terms">*No commitment required. Cancel anytime.</p>
            <p className="whatsapp-note">📱 Your booking request will be sent to our WhatsApp. We'll respond within 24 hours.</p>
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
