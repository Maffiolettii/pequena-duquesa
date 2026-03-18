import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const WORD_1 = 'Pequena';
const WORD_2 = 'Duquesa';
const CHAR_DELAY = 120; // ms por caractere
const START_DELAY_1 = 900; // quando começa "Pequena"
const START_DELAY_2 = START_DELAY_1 + WORD_1.length * CHAR_DELAY + 200; // começa "Duquesa" após "Pequena"

function useTypewriter(text, startDelay) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let i = 0;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, CHAR_DELAY);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  return { displayed, done };
}

export default function HeroSection() {
  const { displayed: text1, done: done1 } = useTypewriter(WORD_1, START_DELAY_1);
  const { displayed: text2, done: done2 } = useTypewriter(WORD_2, START_DELAY_2);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background sólido */}
      <div className="absolute inset-0" style={{ backgroundColor: '#FBFAF5' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-sm w-full">

        {/* Linha decorativa superior */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 40, height: '0.5px', backgroundColor: 'rgba(161,124,124,0.5)', marginBottom: 20 }}
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            color: '#A17C7C',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Ateliê artesanal · Recife
        </motion.p>

        {/* Logo circular com brilho suave */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 24 }}
        >
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            padding: 3,
            background: 'rgba(251,250,245,0.7)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 0 1px rgba(161,124,124,0.2), 0 8px 32px rgba(161,124,124,0.12)',
          }}>
            <motion.img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b06ea4922854e28166d780/60920f0e2_photo_2026-03-10_16-45-11.jpg"
              alt="Pequena Duquesa"
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 8vw, 4rem)',
            color: '#7A5A5A',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            marginBottom: 6,
          }}
        >
          Pequena
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(2.6rem, 8vw, 4rem)',
            color: '#A17C7C',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            marginBottom: 24,
          }}
        >
          Duquesa
        </motion.h1>

        {/* Linha decorativa */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 32, height: '0.5px', backgroundColor: 'rgba(161,124,124,0.4)', marginBottom: 24 }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '1.05rem',
            color: '#7A5A5A',
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 280,
          }}
        >
          Vestidos artesanais bordados à mão. Criados com amor para transformar cada momento em uma memória eterna para a sua pequena duquesa.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={createPageUrl("Products")}
            className="inline-block velvet-transition hover:opacity-80"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FBFAF5',
              background: '#A17C7C',
              padding: '14px 32px',
              borderRadius: 50,
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
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#A17C7C] opacity-30" />
      </motion.div>

      {/* Divisor decorativo */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-0">
        <div style={{ width: '60%', height: '0.5px', backgroundColor: 'rgba(161,124,124,0.25)' }} />
        <div className="flex items-center gap-4 py-3">
          <div style={{ width: 40, height: '0.5px', backgroundColor: 'rgba(161,124,124,0.3)' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'rgba(161,124,124,0.4)' }} />
          <div style={{ width: 40, height: '0.5px', backgroundColor: 'rgba(161,124,124,0.3)' }} />
        </div>
      </div>
    </section>
  );
}