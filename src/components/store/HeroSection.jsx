import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: 480 }}>
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://media.base44.com/images/public/69b06ea4922854e28166d780/c4dad9bb6_IMG_7444.png')",
        }}
        aria-hidden="true"
      />
      {/* Overlay escuro suave à esquerda */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.0) 100%)' }} />

      {/* Conteúdo — alinhado à esquerda como no design */}
      <div className="relative z-10 h-full flex items-center px-8 sm:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <h1
            className="font-sans font-bold uppercase leading-tight mb-3"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            Pequena Duquesa: Onde Sonhos se Tornam Vestidos.
          </h1>

          <p
            className="font-sans mb-8"
            style={{
              fontSize: '0.9rem',
              fontWeight: 300,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            Ateliê Online. Moda Atemporal e Sofisticada para Princesas de 1 a 6 Anos.
          </p>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={createPageUrl("Products")}
              className="inline-block font-sans uppercase tracking-widest transition-colors duration-300"
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                border: '1.5px solid rgba(255,255,255,0.8)',
                color: '#FFFFFF',
                padding: '12px 32px',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                backdropFilter: 'blur(4px)',
              }}
            >
              Ver Coleção
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}