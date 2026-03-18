import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const WORD_1 = 'Pequena';
const WORD_2 = 'Duquesa';
const CHAR_DELAY = 160;
const START_DELAY_1 = 800;
const START_DELAY_2 = START_DELAY_1 + WORD_1.length * CHAR_DELAY + 380;

function useTypewriter(text, startDelay) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, CHAR_DELAY);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, startDelay]);
  return { displayed, done };
}

function CrownSvg() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
      <path d="M2 25 L6 9 L13 17 L18 3 L23 17 L30 9 L34 25Z"
        stroke="#A17C7C" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="18" cy="2.5" r="1.8" fill="#A17C7C"/>
      <circle cx="5.5" cy="8.5" r="1.8" fill="#A17C7C"/>
      <circle cx="30.5" cy="8.5" r="1.8" fill="#A17C7C"/>
      <rect x="2" y="25" width="32" height="2.5" rx="1.25" fill="#A17C7C" opacity="0.45"/>
    </svg>
  );
}

const IMAGES = {
  main: 'https://media.base44.com/images/public/69b06ea4922854e28166d780/c062c9013_01.jpg',
  secondary1: 'https://media.base44.com/images/public/69b06ea4922854e28166d780/50bf54e2b_02.jpg',
  secondary2: 'https://media.base44.com/images/public/69b06ea4922854e28166d780/7ff190d3b_03.jpg',
};

export default function HeroSection() {
  const { displayed: text1, done: done1 } = useTypewriter(WORD_1, START_DELAY_1);
  const { displayed: text2, done: done2 } = useTypewriter(WORD_2, START_DELAY_2);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex' }}>

      {/* ── LADO ESQUERDO: imagem principal full height ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '52%',
          height: '100%',
          flexShrink: 0,
        }}
        className="hidden lg:block"
      >
        <img
          src={IMAGES.main}
          alt="Vestido artesanal bordado Pequena Duquesa"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* overlay suave para blend com o fundo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 60%, #F9F0F0 100%)',
        }} />
        {/* overlay escuro leve no topo para nav */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, rgba(249,240,240,0.3) 0%, transparent 100%)',
        }} />
      </motion.div>

      {/* ── LADO DIREITO: conteúdo ── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #F9F0F0 0%, #F5E6E6 40%, #EDD8D8 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 6vw',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Círculos decorativos de fundo */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-8%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }} />

        {/* Imagem mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="lg:hidden"
          style={{ marginBottom: 32, marginTop: 80 }}
        >
          <img
            src={IMAGES.main}
            alt="Vestido artesanal"
            style={{ width: '100%', maxHeight: 280, objectFit: 'cover', objectPosition: 'top' }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.36em',
            color: '#A17C7C',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Ateliê Artesanal · Recife
        </motion.p>

        {/* Coroa */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ marginBottom: 12 }}
        >
          <CrownSvg />
        </motion.div>

        {/* Título */}
        <div style={{ marginBottom: 20 }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              color: '#7A4F46',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              margin: 0,
              minHeight: '1.1em',
            }}
          >
            {text1}
            {!done1 && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                style={{ color: '#C49090' }}>|</motion.span>
            )}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              color: '#7A4F46',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              margin: 0,
              minHeight: '1.1em',
            }}
          >
            {text2}
            {done1 && !done2 && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                style={{ fontStyle: 'normal' }}>|</motion.span>
            )}
          </motion.h1>
        </div>

        {/* Linha decorativa */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 48, height: 1,
            backgroundColor: '#C4A0A0',
            marginBottom: 20,
            transformOrigin: 'left',
          }}
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: '#8B6666',
            lineHeight: 1.85,
            marginBottom: 40,
            maxWidth: 300,
          }}
        >
          Vestidos artesanais bordados à mão, criados com amor para transformar cada momento em uma memória eterna.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 20 }}
        >
          <Link
            to={createPageUrl("Products")}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FBFAF5',
              background: '#8B6358',
              padding: '14px 36px',
              display: 'inline-block',
              transition: 'opacity 0.4s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Descobrir Coleção
          </Link>
          <Link
            to={createPageUrl("Contact")}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8B6358',
              borderBottom: '0.5px solid rgba(139,99,88,0.5)',
              paddingBottom: 2,
              transition: 'opacity 0.4s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Fale Conosco
          </Link>
        </motion.div>

        {/* Miniaturas de produto */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          style={{
            position: 'absolute',
            bottom: 32,
            right: 0,
            display: 'flex',
            gap: 10,
            paddingRight: '6vw',
          }}
          className="hidden lg:flex"
        >
          {[IMAGES.secondary1, IMAGES.secondary2].map((src, i) => (
            <div key={i} style={{
              width: 64, height: 80,
              overflow: 'hidden',
              border: '0.5px solid rgba(161,124,124,0.25)',
              background: 'rgba(255,255,255,0.3)',
            }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          ))}
        </motion.div>

      </div>

      {/* Linha vertical decorativa entre as colunas */}
      <div
        className="hidden lg:block"
        style={{
          position: 'absolute',
          left: '52%',
          top: '15%',
          bottom: '15%',
          width: '0.5px',
          background: 'linear-gradient(to bottom, transparent, rgba(161,124,124,0.3) 30%, rgba(161,124,124,0.3) 70%, transparent)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
    </section>
  );
}