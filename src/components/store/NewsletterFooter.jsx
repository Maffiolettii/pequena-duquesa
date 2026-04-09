import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function NewsletterFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    await base44.entities.NewsletterSubscriber.create({ email });
    setEmail('');
    setSubmitted(true);
    setSending(false);
  };

  return (
    /* Aumentamos py-16 para py-24 no Desktop para dar o respiro de luxo.
       Adicionamos mt-12 para garantir que ele nunca cole nos cards de produtos acima.
    */
    <footer className="w-full bg-[#4A3A3A] text-[#FFFAF0] pt-24 pb-12 px-6 mt-12">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Título de Referência do Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif italic text-4xl md:text-6xl mb-6 tracking-wide text-[#E2C792]">
            Carta à Duquesa
          </h2>
          <p className="font-sans text-[10px] md:text-[12px] tracking-[0.3em] uppercase opacity-90 mb-12 max-w-md mx-auto leading-relaxed">
            Seja a primeira a descobrir nossas novas coleções e peças exclusivas.
          </p>
        </motion.div>

        {/* Formulário de Inscrição */}
        {submitted ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 font-serif italic text-xl text-[#E2C792]"
          >
            Bem-vinda à família Duquesa! ✨
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-6 max-w-lg mx-auto mb-16"
          >
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border-b-2 border-[#E2C792]/50 py-5 px-2 font-serif italic text-xl focus:outline-none focus:border-[#D4A5A5] transition-all placeholder:text-[#FFFAF0]/30 min-h-[56px]"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-[#D4A5A5] hover:bg-[#FFFAF0] hover:text-[#4A3A3A] text-white font-sans text-[10px] uppercase px-12 py-4 transition-all duration-500 rounded-full shadow-lg min-h-[56px] disabled:opacity-60"
              style={{ letterSpacing: '0.1em' }}
            >
              {sending ? 'Inscrevendo...' : 'Inscrever'}
            </button>
          </form>
        )}

        {/* Rodapé de Créditos - Separado com elegância */}
        <div className="mt-24 pt-10 border-t border-[#FFFAF0]/20 flex flex-col md:flex-row justify-between items-center gap-8 opacity-80">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase">
            © 2026 Pequena Duquesa · Todos os direitos reservados
          </p>
          <div className="flex gap-10 font-sans text-[9px] tracking-[0.2em] uppercase">
            <a href="https://www.instagram.com/pequenaduquesa_" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A5A5] transition-colors">Instagram</a>
            <a href="https://wa.me/5581992656652" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A5A5] transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}