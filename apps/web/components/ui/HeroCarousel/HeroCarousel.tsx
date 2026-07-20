'use client';

import { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

const CAROUSEL_IMAGES = [
  { src: '/hero-banner.png', alt: 'NSTU Model School Campus' },
  { src: '/gallery_classroom.png', alt: 'Modern Classroom Facility' },
  { src: '/gallery_lab.png', alt: 'Advanced Computer & Science Lab' },
  { src: '/gallery_sports.png', alt: 'Annual Sports Festival' },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  return (
    <div className={styles.carouselFrame} aria-label="Campus image slideshow">
      <div className={styles.slidesWrapper}>
        {CAROUSEL_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`}
            aria-hidden={index !== activeIndex}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className={styles.carouselImage}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Manual Navigation Arrows */}
      <button
        onClick={handlePrev}
        className={`${styles.navBtn} ${styles.prevBtn}`}
        aria-label="Previous slide"
      >
        <svg className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className={`${styles.navBtn} ${styles.nextBtn}`}
        aria-label="Next slide"
      >
        <svg className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className={styles.indicators}>
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
