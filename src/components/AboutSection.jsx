import { Target, Lightbulb } from 'lucide-react';
import GlassCard from './GlassCard';

const AboutSection = () => {
  return (
    <section id="visi" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Visi & Target Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-electric-blue/20 rounded-lg">
                <Target className="text-electric-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-2">Visi Kami</h3>
            </div>
            <p className="text-white/70 text-lg leading-relaxed">
              Menjadi mitra terpercaya dalam proses digitalisasi UMKM dan platform lokal di Indonesia, 
              mendorong pertumbuhan ekonomi inklusif dan berkelanjutan melalui teknologi yang tepat guna.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-deep-violet/20 rounded-lg">
                <Lightbulb className="text-deep-violet" size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-2">Target Kami</h3>
            </div>
            <p className="text-white/70 text-lg leading-relaxed">
              Kami menyasar pelaku usaha mikro, kecil, dan menengah, serta platform komunitas atau edukasi 
              yang ingin beradaptasi dengan era digital. Kami percaya bahwa setiap bisnis — sekecil apa pun — 
              memiliki potensi besar saat didukung oleh solusi digital yang tepat.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
