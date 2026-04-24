import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionsRef = useRef([]);
  const cardsRef = useRef([]);

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
    }
  ];

  useEffect(() => {
    // Animate hero section
    gsap.fromTo('.about-hero-content h1', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    gsap.fromTo('.about-hero-content p', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    // Animate cards on scroll
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate review cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.9, x: index % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <div className="about-premium">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>About <span className="gradient-text">Muscle Universe</span></h1>
          <p>Your journey to a healthier, stronger life starts here</p>
        </div>
      </section>

      <div className="container">
        {/* Story Section */}
        <section className="about-story-premium" ref={el => sectionsRef.current[0] = el}>
          <div className="about-card-premium">
            <h2>📖 Our Story</h2>
            <p>Founded in 2016, Muscle Universe Gym has been dedicated to helping individuals achieve their fitness goals in a supportive and motivating environment. What started as a small local gym has now grown into a premier fitness destination with state-of-the-art equipment and expert trainers.</p>
            <p>Our mission is to provide a welcoming space where people of all fitness levels can work towards their goals, whether it's weight loss, muscle gain, or overall wellness. We believe that fitness is not just about looking good – it's about feeling strong, confident, and healthy.</p>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="mission-vision-premium" ref={el => sectionsRef.current[1] = el}>
          <div className="mv-card-premium">
            <div className="mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To empower individuals to lead healthier lives through fitness, education, and community support. We strive to make quality fitness accessible to everyone.</p>
          </div>
          <div className="mv-card-premium">
            <div className="mv-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>To become the most trusted fitness brand that transforms lives and creates a healthier, happier community one person at a time.</p>
          </div>
          <div className="mv-card-premium">
            <div className="mv-icon">💎</div>
            <h3>Our Values</h3>
            <p>Integrity, Excellence, Community, Innovation, and Results. These values guide everything we do at Muscle Universe Gym.</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats-premium" ref={el => sectionsRef.current[2] = el}>
          <div className="about-stat-card">
            <div className="about-stat-number">5000+</div>
            <div className="about-stat-label">Happy Members</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-number">50+</div>
            <div className="about-stat-label">Expert Trainers</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-number">20+</div>
            <div className="about-stat-label">Classes Weekly</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-number">8+</div>
            <div className="about-stat-label">Years Excellence</div>
          </div>
        </section>

        {/* Reviews Section with GSAP */}
        <section className="reviews-section">
          <div className="section-header">
            <span className="section-tag">Member Testimonials</span>
            <h2>What Our <span className="gradient-text">Members Say</span></h2>
            <p>Don't just take our word for it - hear from our amazing community</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card-premium" ref={el => cardsRef.current[index] = el}>
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4>{review.name}</h4>
                      <div className="review-rating">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-verified">✓ Verified Member</div>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section with Exact Muscle Universe Map */}
        <section className="location-premium" ref={el => sectionsRef.current[3] = el}>
          <h2>Find Us <span className="gradient-text">Here</span></h2>
          <div className="location-card-premium">
            <div className="location-details-premium">
              <h3>📍 Muscle Universe Gym</h3>
              <p>No 50, JKN ARCADE, 3rd & 4th Floor,<br />
              1st Cross, 27th Main, BTM 1st Stage,<br />
              Bengaluru, Karnataka 560068</p>
              
              <h3>📞 Contact</h3>
              <p>Phone: 95356 68280</p>
              <p>Email: info@muscleuniverse.com</p>
              
              <h3>🕐 Opening Hours</h3>
              <p>Monday - Friday: 5:30 AM - 10:30 PM</p>
              <p>Saturday: 6:00 AM - 9:00 PM</p>
              <p>Sunday: 6:00 AM - 9:00 PM</p>
              
              <h3>💳 Payment Methods</h3>
              <p>Cash • Google Pay • Credit/Debit Cards</p>
              
              <h3>🅿️ Parking</h3>
              <p>Free parking lot available • On-site parking</p>
            </div>
            <div className="location-map-premium">
              <iframe
                title="Muscle Universe Gym Exact Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.825169957718!2d77.603375!3d12.916563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15c8a5c0e0f1%3A0x8f8f8f8f8f8f8f8!2sBTM%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
