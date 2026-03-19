import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FULL_TITLE = 'Pequena Duquesa';
const PART1 = 'Pequena ';
const PART2 = 'Duquesa';
const CHAR_DELAY = 105;

function useTypewriter(text, startDelay = 700) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, CHAR_DELAY);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, startDelay]);
  return { count, done };
}

function CrownIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 13h18M1 13L3.5 5l5 4.5L10 2l1.5 7.5L16 5l2.5 8" stroke="#B8956A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="1" cy="13" r="0.8" fill="#B8956A"/>
      <circle cx="10" cy="2" r="0.8" fill="#B8956A"/>
      <circle cx="19" cy="13" r="0.8" fill="#B8956A"/>
    </svg>
  );
}

export default function HeroSection() {
  const { count, done } = useTypewriter(FULL_TITLE, 700);
  const p1 = FULL_TITLE.slice(0, Math.min(count, PART1.length));
  const p2 = count > PART1.length ? PART2.slice(0, count - PART1.length) : '';

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAF9F6',
      overflow: 'hidden',
    }}>

      {/* Subtle linen texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        opacity: 0.6,
      }} />

      {/* Very soft radial blush glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(234, 200, 190, 0.18) 0%, transparent 75%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 32px 80px',
        width: '100%',
        maxWidth: 680,
        margin: '0 auto',
      }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.55rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#B8956A',
            marginBottom: 22,
          }}
        >
          Ateliê Artesanal · Recife
        </motion.p>

        {/* Crown */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ marginBottom: 16 }}
        >
          <CrownIcon />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            width: 40, height: '0.5px',
            background: 'linear-gradient(to right, transparent, #C9A882, transparent)',
            marginBottom: 26,
            transformOrigin: 'center',
          }}
        />

        {/* Main title — typewriter */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
          color: '#7A5C58',
          lineHeight: 1.1,
          letterSpacing: '0.04em',
          margin: 0,
          minHeight: '1.15em',
        }}>
          <span style={{ fontStyle: 'normal' }}>{p1}</span>
          <span style={{ fontStyle: 'italic' }}>{p2}</span>
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              style={{ fontStyle: 'normal', fontWeight: 300, color: '#C9A882' }}
            >|</motion.span>
          )}
        </h1>

        {/* Divider below title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            width: 40, height: '0.5px',
            background: 'linear-gradient(to right, transparent, #C9A882, transparent)',
            margin: '22px 0 24px',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
            color: '#A08070',
            lineHeight: 1.85,
            marginBottom: 48,
            maxWidth: 400,
            letterSpacing: '0.01em',
          }}
        >
          Peças bordadas à mão com amor e delicadeza, para a sua pequena princesa.
        </motion.p>

        {/* CTA Button — pill, rosa antigo suave */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
        >
          <Link
            to={createPageUrl("Products")}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FAF9F6',
              background: '#C4937C',
              padding: '15px 44px',
              borderRadius: 999,
              display: 'inline-block',
              boxShadow: '0 3px 18px rgba(180, 130, 110, 0.22)',
              transition: 'background 0.35s, box-shadow 0.35s, transform 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#AF7D65';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 5px 24px rgba(160,110,90,0.28)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#C4937C';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 3px 18px rgba(180,130,110,0.22)';
            }}
          >
            Descobrir Coleção
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1, height: 26,
              background: 'linear-gradient(to bottom, rgba(180,140,120,0.5), transparent)',
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}