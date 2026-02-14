import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import GlassCard from './GlassCard';
import './ContactSection.css';

const ContactSection = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create WhatsApp message from template
    const waMessage = 'Halo saya ingin memesan website!!\n\n' + message;

    // Encode for URL
    const encodedMessage = encodeURIComponent(waMessage);

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/6285829701074?text=${encodedMessage}`, '_blank');

    // Clear form
    setMessage('');
  };

  return (
    <section id="kontak" className="py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient fade-in-up">
          Hubungi Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Form */}
          <GlassCard className="flex flex-col">
            <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-2">Pesan</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full flex-1 px-4 py-3 mb-6 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-electric-blue transition-colors resize-none"
                placeholder="Jelaskan tentang website yang kamu inginkan disini..."
              />

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
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-white/70">+62 858-2970-1074</div>
                  </div>
                </a>

                <a
                  href="mailto:garisstart.salatiga@gmail.com"
                  className="contact-link flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="p-3 bg-deep-violet/20 rounded-lg">
                    <Mail className="text-deep-violet" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/70">garisstart.salatiga@gmail.com</div>
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
