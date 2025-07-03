import React from 'react';
import Carousel from './Carousel';
import { useTranslation } from '../TranslationContext';
import '../styles/Carousel.css'

const WhatWillLearnSection: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { id: 1, title: '01', description: t('learn1'), emoji: '🎯' },
    { id: 2, title: '02', description: t('learn2'), emoji: '🧠' },
    { id: 3, title: '03', description: t('learn3'), emoji: '✨' },
    { id: 4, title: '04', description: t('learn4'), emoji: '🧘' },
    { id: 5, title: '05', description: t('learn5'), emoji: '🔍' },
    { id: 6, title: '06', description: t('learn6'), emoji: '🏆' },
    { id: 7, title: '07', description: t('learn7'), emoji: '💰' },
    { id: 8, title: '08', description: t('learn8'), emoji: '📊' },
    { id: 9, title: '09', description: t('learn9'), emoji: '💼' },
  ];

  return (
    <section className="what-will-learn-section" data-animate="fade-in-up">
      <div className="what-will-learn-container">
        <div data-animate="center" className="what-will-learn-header">
          <p className="section-subheader">{t('learn-subtitle')}</p>
          <h2>{t('learn-title')}</h2>
        </div>
        <Carousel items={items} baseWidth={800} autoplay autoplayDelay={3000} pauseOnHover loop />
      </div>
    </section>
  );
};

export default WhatWillLearnSection;