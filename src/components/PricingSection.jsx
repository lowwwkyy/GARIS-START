import { Check } from 'lucide-react';
import GlassCard from './GlassCard';

const PricingSection = () => {
  const pricingTiers = [
    {
      name: 'Paket Starting',
      price: 'Rp 600K - 800K',
      color: 'electric-blue',
      features: [
        '4-6 Halaman',
        'Domain & Hosting',
        'Desain template brand',
        'Mobile Responsive',
        'Email bisnis'
      ],
      highlighted: false
    },
    {
      name: 'Paket Growth',
      price: 'Rp 900K - 1.2JT',
      color: 'deep-violet',
      features: [
        'All in Starting +',
        'Website Multi-section',
        'Desain Profesional',
        'Form Kontak',
        'Basic SEO',
        'Integrasi Logo'
      ],
      highlighted: true
    },
    {
      name: 'Paket Business',
      price: 'Rp 1.5JT - 2.5JT',
      color: 'cyan-glow',
      features: [
        'Website Lengkap',
        'Branding Package',
        'Integrasi AI (Chatbot)',
        'Analitik & SEO Lanjut',
        'E-commerce/Custom'
      ],
      highlighted: false
    }
  ];

  return (
    <section id="harga" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gradient fade-in-up">
          Paket Harga
        </h2>

        <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto fade-in-up">
          Harga kami disesuaikan untuk UKM: terjangkau, cepat, dan hasil profesional
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            tier.highlighted ? (
              <div
                key={index}
                className="glass-card-featured relative border-2 border-deep-violet shadow-2xl shadow-deep-violet/50 fade-in-up"
              >
                <div className="popular-pill absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-electric-blue to-deep-violet rounded-full text-sm font-bold z-10">
                  POPULAR
                </div>
                <div className="text-center pt-4">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className={`text-4xl font-bold text-${tier.color} mb-6`}>
                    {tier.price}
                  </div>
                  <ul className="space-y-4 text-left">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`text-${tier.color} flex-shrink-0 mt-1`} size={20} />
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
                  <div className={`text-4xl font-bold text-${tier.color} mb-6`}>
                    {tier.price}
                  </div>
                  <ul className="space-y-4 text-left">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`text-${tier.color} flex-shrink-0 mt-1`} size={20} />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
