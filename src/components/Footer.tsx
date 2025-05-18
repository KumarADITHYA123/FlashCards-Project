import React from "react";

const FloatingFooter = () => {
  return (
    <footer style={{
      position: 'fixed',
      right: '1.5rem',
      bottom: '1.5rem',
      zIndex: 50,
      background: 'rgba(24, 24, 27, 0.85)',
      borderRadius: '0.75rem',
      border: '1px solid #333',
      padding: '0.5rem 1.25rem',
      color: '#a1a1aa',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    }}>
      <span>© Made with</span>
      <span style={{fontSize: '1.2em'}}>❤️</span>
      <span>by <span style={{color: '#fff', fontWeight: 600}}>Adithya</span></span>
    </footer>
  );
};

export default FloatingFooter;
