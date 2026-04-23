import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    gsap.utils.toArray('.about-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
    <div className="about-page">
      <div className="page-header">
        <h1>About Muscle Universe</h1>
        <p>Your journey to a healthier life starts here</p>
      </div>

      <div className="container">
        <div className="about-story">
          <div className="about-card">
            <h2>Our Story</h2>
            <p>Founded in 2016, Muscle Universe Gym has been dedicated to helping individuals achieve their fitness goals in a supportive and motivating environment. What started as a small local gym has now grown into a premier fitness destination with state-of-the-art equipment and expert trainers.</p>
            <p>Our mission is to provide a welcoming space where people of all fitness levels can work towards their goals, whether it's weight loss, muscle gain, or overall wellness.</p>
          </div>
        </div>

        <div className="mission-vision">
          <div className="about-card">
            <h2>🎯 Our Mission</h2>
            <p>To empower individuals to lead healthier lives through fitness, education, and community support. We strive to make quality fitness accessible to everyone.</p>
          </div>
          <div className="about-card">
            <h2>👁️ Our Vision</h2>
            <p>To become the most trusted fitness brand that transforms lives and creates a healthier, happier community one person at a time.</p>
          </div>
          <div className="about-card">
            <h2>💎 Our Values</h2>
            <p>Integrity, Excellence, Community, Innovation, and Results. These values guide everything we do at Muscle Universe Gym.</p>
          </div>
        </div>

        <div className="location-info">
          <h2>📍 Our Location</h2>
          <div className="location-card">
            <div className="location-details">
              <p><strong>Address:</strong></p>
              <p>No 50, JKN ARCADE, 3rd & 4th Floor,<br />
              1st Cross, 27th Main, BTM 1st Stage,<br />
              Bengaluru, Karnataka 560068</p>
              
              <p><strong>Contact:</strong> 95356 68280</p>
              
              <p><strong>Opening Hours:</strong></p>
              <p>Mon-Fri: 5:30 AM - 10:30 PM<br />
              Sat-Sun: 6:00 AM - 9:00 PM</p>
              
              <p><strong>Features:</strong></p>
              <ul>
                <li>✅ Outdoor services available</li>
                <li>✅ Wheelchair accessible</li>
                <li>✅ LGBTQ+ friendly</li>
                <li>✅ Free parking lot</li>
                <li>✅ Cash & Google Pay accepted</li>
              </ul>
            </div>
            <div className="location-map">
              <iframe
                title="Muscle Universe Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.6075!3d12.9165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15c8a5c0e0f1%3A0x8f8f8f8f8f8f8f8!2sBTM%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
