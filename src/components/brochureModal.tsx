import React, { useEffect, useState, useRef } from 'react';
import './brochureModal.css';
import { useTranslation } from '../TranslationContext';

const GOOGLE_FORM_URL = 'https://forms.gle/WrRokQZQPwQdgqSy9';

const BrochureModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="brochure-modal-backdrop"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Invitation Modal"
    >
      <div className="brochure-modal" ref={modalRef} style={{alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem'}}>
        <button
          className="brochure-modal-close"
          aria-label="Close modal"
          onClick={() => setOpen(false)}
          type="button"
        >
          &times;
        </button>
        <div className="brochure-modal-title" style={{fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem'}}>
          {t('modal-invite-title')}
        </div>
        <div className="brochure-modal-subtitle" style={{fontSize: '1.15rem', color: 'var(--text-black)', marginBottom: '1.2rem', fontWeight: 500}}>
          {t('modal-invite-subtitle')}
        </div>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="brochure-modal-submit"
          style={{
            display: 'inline-block',
            fontSize: '1.2rem',
            fontWeight: 700,
            padding: '1.1rem 2.5rem',
            borderRadius: '14px',
            background: 'linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 100%)',
            color: 'var(--text-white)',
            boxShadow: '0 4px 24px rgba(30, 64, 175, 0.13)',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            textDecoration: 'none',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        >
          {t('modal-invite-btn')}
        </a>
        <div style={{fontSize: '0.98rem', color: 'var(--text-black)', marginTop: '0.7rem'}}>
          <span role="img" aria-label="sparkles">✨</span> {t('modal-invite-note')}
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
