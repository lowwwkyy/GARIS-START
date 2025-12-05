import { Target, Lightbulb, Code2 } from 'lucide-react';
import GlassCard from './GlassCard';

const ServicesSection = () => {
  const services = [
    {
      icon: Target,
      title: 'Personal Branding',
      description: 'Membangun identitas unik untuk bisnis Anda yang menonjol di pasar digital',
      color: 'electric-blue'
    },
    {
      icon: Lightbulb,
      title: 'Modernisasi Model Bisnis',
      description: 'Transformasi dari offline ke online dengan strategi yang tepat dan efektif',
      color: 'deep-violet'
    },
    {
      icon: Code2,
      title: 'Teknologi Tepat Guna',
      description: 'Solusi scalable yang tumbuh bersama bisnis Anda tanpa kompleksitas berlebih',
      color: 'cyan-glow'
    }
  ];

  return (
    <section id="layanan" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient fade-in-up">
          Layanan Kami
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard key={index}>
              <div className="text-center">
                <div className={`inline-block p-4 bg-${service.color}/20 rounded-2xl mb-6`}>
                  <service.icon className={`text-${service.color}`} size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
