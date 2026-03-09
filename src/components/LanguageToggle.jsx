import { useLanguage } from '../context/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle-island hidden md:block fixed top-6 right-6 z-50">
      <div className="lang-container">
        <button
          onClick={() => setLanguage('id')}
          className={`lang-pill ${language === 'id' ? 'active' : ''}`}
        >
          <span className="lang-pill-bg"></span>
          <span className="lang-pill-text">ID</span>
        </button>
        <span className="lang-divider">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`lang-pill ${language === 'en' ? 'active' : ''}`}
        >
          <span className="lang-pill-bg"></span>
          <span className="lang-pill-text">EN</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
