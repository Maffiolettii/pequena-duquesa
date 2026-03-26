import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterFooter() {
  const [email, setEmail] = useState('');

  return (
    <footer className="w-full bg-[#4A3A3A] text-[#FFFAF0] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título de Referência do Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif italic text-3xl md:text-5xl mb-4 tracking-wide">
            Carta à Duquesa
          </h2>
          <p className="font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase opacity-80 mb-10">
            Seja a primeira a descobrir nossas novas coleções e peças exclusivas.
          </p>
        </motion.div>

        {/* Formulário de Inscrição */}
        <form 
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border-b border-[#E2C792]/50 py-3 px-2 font-serif italic text-lg focus:outline-none focus:border-[#E2C792] transition-colors placeholder:text-[#FFFAF0]/40"
          />
          <button
            type="submit"
            className="bg-[#D4A5A5] hover:bg-[#FFFAF0] hover:text-[#4A3A3A] text-white font-sans text-[10px] uppercase tracking-[0.2em] px-10 py-4 transition-all duration-500 rounded-full"
          >
            Inscrever
          </button>
        </form>

        {/* Rodapé de Créditos */}
        <div className="mt-20 pt-8 border-t border-[#FFFAF0]/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <p className="font-sans text-[9px] tracking-widest uppercase">
            © 2026 Pequena Duquesa · Todos os direitos reservados
          </p>
          <div className="flex gap-8 font-sans text-[9px] tracking-widest uppercase">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A5A5] transition-colors">Instagram</a>
            <a href="https://wa.me/5581992656652" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A5A5] transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}