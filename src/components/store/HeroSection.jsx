import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68bc37bca4385f82fa4d811b/cdf6b7ae3_photo_1_2026-03-10_14-31-56.jpg"
          alt="Vestido infantil clássico"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
        {/* Névoa creme */}
        <div className="absolute inset-0" style={{ background: 'rgba(253,245,230,0.72)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-md w-full">

        {/* Tag / Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-8"
        >
          {/* Cordão */}
          <div style={{ width: 2, height: 28, backgroundColor: 'rgba(161,124,124,0.5)', borderRadius: 2 }} />

          {/* Tag shape */}
          <motion.div
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
          >
            <div
              className="flex flex-col items-center justify-center px-10 pt-8 pb-8 relative"
              style={{
                backgroundColor: '#F5ECD7',
                border: '1.5px solid rgba(161,124,124,0.35)',
                borderRadius: '12px 12px 12px 12px',
                boxShadow: '0 4px 24px rgba(161,124,124,0.13)',
                minWidth: 180,
              }}
            >
              {/* Buraco do cordão */}
              <div
                className="absolute -top-3"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: '#FBFAF5',
                  border: '1.5px solid rgba(161,124,124,0.4)',
                }}
              />

              {/* Coroa */}
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mb-2">
                <path d="M2 16L5 6L10 11L14 2L18 11L23 6L26 16H2Z" stroke="#A17C7C" strokeWidth="1.2" fill="rgba(161,124,124,0.12)" strokeLinejoin="round"/>
              </svg>

              {/* Logo image */}
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b06ea4922854e28166d780/60920f0e2_photo_2026-03-10_16-45-11.jpg"
                alt="Pequena Duquesa"
                style={{
                  width: 72,
                  height: 72,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  mixBlendMode: 'multiply',
                  marginBottom: 10,
                }}
              />

              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: '0.12em',
                color: '#7A5A5A',
                lineHeight: 1.2,
                textAlign: 'center',
              }}>
                PEQUENA<br />DUQUESA
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-xs"
          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A', fontWeight: 400, fontStyle: 'italic' }}
        >
          Vestidos artesanais bordados à mão. Criados com amor para transformar cada momento em uma memória eterna para a sua pequena duquesa.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={createPageUrl("Products")}
            className="inline-block px-10 py-4 text-xs tracking-[0.22em] uppercase velvet-transition hover:opacity-80"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              color: '#FBFAF5',
              background: '#A17C7C',
              borderRadius: 50,
              letterSpacing: '0.22em',
            }}
            aria-label="Ver coleção completa de vestidos"
          >
            Descobrir Coleção
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#A17C7C] opacity-40" />
      </motion.div>
    </section>
  );
}