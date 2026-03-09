import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './Navbar.css';
import './LanguageToggle.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage } = useLanguage();
  const t = translations.nav[language];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Track active section on scroll with throttling for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['hero', 'visi', 'layanan', 'harga', 'kontak'];
          const scrollPosition = window.scrollY + window.innerHeight * 0.4;
          
          // Iterate backwards - first section whose top is above scroll position wins
          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i]);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + window.scrollY;
              
              if (scrollPosition >= elementTop) {
                if (activeSection !== sections[i]) {
                  setActiveSection(sections[i]);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const navItems = [
    { id: 'hero', label: t.home },
    { id: 'visi', label: t.vision },
    { id: 'layanan', label: t.services },
    { id: 'harga', label: t.pricing },
    { id: 'kontak', label: t.contact }
  ];

  return (
    <>
      {/* Desktop Floating Island Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 floating-island hidden md:block">
        <div className="nav-container">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-pill ${activeSection === item.id ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className="nav-pill-bg"></span>
              <span className="nav-pill-text">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Dynamic Island */}
      <div 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 md:hidden dynamic-island ${isMenuOpen ? 'expanded' : ''}`}
        onClick={() => !isMenuOpen && setIsMenuOpen(true)}
      >
        <div className="dynamic-island-content">
          {!isMenuOpen ? (
            <div className="dynamic-island-collapsed">
              <span className="current-section-label">
                {navItems.find(item => item.id === activeSection)?.label || t.home}
              </span>
              <span className="expand-indicator">▾</span>
            </div>
          ) : (
            <div className="dynamic-island-menu">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={(e) => { e.stopPropagation(); scrollToSection(item.id); }}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </button>
              ))}
              <div className="close-divider"></div>
              {/* Mobile Language Toggle */}
              <div 
                className="mobile-lang-toggle"
                style={{ animationDelay: '0.25s' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={`mobile-lang-btn ${language === 'id' ? 'active' : ''}`}
                  onClick={() => setLanguage('id')}
                >
                  ID
                </button>
                <button
                  className={`mobile-lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
              </div>
              <button 
                className="close-btn"
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                style={{ animationDelay: '0.3s' }}
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
