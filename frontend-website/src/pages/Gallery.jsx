import { useState } from 'react';
import './Gallery.css';

// Import all 9 gallery images
import gallery1 from '../assets/images/gallery_1.jpeg';
import gallery2 from '../assets/images/gallery_2.jpeg';
import gallery3 from '../assets/images/gallery_3.jpeg';
import gallery4 from '../assets/images/gallery_4.jpeg';
import gallery5 from '../assets/images/gallery_5.jpeg';
import gallery6 from '../assets/images/gallery_6.jpeg';
import gallery7 from '../assets/images/gallery_7.jpeg';
import gallery8 from '../assets/images/gallery_8.jpeg';
import gallery9 from '../assets/images/gallery_9.jpeg';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, url: gallery1, title: 'Main Gym Floor', category: 'Equipment' },
    { id: 2, url: gallery2, title: 'Free Weights Area', category: 'Equipment' },
    { id: 3, url: gallery3, title: 'Cardio Zone', category: 'Equipment' },
    { id: 4, url: gallery4, title: 'Strength Training Zone', category: 'Equipment' },
    { id: 5, url: gallery5, title: 'Functional Training Area', category: 'Training' },
    { id: 6, url: gallery6, title: 'Group Classes', category: 'Training' },
    { id: 7, url: gallery7, title: 'Premium Locker Room', category: 'Facility' },
    { id: 8, url: gallery8, title: 'Yoga & Meditation Studio', category: 'Training' },
    { id: 9, url: gallery9, title: 'Premium Facility Overview', category: 'Facility' },
  ];

  const categories = ['All', 'Equipment', 'Training', 'Facility'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Our Gym Gallery</h1>
        <p>Take a virtual tour of our state-of-the-art facility</p>
      </div>

      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map(image => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={image.title} />
            <div className="gallery-overlay">
              <h3>{image.title}</h3>
              <p>{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage.url} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}

      <div className="gallery-cta">
        <h2>Experience It Yourself!</h2>
        <p>Book a free trial and visit our gym in person</p>
        <a href="/join" className="cta-button">Book Free Trial →</a>
      </div>
    </div>
  );
}

export default Gallery;
