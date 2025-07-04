import React, { useState } from 'react';
import { useTranslation } from '../TranslationContext';
import '../styles/contact.css'
import { submitToGoogleForms } from '../lib/googleForms';
import SuccessOverlay from './SuccessOverlay';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      await submitToGoogleForms({ fullName: name, phone });
      setShowSuccess(true);
      setName('');
      setPhone('');
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      alert(t('contact-error') || 'Please fill in all fields.');
    }
  };

  return (
    <section id="contact" className="contact" data-animate="fade-in-up">
      <div className="contact-container">
        <div className="contact-left" data-animate="left">
          <h2>{t('contact-title')}</h2>
          <div className="contact-info">
            <div className="contact-item">
              <strong>{t('email')}</strong>
              <span><a
                   href="https://t.me/maqsadly_edu_admin"
                   style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   @maqsadly_edu_admin
                 </a></span>
            </div>
            <div className="contact-item">
              <strong>{t('phone')}</strong>
              <span>+998 (94) 658-35-38 </span>
              <span>+998 (91) 925-68-07 </span>
            </div>
          </div>
        </div>
        <div className="contact-right" data-animate="right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t('name-placeholder')}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder={t('phone-placeholder')}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <button type="submit">{t('send-message')}</button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <SuccessOverlay message={t('contact-success') || 'Thank you for your interest! We will contact you soon.'} />
      )}
    </section>
  );
};

export default ContactSection; 