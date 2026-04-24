import { useState, useEffect } from 'react';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '100px',
        backgroundColor: '#FFD700',
        color: '#000',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 8px 25px rgba(255,215,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
      }}
    >
      ↑
    </button>
  );
}

export default BackToTop;
