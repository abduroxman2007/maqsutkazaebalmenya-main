import React from 'react';
import { useTranslation } from '../TranslationContext';
import '../styles/footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className="footer-modern">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/assets/img/dark-logo.png" alt="Maqsadly Logo" className="footer-logo" />
          </div>
          <nav className="footer-nav">
            <a href="#home">{t('footer-courses')}</a>
            <a href="#about">{t('footer-about')}</a>
            <a href="#courses">{t('footer-sat-english')}</a>
            <a href="#courses">{t('footer-sat-math')}</a>
            <a href="#courses">{t('footer-full-sat')}</a>
            <a href="#courses">{t('footer-admission')}</a>
            <a href="#teachers">{t('footer-teachers-link')}</a>
          </nav>
        </div>
      </footer>
      <div style={{ width: '100%', margin: '0 auto', marginTop: '0', marginBottom: '0', background: 'var(--primary-gradient-end)' }}>
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 0', borderTop: '1.5px solid #e0e7ef' }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{t('footer-copyright-left')}</span>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{t('footer-copyright-right')}</span>
        </div>
      </div>
    </>
  );
};

export default Footer; 