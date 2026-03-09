import { Target, Lightbulb, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import GlassCard from './GlassCard';

const ServicesSection = () => {
  const { language } = useLanguage();
  const t = translations.services[language];

  const icons = [Target, Lightbulb, Code2];
  const colors = ['electric-blue', 'deep-violet', 'cyan-glow'];

  return (
    <section id="layanan" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient fade-in-up">
          {t.heading}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {t.items.map((service, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <GlassCard key={index}>
                <div className="text-center">
                  <div className={`inline-block p-4 bg-${color}/20 rounded-2xl mb-6`}>
                    <Icon className={`text-${color}`} size={48} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
