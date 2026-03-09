import { LanguageProvider } from './context/LanguageContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import LanguageToggle from './components/LanguageToggle';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen text-white overflow-x-hidden">
        <AnimatedBackground />
        <Navbar />
        <LanguageToggle />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
