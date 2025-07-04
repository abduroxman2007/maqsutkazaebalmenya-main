import React from 'react';

interface SuccessOverlayProps {
  message: string;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
};

const contentStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.35)',
  borderRadius: '32px',
  padding: '3.5rem 3.5rem 2.5rem 3.5rem',
  boxShadow: '0 8px 32px rgba(80, 80, 120, 0.18)',
  textAlign: 'center',
  minWidth: '340px',
  maxWidth: '95vw',
  border: '1.5px solid rgba(255,255,255,0.35)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
};

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ message }) => (
  <div style={overlayStyle}>
    <div style={contentStyle}>
      <div className="contact-success-checkmark" style={{margin: '0 auto 2.2rem auto'}}>
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{width: '110px', height: '110px', display: 'block', margin: '0 auto'}}>
          <circle className="check-circle" cx="26" cy="26" r="23" fill="none"/>
          <path className="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <div style={{fontWeight: 800, color: '#16a34a', fontSize: '2.1rem', marginTop: '0.5rem', letterSpacing: '-0.01em'}}>
        {message}
      </div>
    </div>
  </div>
);

export default SuccessOverlay; 