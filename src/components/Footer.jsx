import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations.footer[language];

  return (
    <footer className="py-8 px-5 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center text-white/60">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
