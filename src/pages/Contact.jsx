import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Instagram } from 'lucide-react';
import NewsletterFooter from '../components/store/NewsletterFooter';
import { base44 } from '@/api/base44Client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ContactMessage.create({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      status: 'novo',
    });
    setForm({ name: '', email: '', phone: '', message: '' });
    setSubmitted(true);
    setSending(false);
  };

  return (
    <div>
      <div className="pt-10 sm:pt-14 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
              Fale Conosco
            </p>
            <h1 className="text-4xl sm:text-6xl"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
              Estamos aqui para você
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-sm leading-relaxed mb-10"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300, letterSpacing: '0.05em' }}>
                Dúvidas sobre tamanhos, encomendas ou coleções? Fale com a gente.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <Instagram size={16} color="#A17C7C" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 400 }}>
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/pequenaduquesa_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm velvet-transition hover:opacity-70"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}
                    >
                      @pequenaduquesa_
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <Phone size={16} color="#A17C7C" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 400 }}>
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/5581992656652"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm velvet-transition hover:opacity-70"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}
                    >
                      (81) 99265-6652
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <MapPin size={16} color="#A17C7C" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 400 }}>
                      Atelier
                    </p>
                    <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
                      Recife, Brasil<br />
                      Atendimento por agendamento
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Image */}
              <div className="mt-10 hidden lg:block w-full aspect-[3/4] overflow-hidden rounded-[20px] shadow-sm">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68bc37bca4385f82fa4d811b/595be2187_photo_18_2026-03-10_14-31-56.jpg"
                  alt="Vestido artesanal Pequena Duquesa"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {submitted ? (
                <div className="h-full flex items-center justify-center text-center py-16">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-6 rounded-full flex items-center justify-center" 
                      style={{ backgroundColor: '#F4E2E2' }}>
                      <Send size={18} color="#A17C7C" />
                    </div>
                    <h3 className="text-2xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#7A5A5A' }}>
                      Mensagem enviada
                    </h3>
                    <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
                      Obrigada pelo contato! Responderemos em breve.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b pb-2 text-sm outline-none velvet-transition focus:border-[#7A5A5A] min-h-[44px]"
                      style={{ borderColor: 'rgba(161,124,124,0.3)', fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 300 }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b pb-2 text-sm outline-none velvet-transition focus:border-[#7A5A5A] min-h-[44px]"
                      style={{ borderColor: 'rgba(161,124,124,0.3)', fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 300 }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b pb-2 text-sm outline-none velvet-transition focus:border-[#7A5A5A] min-h-[44px]"
                      style={{ borderColor: 'rgba(161,124,124,0.3)', fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 300 }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                      Mensagem
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-transparent border-b pb-2 text-sm outline-none velvet-transition focus:border-[#7A5A5A] resize-none"
                      style={{ borderColor: 'rgba(161,124,124,0.3)', fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 300 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 text-xs tracking-[0.2em] uppercase velvet-transition min-h-[44px] disabled:opacity-50"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, color: '#FBFAF5', background: '#A17C7C' }}
                  >
                    {sending ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <NewsletterFooter />
    </div>
  );
}