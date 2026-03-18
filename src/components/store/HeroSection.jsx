import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const WORD_1 = 'Pequena';
const WORD_2 = 'Duquesa';
const CHAR_DELAY = 180;
const START_DELAY_1 = 1000;
const START_DELAY_2 = START_DELAY_1 + WORD_1.length * CHAR_DELAY + 500;

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
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FBFAF5' }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 60% 40%, rgba(244,226,226,0.45) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-32">
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            color: '#A17C7C',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          Ateliê artesanal · Recife
        </motion.p>

        {/* Animated title */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(2.6rem, 8vw, 4rem)',
          color: '#7A5A5A',
          lineHeight: 1.1,
          letterSpacing: '0.02em',
          marginBottom: 6,
          minHeight: '1.1em',
        }}>
          {text1}
          {!done1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: '#A17C7C' }}
            >|</motion.span>
          )}
        </h1>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(2.6rem, 8vw, 4rem)',
          color: '#7A5A5A',
          lineHeight: 1.1,
          letterSpacing: '0.02em',
          marginBottom: 32,
          minHeight: '1.1em',
        }}>
          {text2}
          {done1 && !done2 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ fontStyle: 'normal' }}
            >|</motion.span>
          )}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            color: '#A17C7C',
            textTransform: 'uppercase',
            marginBottom: 48,
            maxWidth: 320,
          }}
        >
          Vestidos artesanais bordados à mão
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={createPageUrl("Products")}
            className="inline-block velvet-transition hover:opacity-75"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#A17C7C',
              border: '0.5px solid rgba(161,124,124,0.5)',
              padding: '14px 40px',
            }}
            aria-label="Ver coleção completa de vestidos"
          >
            Descobrir Coleção
          </Link>
        </motion.div>
      </div>

      {/* Bottom decorative divisor */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
        <div style={{ width: '60%', height: '0.5px', backgroundColor: 'rgba(161,124,124,0.2)' }} />
        <div className="flex items-center gap-4 py-3">
          <div style={{ width: 40, height: '0.5px', backgroundColor: 'rgba(161,124,124,0.3)' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'rgba(161,124,124,0.35)' }} />
          <div style={{ width: 40, height: '0.5px', backgroundColor: 'rgba(161,124,124,0.3)' }} />
        </div>
      </div>
    </section>
  );
}