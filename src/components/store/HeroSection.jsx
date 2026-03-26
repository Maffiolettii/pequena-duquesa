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
      {/* Overlay rosa pastel suave */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(248, 232, 238, 0.35)' }} />

      {/* Conteúdo — centralizado com card */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl w-full"
          style={{
            backgroundColor: 'rgba(255, 250, 240, 0.82)',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(226, 199, 146, 0.3)',
          }}
        >
          <p className="font-sans mb-3" style={{ fontSize: '0.55rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#A17C7C' }}>
            Ateliê Online · Recife
          </p>

          <h1
            className="font-serif italic leading-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: '#4A3A3A',
            }}
          >
            Pequena Duquesa
          </h1>

          <p
            className="font-serif italic mb-3"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: 300,
              color: '#6B5252',
            }}
          >
            Onde Sonhos se Tornam Vestidos.
          </p>

          <p
            className="font-sans mb-8"
            style={{
              fontSize: '0.75rem',
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: '#4A4A4A',
            }}
          >
            Moda atemporal e sofisticada para princesas de 1 a 6 anos.
          </p>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={createPageUrl("Products")}
              className="inline-block font-sans uppercase tracking-widest velvet-transition"
              style={{
                backgroundColor: 'var(--rosa-principal)',
                border: '1px solid var(--dourado-antigo)',
                color: '#FFFFFF',
                padding: '14px 40px',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                borderRadius: '30px',
                boxShadow: 'var(--sombra-soft)',
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