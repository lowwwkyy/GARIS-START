import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'visi', 'layanan', 'harga'];
      const scrollPos = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'visi', label: 'VISION' },
    { id: 'layanan', label: 'SERVICE' },
    { id: 'harga', label: 'PRICING' }
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
            <div className="dynamic-island-pill">
              <div className="pill-indicator"></div>
              <div className="pill-indicator"></div>
              <div className="pill-indicator"></div>
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
              <button 
                className="close-btn"
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                style={{ animationDelay: '0.25s' }}
              >
                ✕ CLOSE
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
