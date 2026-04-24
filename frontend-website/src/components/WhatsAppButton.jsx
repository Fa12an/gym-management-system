function WhatsAppButton() {
  const phoneNumber = "919535668280";
  const message = "Hi! I'm interested in joining Muscle Universe Gym. Can you help me?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={whatsappUrl}
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        animation: 'float 2s infinite'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      }}
    >
      💬
    </a>
  );
}

export default WhatsAppButton;
