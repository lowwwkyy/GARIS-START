import { Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import GlassCard from './GlassCard';

const AboutSection = () => {
  const { language } = useLanguage();
  const t = translations.about[language];

  return (
    <section id="visi" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          {t.heading}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-electric-blue/20 rounded-lg">
                <Target className="text-electric-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-2">{t.visionTitle}</h3>
            </div>
            <p className="text-white/70 text-lg leading-relaxed">
              {t.visionText}
            </p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-deep-violet/20 rounded-lg">
                <Lightbulb className="text-deep-violet" size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-2">{t.targetTitle}</h3>
            </div>
            <p className="text-white/70 text-lg leading-relaxed">
              {t.targetText}
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
