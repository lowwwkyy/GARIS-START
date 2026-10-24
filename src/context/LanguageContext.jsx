import { useEffect, useState } from 'react';
import { LanguageContext } from './LanguageState';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id'); // default Indonesian

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'id' ? 'en' : 'id'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
