import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const WORD_1 = 'Pequena';
const WORD_2 = 'Duquesa';
const CHAR_DELAY = 180;
const START_DELAY_1 = 600;
const START_DELAY_2 = START_DELAY_1 + WORD_1.length * CHAR_DELAY + 400;

function useTypewriter(text, startDelay) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
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

function CrownIcon() {
  return (
    <svg width="48" height="38" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 33 L8 13 L17 23 L24 4 L31 23 L40 13 L45 33 Z"
        stroke="#8B6358" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="24" cy="3.5" r="2" fill="#8B6358"/>
      <circle cx="7.5" cy="12.5" r="2" fill="#8B6358"/>
      <circle cx="40.5" cy="12.5" r="2" fill="#8B6358"/>
      <rect x="3" y="33" width="42" height="3.5" rx="1.75" fill="#8B6358" opacity="0.5"/>
    </svg>
  );
}

function GirlIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="36" r="16" stroke="#8B6358" strokeWidth="1.8" fill="none"/>
      <path d="M16 32 Q16 18 32 18 Q48 18 48 32" stroke="#8B6358" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M24 18 Q28 14 32 18 Q36 14 40 18" stroke="#8B6358" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="32" cy="18" r="1.8" fill="#8B6358"/>
      <circle cx="26" cy="35" r="2" fill="#8B6358"/>
      <circle cx="38" cy="35" r="2" fill="#8B6358"/>
      <path d="M25 43 Q32 49 39 43" stroke="#8B6358" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="21" cy="39" r="3" fill="#E8A0A0" opacity="0.35"/>
      <circle cx="43" cy="39" r="3" fill="#E8A0A0" opacity="0.35"/>
    </svg>
  );
}

const DRESS_IMAGE = 'https://media.base44.com/images/public/69b06ea4922854e28166d780/c062c9013_01.jpg';

export default function HeroSection() {
  const { displayed: text1, done: done1 } = useTypewriter(WORD_1, START_DELAY_1);
  const { displayed: text2, done: done2 } = useTypewriter(WORD_2, START_DELAY_2);

  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden">

      {/* Background rosado */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 65% 50%, #f9e4e4 0%, #f3d5d5 45%, #eedada 100%)',
      }} />

      {/* Bokeh decorativo */}
      {[
        { top: '12%', left: '58%', size: 100, op: 0.2 },
        { top: '55%', left: '72%', size: 140, op: 0.13 },
        { top: '25%', left: '82%', size: 70, op: 0.16 },
        { top: '75%', left: '45%', size: 100, op: 0.1 },
        { top: '8%', left: '35%', size: 60, op: 0.13 },
        { top: '85%', left: '20%', size: 80, op: 0.09 },
        { top: '40%', left: '10%', size: 55, op: 0.1 },
      ].map((b, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          top: b.top, left: b.left,
          width: b.size, height: b.size,
          backgroundColor: `rgba(255,255,255,${b.op})`,
          filter: 'blur(22px)',
        }} />
      ))}

      {/* Layout split */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-screen px-6 pt-20">

        {/* Coluna esquerda — vestido */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[48%] flex items-end justify-center lg:justify-start self-end"
          style={{ paddingTop: '6rem' }}
        >
          <img
            src={DRESS_IMAGE}
            alt="Vestido artesanal Pequena Duquesa"
            className="object-contain object-bottom w-full"
            style={{
              maxHeight: '82vh',
              maxWidth: 420,
              filter: 'drop-shadow(0 24px 48px rgba(120,70,70,0.15))',
            }}
          />
        </motion.div>

        {/* Coluna direita — conteúdo */}
        <div className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left py-16 lg:py-0 lg:pl-14">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.38em',
              color: '#8B6358',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            Ateliê artesanal · Recife
          </motion.p>

          {/* Coroa */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            style={{ marginBottom: 14 }}
          >
            <CrownIcon />
          </motion.div>

          {/* Título animado */}
          <div style={{ marginBottom: 10 }}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(3.2rem, 7.5vw, 5.2rem)',
              color: '#7A4F46',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
              minHeight: '1.15em',
            }}>
              {text1}
              {!done1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ color: '#A17C7C', fontStyle: 'normal' }}
                >|</motion.span>
              )}
            </h1>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(3.2rem, 7.5vw, 5.2rem)',
              color: '#7A4F46',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
              minHeight: '1.15em',
            }}>
              {text2}
              {done1 && !done2 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ fontStyle: 'normal' }}
                >|</motion.span>
              )}
            </h1>
          </div>

          {/* Ícone menina */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.6 }}
            style={{ marginBottom: 18 }}
          >
            <GirlIcon />
          </motion.div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.05rem',
              color: '#7A5A5A',
              lineHeight: 1.9,
              marginBottom: 38,
              maxWidth: 330,
            }}
          >
            Vestidos artesanais bordados à mão. Criados com amor para transformar cada momento em uma memória eterna para a sua pequena duquesa.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={createPageUrl("Products")}
              className="inline-block velvet-transition hover:opacity-85"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#FBFAF5',
                background: '#7A4F46',
                padding: '15px 40px',
                borderRadius: 50,
              }}
              aria-label="Ver coleção completa de vestidos"
            >
              Descobrir Coleção
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Divisor base */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none">
        <div style={{ width: '60%', height: '0.5px', backgroundColor: 'rgba(161,100,100,0.2)' }} />
        <div className="flex items-center gap-4 py-3">
          <div style={{ width: 36, height: '0.5px', backgroundColor: 'rgba(161,100,100,0.3)' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'rgba(161,100,100,0.35)' }} />
          <div style={{ width: 36, height: '0.5px', backgroundColor: 'rgba(161,100,100,0.3)' }} />
        </div>
      </div>
    </section>
  );
}