import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="flex flex-col w-full bg-[#FFFAF0] -mt-2 relative z-0">
      {/* Container de Texto - Compactado */}
      <div className="w-full text-center px-6 pt-4 pb-8 md:pt-12 md:pb-16 bg-[#FFFAF0]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
          <h1 className="font-serif leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 7vw, 3.5rem)', color: '#4A3A3A' }}>
            Vestidos artesanais <br className="md:hidden"/> bordados a mão
          </h1>
          <p className="font-serif italic mb-6 px-4" style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.4rem)', color: '#6B5252', lineHeight: '1.3' }}>
            criados com amor para transformar cada momento em memoria eterna – para a sua pequena duquesa
          </p>
          <Link to={createPageUrl("Products")} className="inline-block font-sans uppercase tracking-[0.2em] bg-[#D4A5A5] text-white py-3 px-10 text-[0.65rem] rounded-full">
            Ver Coleção
          </Link>
        </motion.div>
      </div>

      {/* Imagem - Altura reduzida para o conteúdo subir no mobile */}
      <div className="relative w-full overflow-hidden" style={{ height: '35vh', minHeight: 280 }}>
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://media.base44.com/images/public/69b06ea4922854e28166d780/c4dad9bb6_IMG_7444.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFAF0] via-transparent to-transparent h-8" />
      </div>
    </section>
  );
}