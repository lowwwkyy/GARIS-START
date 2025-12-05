import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import GlassCard from './GlassCard';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    contact: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const waMessage = `Halo GARIS START! 👋

*Nama:* ${formData.name}
*Bisnis:* ${formData.business}
*Kontak:* ${formData.contact}

*Pesan:*
${formData.message}`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(waMessage);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/6285829701074?text=${encodedMessage}`, '_blank');
    
    // Clear form
    setFormData({ name: '', business: '', contact: '', message: '' });
  };

  return (
    <section id="kontak" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient fade-in-up">
          Hubungi Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <GlassCard>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-electric-blue transition-colors"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nama Bisnis</label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-electric-blue transition-colors"
                  placeholder="Nama Bisnis Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email/WhatsApp</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-electric-blue transition-colors"
                  placeholder="email@example.com atau +62xxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-electric-blue transition-colors resize-none"
                  placeholder="Ceritakan tentang bisnis Anda..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-electric-blue via-deep-violet to-cyan-glow rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover-scale flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Kirim via WhatsApp
              </button>
            </form>
          </GlassCard>

          {/* Contact Info */}
          <GlassCard>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                <p className="text-white/70 text-lg mb-8">
                  Mari kita mulai transformasi digital bisnis Anda hari ini. 
                  Hubungi kami melalui salah satu channel di bawah ini.
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href="https://wa.me/6285829701074"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="p-3 bg-electric-blue/20 rounded-lg">
                    <Phone className="text-electric-blue" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp (Okky)</div>
                    <div className="text-white/70">+62 858-2970-1074</div>
                  </div>
                </a>

                <a
                  href="mailto:gajegaje2025@gmail.com"
                  className="contact-link flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="p-3 bg-deep-violet/20 rounded-lg">
                    <Mail className="text-deep-violet" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/70">gajegaje2025@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
