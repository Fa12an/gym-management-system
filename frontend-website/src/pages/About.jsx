import './About.css';

function About() {
  const reviews = [
    {
      name: "RITIK MENARIA",
      rating: 5,
      text: "This gym offers a great environment for both beginners and experienced fitness enthusiasts. The equipment is well-maintained, and the trainers are knowledgeable and supportive. The space is clean, and hygiene is clearly a priority. Overall, it's a motivating place to work out and stay consistent"
    },
    {
      name: "Mohit Kumar",
      rating: 5,
      text: "Amazing place to train with top-quality equipment. The trainers are super helpful and always motivate you to push harder. Special mention to Nithish anna — really supportive and encouraging"
    },
    {
      name: "shruti shukla",
      rating: 5,
      text: "Great gym with excellent trainers! They're supportive, knowledgeable, and really help you stay consistent. The environment is motivating and friendly highly recommend!"
    },
    {
      name: "Kyathi Nandini",
      rating: 5,
      text: "I recently joined this gym and honestly it's been amazing so far. The trainers guide you really well, the equipment is great, and the atmosphere keeps you motivated. Totally worth it"
    },
    {
      name: "Bhargav Lokesh",
      rating: 5,
      text: "Great gym with well-maintained equipment. The trainers are knowledgeable, supportive, and always push you to do your best"
    },
    {
      name: "Nishad N",
      rating: 5,
      text: "Supportive trainers, super clean gym, energetic zumba instructors and friendly crowd. Glad I joined this gym 😊"
    }
  ];

  return (
    <div className="about-premium">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-badge">EST. 2025</div>
        <h1 className="about-hero-title">
          About <span className="gold-text">Muscle Universe</span>
        </h1>
        <p className="about-hero-subtitle">Your journey to a healthier, stronger life starts here</p>
        <div className="about-hero-line"></div>
      </div>

      <div className="about-container">
        {/* Story Section */}
        <div className="about-story">
          <div className="about-card">
            <div className="about-card-icon">📖</div>
            <h2>Our Story</h2>
            <p>Founded in 2025, Muscle Universe Gym has been dedicated to helping individuals achieve their fitness goals in a supportive and motivating environment. What started as a small local gym has now grown into a premier fitness destination with state-of-the-art equipment and expert trainers.</p>
            <p>Our mission is to provide a welcoming space where people of all fitness levels can work towards their goals, whether it's weight loss, muscle gain, or overall wellness. We believe that fitness is not just about looking good – it's about feeling strong, confident, and healthy.</p>
          </div>
        </div>

        {/* Mission Vision Values */}
        <div className="mission-vision">
          <div className="mv-card">
            <div className="mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To empower individuals to lead healthier lives through fitness, education, and community support.</p>
          </div>
          <div className="mv-card">
            <div className="mv-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>To become the most trusted fitness brand that transforms lives and creates a healthier community.</p>
          </div>
          <div className="mv-card">
            <div className="mv-icon">💎</div>
            <h3>Our Values</h3>
            <p>Integrity, Excellence, Community, Innovation, and Results guide everything we do.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Happy Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Expert Trainers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">20+</div>
            <div className="stat-label">Classes Weekly</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8+</div>
            <div className="stat-label">Years Excellence</div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our <span className="gold-text">Members Say</span></h2>
            <p className="section-subtitle">Don't just take our word for it - hear from our amazing community</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-quote">"</div>
                <p className="review-text">{review.text}</p>
                <div className="review-footer">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4>{review.name}</h4>
                      <div className="review-stars">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="review-verified">✓ Verified</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section with Map Image */}
        <div className="location-section">
          <h2 className="location-title">Find <span className="gold-text">Us Here</span></h2>
          <div className="location-card">
            <div className="location-details">
              <div className="location-info-item">
                <span className="location-icon">📍</span>
                <div>
                  <h3>Address</h3>
                  <p>No 50, JKN ARCADE, 3rd & 4th Floor,<br />
                  1st Cross, 27th Main, BTM 1st Stage,<br />
                  Bengaluru, Karnataka 560068</p>
                </div>
              </div>
              
              <div className="location-info-item">
                <span className="location-icon">📞</span>
                <div>
                  <h3>Phone</h3>
                  <p>95356 68280</p>
                </div>
              </div>
              
              <div className="location-info-item">
                <span className="location-icon">✉️</span>
                <div>
                  <h3>Email</h3>
                  <p>info@muscleuniverse.com</p>
                </div>
              </div>
              
              <div className="location-info-item">
                <span className="location-icon">🕐</span>
                <div>
                  <h3>Opening Hours</h3>
                  <p>Monday - Friday: 5:30 AM - 10:30 PM</p>
                  <p>Saturday - Sunday: 6:00 AM - 9:00 PM</p>
                </div>
              </div>
              
              <div className="location-info-item">
                <span className="location-icon">💳</span>
                <div>
                  <h3>Payment Methods</h3>
                  <p>Cash • Google Pay • Credit/Debit Cards</p>
                </div>
              </div>
            </div>
            <div className="location-map-wrapper">
              <a 
                href="https://maps.google.com/?q=12.916563,77.603375" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=BTM+Layout,Bengaluru&zoom=14&size=600x400&markers=color:red%7C12.916563,77.603375&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
                  alt="Muscle Universe Gym Location"
                  className="map-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/1a1a2e/f5a623?text=Muscle+Universe+Gym";
                  }}
                />
                <div className="map-overlay">
                  <span className="map-pin-icon">📍</span>
                  <span className="map-text">Open in Google Maps →</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
