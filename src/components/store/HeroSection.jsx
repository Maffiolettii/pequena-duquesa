import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="flex flex-col w-full bg-[#FFFAF0] relative z-0">
      {/* Ajuste de Padding: 
          pt-20 (mobile) e pt-28 (desktop) para garantir que o texto 
          não sobreponha a logo e o menu superior. 
      */}
      <div className="w-full text-center px-6 pt-20 pb-12 md:pt-28 md:pb-20 bg-[#FFFAF0]">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-4xl mx-auto"
        >
          <h1 
            className="font-serif leading-tight mb-5" 
            style={{ fontSize: 'clamp(1.8rem, 7vw, 3.5rem)', color: '#4A3A3A' }}
          >
            Vestidos artesanais <br className="md:hidden"/> bordados a mão
          </h1>
          
          <p 
            className="font-serif italic mb-8 px-4 max-w-2xl mx-auto" 
            style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.4rem)', color: '#6B5252', lineHeight: '1.4' }}
          >
            criados com amor para transformar cada momento em memória eterna – para a sua pequena duquesa
          </p>
          
          <Link 
            to={createPageUrl("Products")} 
            className="inline-block font-sans uppercase tracking-[0.2em] bg-[#D4A5A5] hover:bg-[#4A3A3A] text-white py-4 px-12 text-[0.7rem] rounded-full transition-all duration-300 shadow-sm"
          >
            Ver Coleção
          </Link>
        </motion.div>
      </div>

      {/* Container da Imagem:
          Aumentamos um pouco a altura (45vh) para não parecer "esmagada" 
          e adicionamos arredondamento nas laterais em telas grandes.
      */}
      <div className="relative w-full px-0 md:px-10">
        <div 
          className="relative w-full overflow-hidden rounded-b-[40px] md:rounded-[40px] shadow-sm" 
          style={{ height: '45vh', minHeight: 320 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://media.base44.com/images/public/69b06ea4922854e28166d780/c4dad9bb6_IMG_7444.png')",
              backgroundPosition: 'center 20%' 
            }} 
          />
          {/* Degradê sutil para fusão suave com o fundo creme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFAF0]/40 via-transparent to-transparent h-20" />
        </div>
      </div>
    </section>
  );
}