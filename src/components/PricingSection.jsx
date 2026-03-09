import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import GlassCard from './GlassCard';

const PricingSection = () => {
  const { language } = useLanguage();
  const t = translations.pricing[language];

  const colors = ['electric-blue', 'deep-violet', 'cyan-glow'];
  const highlighted = [false, true, false];

  return (
    <section id="harga" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gradient fade-in-up">
          {t.heading}
        </h2>

        <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto fade-in-up">
          {t.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {t.tiers.map((tier, index) => {
            const color = colors[index];
            const isHighlighted = highlighted[index];
            return isHighlighted ? (
              <div
                key={index}
                className="glass-card-featured relative border-2 border-deep-violet shadow-2xl shadow-deep-violet/50 fade-in-up"
              >
                <div className="popular-pill absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-electric-blue to-deep-violet rounded-full text-sm font-bold z-10">
                  {t.popular}
                </div>
                <div className="text-center pt-4">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className={`text-4xl font-bold text-${color} mb-6`}>
                    {tier.price}
                  </div>
                  <ul className="space-y-4 text-left">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`text-${color} flex-shrink-0 mt-1`} size={20} />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <GlassCard key={index}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className={`text-4xl font-bold text-${color} mb-6`}>
                    {tier.price}
                  </div>
                  <ul className="space-y-4 text-left">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`text-${color} flex-shrink-0 mt-1`} size={20} />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
