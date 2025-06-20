"use client";

import { useEffect } from 'react';

export default function ParallaxWrapper({ children }) {
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      const rate2 = scrolled * -0.3;
      const rate3 = scrolled * -0.8;
      const rate4 = scrolled * -0.2;
      const rate5 = scrolled * -0.6;

      // Background parallax layers
      const bgSlow = document.querySelectorAll('.parallax-bg-slow');
      const bgMedium = document.querySelectorAll('.parallax-bg-medium');
      const bgFast = document.querySelectorAll('.parallax-bg-fast');

      bgSlow.forEach(el => {
        el.style.transform = `translate3d(0, ${rate4}px, 0)`;
      });
      
      bgMedium.forEach(el => {
        el.style.transform = `translate3d(0, ${rate2}px, 0)`;
      });
      
      bgFast.forEach(el => {
        el.style.transform = `translate3d(0, ${rate}px, 0)`;
      });

      // Particle parallax
      const particles = [
        { selector: '.parallax-particle-1', rate: scrolled * -0.3 },
        { selector: '.parallax-particle-2', rate: scrolled * -0.5 },
        { selector: '.parallax-particle-3', rate: scrolled * -0.7 },
        { selector: '.parallax-particle-4', rate: scrolled * -0.4 },
        { selector: '.parallax-particle-5', rate: scrolled * -0.6 },
      ];

      particles.forEach(({ selector, rate }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
      });

      // Text parallax effects (Apple-style)
      const heroText = document.querySelector('.parallax-text-hero');
      const subtitle = document.querySelector('.parallax-text-subtitle');
      const cta = document.querySelector('.parallax-text-cta');

      if (heroText) {
        const heroRate = Math.max(0, scrolled * -0.2);
        const heroOpacity = Math.max(0, 1 - scrolled / 500);
        const heroScale = Math.max(0.8, 1 - scrolled / 2000);
        
        heroText.style.transform = `translate3d(0, ${heroRate}px, 0) scale(${heroScale})`;
        heroText.style.opacity = heroOpacity;
      }

      if (subtitle) {
        const subtitleRate = Math.max(0, scrolled * -0.15);
        const subtitleOpacity = Math.max(0, 1 - scrolled / 400);
        
        subtitle.style.transform = `translate3d(0, ${subtitleRate}px, 0)`;
        subtitle.style.opacity = subtitleOpacity;
      }

      if (cta) {
        const ctaRate = Math.max(0, scrolled * -0.1);
        const ctaOpacity = Math.max(0, 1 - scrolled / 300);
        
        cta.style.transform = `translate3d(0, ${ctaRate}px, 0)`;
        cta.style.opacity = ctaOpacity;
      }

      // Header parallax
      const header = document.querySelector('.parallax-header');
      if (header) {
        const headerOpacity = scrolled > 50 ? 0.95 : 1;
        const headerBlur = scrolled > 50 ? 'blur(8px)' : 'blur(0px)';
        
        header.style.backdropFilter = headerBlur;
        header.style.opacity = headerOpacity;
      }

      // Content parallax
      const content = document.querySelector('.parallax-content');
      if (content) {
        const contentRate = scrolled * -0.1;
        content.style.transform = `translate3d(0, ${contentRate}px, 0)`;
      }

      // Footer parallax elements
      const footerElements = [
        { selector: '.parallax-footer', rate: scrolled * -0.05 },
        { selector: '.parallax-footer-content', rate: scrolled * -0.08 },
        { selector: '.parallax-year', rate: scrolled * -0.12 },
        { selector: '.parallax-separator', rate: scrolled * -0.1 },
        { selector: '.parallax-attribution', rate: scrolled * -0.09 },
        { selector: '.parallax-badges', rate: scrolled * -0.07 },
        { selector: '.parallax-orb-1', rate: scrolled * -0.15 },
        { selector: '.parallax-orb-2', rate: scrolled * -0.18 },
      ];

      footerElements.forEach(({ selector, rate }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
      });

      // Overlay parallax
      const overlay = document.querySelector('.parallax-overlay');
      if (overlay) {
        const overlayOpacity = Math.min(0.3, scrolled / 1000);
        overlay.style.opacity = overlayOpacity;
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const handleScroll = () => requestTick();

    // Initial call
    updateParallax();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}