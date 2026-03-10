import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68bc37bca4385f82fa4d811b/cdf6b7ae3_photo_1_2026-03-10_14-31-56.jpg"
          alt="Vestido infantil clássico"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(135deg, rgba(251,250,245,0.85) 0%, rgba(244,226,226,0.6) 40%, rgba(251,250,245,0.3) 100%)' 
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
            Atelier de Moda Infantil
          </p>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}
        >
          Pequena<br />Duquesa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 sm:mt-8 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300, letterSpacing: '0.08em' }}
        >
          Vestidos artesanais bordados à mão, criados com amor para transformar cada momento em memória eterna — para a sua pequena duquesa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 sm:mt-12"
        >
          <Link
            to={createPageUrl("Products")}
            className="inline-block px-8 sm:px-12 py-3 sm:py-4 text-xs tracking-[0.2em] uppercase velvet-transition hover:shadow-lg"
            style={{ 
              fontFamily: 'Montserrat, sans-serif', 
              fontWeight: 400,
              color: '#FBFAF5',
              background: '#A17C7C',
              letterSpacing: '0.2em'
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
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#A17C7C] opacity-40" />
      </motion.div>
    </section>
  );
}