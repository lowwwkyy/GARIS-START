import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import translations from '../translations';
import './Navbar.css';
import './LanguageToggle.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const menuTriggerRef = useRef(null);
  const { language, setLanguage } = useLanguage();
  const t = translations.nav[language];

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuTriggerRef.current?.focus({ preventScroll: true });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
      setActiveSection(id);
      if (isMenuOpen) closeMenu();
    }
  };

  // Use one passive listener and at most one pending frame. The subscription
  // stays stable when the selected section changes.
  useEffect(() => {
    let frame = null;
    const sections = ['hero', 'visi', 'layanan', 'projects', 'kontak']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    
    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          frame = null;
          const marker = window.innerHeight * 0.4;
          
          for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].getBoundingClientRect().top <= marker) {
              setActiveSection(sections[i].id);
              break;
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: t.home },
    { id: 'visi', label: t.vision },
    { id: 'layanan', label: t.services },
    { id: 'projects', label: t.projects },
    { id: 'kontak', label: t.contact }
  ];

  return (
    <>
      {/* Desktop Floating Island Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 floating-island hidden lg:block">
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
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 lg:hidden dynamic-island ${isMenuOpen ? 'expanded' : ''}`}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && isMenuOpen) {
            event.preventDefault();
            closeMenu();
          }
        }}
      >
        <div className="dynamic-island-content">
          <button
            ref={menuTriggerRef}
            type="button"
            className="dynamic-island-collapsed"
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? 'mobile-navigation' : undefined}
            onClick={() => isMenuOpen ? closeMenu() : setIsMenuOpen(true)}
          >
            <span className="current-section-label">
              {navItems.find(item => item.id === activeSection)?.label || t.home}
            </span>
            <span className="expand-indicator" aria-hidden="true">▾</span>
          </button>
          {isMenuOpen && (
            <div id="mobile-navigation" className="dynamic-island-menu">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  autoFocus={index === 0}
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
                  aria-pressed={language === 'id'}
                >
                  ID
                </button>
                <button
                  className={`mobile-lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
              </div>
              <button 
                className="close-btn"
                onClick={closeMenu}
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
