import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="flex flex-col w-full bg-[#FFFAF0] -mt-1 relative z-0">
      
      {/* 1. ÁREA DE TEXTO (Ajustada para Mobile) */}
      <div className="w-full text-center px-6 pt-10 pb-12 md:pt-24 md:pb-24 bg-[#FFFAF0]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1
            className="font-serif leading-tight mb-6 px-2"
            style={{
              fontSize: 'clamp(1.8rem, 8vw, 4rem)',
              fontWeight: 400,
              color: '#4A3A3A',
            }}
          >
            Vestidos artesanais <br className="md:hidden"/> bordados a mão
          </h1>

          <p
            className="font-serif italic mb-10 px-4"
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.6rem)',
              color: '#6B5252',
              lineHeight: '1.5'
            }}
          >
            criados com amor para transformar cada momento em memoria eterna <br className="hidden md:block"/>
            – para a sua pequena duquesa
          </p>

          <Link
            to={createPageUrl("Products")}
            className="inline-block font-sans uppercase tracking-[0.2em]"
            style={{
              backgroundColor: '#D4A5A5',
              color: '#FFFFFF',
              padding: '14px 40px',
              fontSize: '0.7rem',
              borderRadius: '50px',
            }}
          >
            Ver Coleção
          </Link>
        </motion.div>
      </div>

      {/* 2. ÁREA DA IMAGEM */}
      <div className="relative w-full overflow-hidden" style={{ height: '50vh', minHeight: 350 }}>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://media.base44.com/images/public/69b06ea4922854e28166d780/c4dad9bb6_IMG_7444.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFAF0] via-transparent to-transparent h-20" />
      </div>
    </section>
  );
}