import { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${API_URL}/book-trial`, formData);
      setSubmitted(true);
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
      <div className="join-page">
        <div className="success-section">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Trial Booked Successfully!</h2>
            <p>Thank you for choosing Muscle Universe Gym!</p>
            <p>We'll contact you within 24 hours to confirm your trial.</p>
            <button onClick={() => setSubmitted(false)} className="btn">Book Another Trial</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="join-page">
      <div className="page-header">
        <h1>Join Muscle Universe</h1>
        <p>Start your fitness journey today with a free trial</p>
      </div>

      <div className="container">
        <div className="join-container">
          <div className="join-info">
            <h2>What's Included in Your Free Trial?</h2>
            <ul>
              <li>✓ 3 Days Full Gym Access</li>
              <li>✓ One Personal Training Session</li>
              <li>✓ Body Composition Analysis</li>
              <li>✓ Diet Consultation</li>
              <li>✓ Free Gym Tour</li>
            </ul>
            
            <h2>Why Join Us?</h2>
            <ul>
              <li>✓ State-of-the-art Equipment</li>
              <li>✓ Expert Trainers</li>
              <li>✓ Clean & Hygienic Environment</li>
              <li>✓ Flexible Hours (5:30 AM - 10:30 PM)</li>
              <li>✓ Supportive Community</li>
            </ul>
          </div>

          <div className="join-form">
            <h2>Book Your Free Trial</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <select name="goal" value={formData.goal} onChange={handleChange} required>
                <option value="">Select Your Goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="fitness">General Fitness</option>
                <option value="strength">Strength Training</option>
                <option value="flexibility">Flexibility & Mobility</option>
              </select>
              <input
                type="date"
                name="preferred_date"
                value={formData.preferred_date}
                onChange={handleChange}
                required
              />
              <select name="preferred_time" value={formData.preferred_time} onChange={handleChange} required>
                <option value="">Preferred Time</option>
                <option value="6am-8am">6:00 AM - 8:00 AM</option>
                <option value="8am-10am">8:00 AM - 10:00 AM</option>
                <option value="4pm-6pm">4:00 PM - 6:00 PM</option>
                <option value="6pm-8pm">6:00 PM - 8:00 PM</option>
                <option value="8pm-10pm">8:00 PM - 10:00 PM</option>
              </select>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Booking...' : 'Book Free Trial'}
              </button>
            </form>
            <p className="terms">*No commitment required. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
