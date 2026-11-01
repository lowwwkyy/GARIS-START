import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useViewportActivity } from '../hooks/useViewportActivity';
import translations from '../translations';
import './HeroSection.css';
import logo from '../../Assets/GARIS_START-removebg-preview.png';

const HeroSection = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { ref, isActive } = useViewportActivity();
  const { language } = useLanguage();
  const t = translations.hero[language];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <section ref={ref} data-animations-active={isActive} id="hero" className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo + Title Row - stacked on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 lg:gap-8 mb-4">
          {/* Logo */}
          <div className="hero-logo relative w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 mb-4 md:mb-0">
            {!logoLoaded && (
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/5 text-3xl font-bold text-electric-blue">
                GS
              </span>
            )}
            <img 
              src={logo} 
              alt="GARIS START Logo" 
              width="160"
              height="160"
              decoding="async"
              fetchPriority="high"
              onLoad={() => setLogoLoaded(true)}
              className={`w-full h-full object-contain ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          
          {/* Title with glow and particles */}
          <div className="hero-title-wrapper relative">
            {/* Particles - generated dynamically */}
            <div className="particles" aria-hidden="true">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i} className="particle" />
              ))}
            </div>
            
            <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight text-electric-blue glow-text">
              GARIS START
            </h1>
          </div>
        </div>
        
        <h2 className="hero-subtitle-main text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
          {t.subtitle}
        </h2>

        <p className="hero-subtitle text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
          {t.description}
        </p>

        <button
          onClick={() => scrollToSection('kontak')}
          className="hero-cta action-button px-8 py-4 bg-electric-blue rounded-full text-lg font-semibold"
        >
          {t.cta}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
