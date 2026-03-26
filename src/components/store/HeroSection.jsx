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
          <p className="font-sans mb-4" style={{ fontSize: '0.55rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
            Ateliê Artesanal · Recife
          </p>

          <h1
            className="font-serif italic leading-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: '#FFFFFF',
              textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            Pequena Duquesa
          </h1>

          <p
            className="font-serif italic mb-8"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            Peças bordadas à mão com amor e delicadeza, para a sua pequena duquesa.
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