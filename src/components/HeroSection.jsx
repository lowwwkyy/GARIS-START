import './HeroSection.css';
import logo from '../../Assets/GARIS_START-removebg-preview.png';

const HeroSection = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo + Title Row - stacked on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 lg:gap-8 mb-4">
          {/* Logo */}
          <div className="hero-logo mb-4 md:mb-0">
            <img 
              src={logo} 
              alt="GARIS START Logo" 
              className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
            />
          </div>
          
          {/* Title with glow and particles */}
          <div className="hero-title-wrapper relative">
            {/* Particles */}
            <div className="particles">
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
              <span className="particle"></span>
            </div>
            
            <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight text-gradient glow-text">
              GARIS START
            </h1>
          </div>
        </div>
        
        <h2 className="hero-subtitle-main text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
          Transformasi Digital Bisnis Anda
        </h2>

        <p className="hero-subtitle text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
          Modernisasi UMKM Anda dengan website profesional dan branding yang tepat guna
        </p>

        <button
          onClick={() => scrollToSection('kontak')}
          className="hero-cta px-8 py-4 bg-gradient-to-r from-electric-blue via-deep-violet to-cyan-glow rounded-full text-lg font-semibold shadow-lg shadow-electric-blue/50 hover:shadow-xl hover:shadow-deep-violet/50 hover:scale-105 active:scale-95 transition-all"
        >
          Mulai Sekarang
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
