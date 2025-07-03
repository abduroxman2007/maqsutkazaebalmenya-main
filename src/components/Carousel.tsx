import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/Carousel.css';

interface CarouselItem {
  title: string;
  description: string;
  id: number;
  emoji?: string;
}

interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, title: "01", description: "How to choose the right university for your future", emoji: "🎯" },
  { id: 2, title: "02", description: "How to prepare independently for IELTS and SAT", emoji: "🧠" },
  { id: 3, title: "03", description: "How to calculate GPA - School grades correctly", emoji: "✨" },
  { id: 4, title: "04", description: "How to start building your portfolio", emoji: "🧘" },
  { id: 5, title: "05", description: "How to work with top data platforms", emoji: "🔍" },
  { id: 6, title: "06", description: "How to write essays and recommendations for admissions.", emoji: "🏆" },
  { id: 7, title: "07", description: "How to successfully pass interviews", emoji: "💰" },
  { id: 8, title: "08", description: "How to properly apply to American universities", emoji: "📊" },
  { id: 9, title: "09", description: "How to create a proper CSS profile", emoji: "💼" },
  { id: 10, title: "10", description: "How to successfully pass interviews", emoji: "🎯" },
  { id: 11, title: "11", description: "How to properly apply to American universities", emoji: "🧠" },
  { id: 12, title: "12", description: "How to create a proper CSS profile", emoji: "✨" },
];

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps) {

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  // Responsive number of cards to show at once
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 700) return 1;
      if (window.innerWidth < 1100) return 2;
    }
    return 3;
  };
  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
  useEffect(() => {
    const handleResize = () => setCardsToShow(getCardsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the visible window of cards (no duplicates, no mid-window wrap)
  const getVisibleCards = () => {
    let start = currentIndex;
    // If near the end, clamp to last full window
    if (start > carouselItems.length - cardsToShow) {
      start = carouselItems.length - cardsToShow;
    }
    if (start < 0) start = 0;
    return carouselItems.slice(start, start + cardsToShow);
  };

  // Adjust arrow logic to clamp to valid windows
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return carouselItems.length - cardsToShow;
      return prev - 1;
    });
  };
  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= carouselItems.length - cardsToShow) return 0;
      return prev + 1;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: '100%',
        maxWidth: typeof window !== 'undefined' && window.innerWidth < 700 ? '340px'
          : typeof window !== 'undefined' && window.innerWidth < 1100 ? '480px'
          : '800px',
        margin: typeof window !== 'undefined' && window.innerWidth < 700 ? '12px auto 0'
          : typeof window !== 'undefined' && window.innerWidth < 1100 ? '18px auto 0'
          : '32px auto 0',
        borderRadius: typeof window !== 'undefined' && window.innerWidth < 700 ? '10px'
          : typeof window !== 'undefined' && window.innerWidth < 1100 ? '14px'
          : '40px',
        boxShadow: typeof window !== 'undefined' && window.innerWidth < 700 ? '0 2px 8px var(--shadow)'
          : typeof window !== 'undefined' && window.innerWidth < 1100 ? '0 3px 12px var(--shadow)'
          : '0 6px 32px var(--shadow)',
        padding: '0',
        display: 'block',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Left arrow - vertically centered */}
      <button
        aria-label="Previous"
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: typeof window !== 'undefined' && window.innerWidth < 700 ? '-28px'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '-36px'
            : '-48px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--bg-color)',
          border: 'none',
          borderRadius: '50%',
          width: typeof window !== 'undefined' && window.innerWidth < 700 ? '44px'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '54px'
            : '64px',
          height: typeof window !== 'undefined' && window.innerWidth < 700 ? '44px'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '54px'
            : '64px',
          fontSize: typeof window !== 'undefined' && window.innerWidth < 700 ? '1.5rem'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '1.8rem'
            : '2.2rem',
          color: 'var(--secondary-color)',
          cursor: 'pointer',
          boxShadow: typeof window !== 'undefined' && window.innerWidth < 700 ? '0 2px 8px var(--shadow)'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '0 3px 12px var(--shadow)'
            : '0 4px 24px var(--shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.2s, background 0.2s',
          zIndex: 3,
        }}
        onMouseOver={e => e.currentTarget.style.boxShadow = typeof window !== 'undefined' && window.innerWidth < 700 ? '0 2px 8px var(--shadow-lg)' : '0 8px 32px var(--shadow-lg)'}
        onMouseOut={e => e.currentTarget.style.boxShadow = typeof window !== 'undefined' && window.innerWidth < 700 ? '0 1px 4px var(--shadow)' : '0 4px 24px var(--shadow)'}
      >
        &#8592;
      </button>
      {/* Right arrow - vertically centered */}
      <button
        aria-label="Next"
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: typeof window !== 'undefined' && window.innerWidth < 700 ? '-28px'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '-36px'
            : '-48px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--bg-color)',
          border: 'none',
          borderRadius: '50%',
          width: typeof window !== 'undefined' && window.innerWidth < 700 ? '44px'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '54px'
            : '64px',
          height: typeof window !== 'undefined' && window.innerWidth < 700 ? '44px'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '54px'
            : '64px',
          fontSize: typeof window !== 'undefined' && window.innerWidth < 700 ? '1.5rem'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '1.8rem'
            : '2.2rem',
          color: 'var(--secondary-color)',
          cursor: 'pointer',
          boxShadow: typeof window !== 'undefined' && window.innerWidth < 700 ? '0 2px 8px var(--shadow)'
            : typeof window !== 'undefined' && window.innerWidth < 1100 ? '0 3px 12px var(--shadow)'
            : '0 4px 24px var(--shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.2s, background 0.2s',
          zIndex: 3,
        }}
        onMouseOver={e => e.currentTarget.style.boxShadow = typeof window !== 'undefined' && window.innerWidth < 700 ? '0 2px 8px var(--shadow-lg)' : '0 8px 32px var(--shadow-lg)'}
        onMouseOut={e => e.currentTarget.style.boxShadow = typeof window !== 'undefined' && window.innerWidth < 700 ? '0 1px 4px var(--shadow)' : '0 4px 24px var(--shadow)'}
      >
        &#8594;
      </button>
      {/* Animated cards row */}
      <div style={{ minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ display: 'flex', gap: '32px', width: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            {getVisibleCards().map((item) => (
              <div
                key={item.id}
                className="carousel-item"
                style={{
                  width: '340px',
                  minHeight: '300px',
                  height: 'auto',
                  boxShadow: '0 4px 24px var(--shadow)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '32px',
                  padding: '2.5rem 1.5rem 2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  overflow: 'auto',
                  wordBreak: 'break-word',
                  textAlign: 'left',
                  background: 'var(--bg-primary)',
                }}
              >
                {/* Emoji on separate line */}
                {item.emoji && (
                  <div 
                    className="carousel-item-emoji" 
                    style={{ 
                      fontSize: '3rem', 
                      marginBottom: '1rem',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    {item.emoji}
                  </div>
                )}
                
                {/* Number and text aligned to left */}
                <div className="carousel-item-content" style={{ width: '100%' }}>
                  <div 
                    className="carousel-item-header" 
                    style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 700, 
                      marginBottom: '0.5rem',
                      color: 'var(--primary-gradient-start)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ color: 'var(--primary-gradient-middle)' }}>{item.title}</span>
                  </div>
                  <div 
                    className="carousel-item-title" 
                    style={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem', 
                      marginBottom: 0, 
                      lineHeight: 1.5,
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Indicators */}
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <div
              key={index}
              className={`carousel-indicator ${currentIndex % items.length === index ? "active" : "inactive"}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
