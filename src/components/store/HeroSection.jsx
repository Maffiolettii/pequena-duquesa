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

// Ícone de coroa SVG inline
function CrownIcon() {
  return (
    <svg width="52" height="40" viewBox="0 0 52 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 34 L8 14 L18 24 L26 6 L34 24 L44 14 L48 34 Z" stroke="#A17C7C" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="26" cy="5" r="2.5" fill="#A17C7C"/>
      <circle cx="7" cy="13" r="2.5" fill="#A17C7C"/>
      <circle cx="45" cy="13" r="2.5" fill="#A17C7C"/>
      <rect x="4" y="34" width="44" height="4" rx="2" fill="#A17C7C" opacity="0.6"/>
    </svg>
  );
}

// Ícone de menina SVG inline
function GirlIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cabeça */}
      <circle cx="28" cy="22" r="14" stroke="#A17C7C" strokeWidth="1.8" fill="none"/>
      {/* Cabelo */}
      <path d="M14 20 Q14 10 28 10 Q42 10 42 20" stroke="#A17C7C" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Laço */}
      <path d="M22 10 Q25 7 28 10 Q31 7 34 10" stroke="#A17C7C" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <circle cx="28" cy="10" r="1.5" fill="#A17C7C"/>
      {/* Olhos */}
      <circle cx="22" cy="22" r="1.8" fill="#A17C7C"/>
      <circle cx="34" cy="22" r="1.8" fill="#A17C7C"/>
      {/* Sorriso */}
      <path d="M22 29 Q28 34 34 29" stroke="#A17C7C" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* Bochecha */}
      <circle cx="18" cy="26" r="2.5" fill="#F4A0A0" opacity="0.4"/>
      <circle cx="38" cy="26" r="2.5" fill="#F4A0A0" opacity="0.4"/>
    </svg>
  );
}

export default function HeroSection() {
  const { displayed: text1, done: done1 } = useTypewriter(WORD_1, START_DELAY_1);
  const { displayed: text2, done: done2 } = useTypewriter(WORD_2, START_DELAY_2);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background rosado com bokeh */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 60% 40%, #f9e8e8 0%, #f4d8d8 40%, #eddada 100%)',
      }} />

      {/* Bokeh circles decorativos */}
      {[
        { top: '15%', left: '55%', size: 80, opacity: 0.18 },
        { top: '60%', left: '70%', size: 120, opacity: 0.12 },
        { top: '30%', left: '80%', size: 60, opacity: 0.15 },
        { top: '70%', left: '40%', size: 90, opacity: 0.1 },
        { top: '10%', left: '30%', size: 50, opacity: 0.12 },
        { top: '50%', left: '15%', size: 70, opacity: 0.08 },
      ].map((b, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          top: b.top, left: b.left,
          width: b.size, height: b.size,
          backgroundColor: 'rgba(255,255,255,' + b.opacity + ')',
          filter: 'blur(18px)',
        }} />
      ))}

      {/* Layout duas colunas */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center min-h-screen">

        {/* Coluna esquerda — imagem do vestido */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 flex items-end justify-center lg:justify-start lg:items-end"
          style={{ minHeight: '60vh' }}
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68bc37bca4385f82fa4d811b/595be2187_photo_18_2026-03-10_14-31-56.jpg"
            alt="Vestido artesanal Pequena Duquesa"
            className="object-contain object-bottom"
            style={{
              maxHeight: '80vh',
              width: 'auto',
              maxWidth: '100%',
              filter: 'drop-shadow(0 20px 40px rgba(161,100,100,0.18))',
            }}
          />
        </motion.div>

        {/* Coluna direita — conteúdo */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-0 lg:px-12 py-10 lg:py-0">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              color: '#A17C7C',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            Ateliê artesanal · Recife
          </motion.p>

          {/* Coroa */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ marginBottom: 16 }}
          >
            <CrownIcon />
          </motion.div>

          {/* Título animado */}
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            color: '#7A5A5A',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            marginBottom: 0,
            minHeight: '1.2em',
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
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            color: '#7A5A5A',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            marginBottom: 20,
            minHeight: '1.2em',
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

          {/* Ícone menina */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            style={{ marginBottom: 20 }}
          >
            <GirlIcon />
          </motion.div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1rem',
              color: '#7A5A5A',
              lineHeight: 1.8,
              marginBottom: 36,
              maxWidth: 320,
            }}
          >
            Vestidos artesanais bordados à mão. Criados com amor para transformar cada momento em uma memória eterna para a sua pequena duquesa.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={createPageUrl("Products")}
              className="inline-block velvet-transition hover:opacity-85"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '0.62rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#FBFAF5',
                background: '#7A5A5A',
                padding: '14px 36px',
                borderRadius: 50,
              }}
              aria-label="Ver coleção completa de vestidos"
            >
              Descobrir Coleção
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Divisor decorativo */}
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