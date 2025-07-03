import React from 'react';
import { useTranslation } from '../TranslationContext';
import AboutFeatureIcon from './AboutFeatureIcon';
import { animateOnScroll } from '../animations';
import '../styles/about.css'
import { submitToGoogleForms } from '../lib/googleForms';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => { animateOnScroll(); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      await submitToGoogleForms({ fullName: name, phone });
      alert(t('contact-success') || 'Thank you for your interest! We will contact you soon.');
      setName('');
      setPhone('');
    } else {
      alert(t('contact-error') || 'Please fill in all fields.');
    }
  };

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header" data-animate="center">
          <h2>{t('about-title')}</h2>
          <p>{t('about-subtitle')}</p>
        </div>
        <div className="about-content">
          <div className="about-text" data-animate="left">
            {/* <p>{t('about-description')}</p>
            <h3>{t('who-for-title')}</h3> */}
            <div className="about-features">
              <div className="about-feature about-feature-card" data-animate="left">
                <AboutFeatureIcon type='check' />
                <span><b>{t('for-item1')}</b></span>
              </div>
              <div className="about-feature about-feature-card" data-animate="left">
                <AboutFeatureIcon type='circles' />
                <span><b>{t('for-item2')}</b></span>
              </div>
              <div className="about-feature about-feature-card" data-animate="left">
                <AboutFeatureIcon type='globe' />
                <span><b>{t('for-item3')}</b></span>
              </div>
              <div className="about-feature about-feature-card" data-animate="left">
                <AboutFeatureIcon type='book' />
                <span><b>{t('for-item4')}</b></span>
              </div>
            </div>
          </div>
          <div className="about-form" data-animate="right">
            <h3>{t('get-started')}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder={t('name-placeholder')} required value={name} onChange={e => setName(e.target.value)} />
              <input type="tel" placeholder={t('phone-placeholder')} required value={phone} onChange={e => setPhone(e.target.value)} />
              <button type="submit">{t('start-journey')}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 