import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FULL_TITLE_PART1 = 'Pequena ';
const FULL_TITLE_PART2 = 'Duquesa';
const FULL_TITLE = FULL_TITLE_PART1 + FULL_TITLE_PART2;
const CHAR_DELAY = 100;

function useTypewriter(text, startDelay = 600) {
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

// Golden crown SVG
function CrownIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 14h20M1 14L4 5l5.5 5L11 2l1.5 8L18 5l3 9"
        stroke="#C9A96E"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="1" cy="14" r="1" fill="#C9A96E" />
      <circle cx="11" cy="2" r="1" fill="#C9A96E" />
      <circle cx="21" cy="14" r="1" fill="#C9A96E" />
    </svg>
  );
}

export default function HeroSection() {
  const { count, done } = useTypewriter(FULL_TITLE, 800);

  const part1Displayed = FULL_TITLE.slice(0, Math.min(count, FULL_TITLE_PART1.length));
  const part2Displayed = count > FULL_TITLE_PART1.length
    ? FULL_TITLE_PART2.slice(0, count - FULL_TITLE_PART1.length)
    : '';

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAF7F2',
    }}>

      {/* Background image with dreamy white overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600&q=80"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* 80% white overlay for dreamy misty effect */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(250, 246, 240, 0.82)',
        }} />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 32px 80px',
        width: '100%',
        maxWidth: 720,
        margin: '0 auto',
      }}>

        {/* Crown icon */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 20 }}
        >
          <CrownIcon />
        </motion.div>

        {/* Thin decorative line above title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 48,
            height: '0.5px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            marginBottom: 28,
            transformOrigin: 'center',
          }}
        />

        {/* Title with typewriter — "Pequena" normal, "Duquesa" italic */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 400,
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          color: '#4A3728',
          lineHeight: 1.1,
          letterSpacing: '0.02em',
          margin: '0 0 8px 0',
          minHeight: '1.1em',
        }}>
          <span style={{ fontStyle: 'normal' }}>{part1Displayed}</span>
          <span style={{ fontStyle: 'italic' }}>{part2Displayed}</span>
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                color: '#C9A96E',
                marginLeft: 2,
              }}
            >|</motion.span>
          )}
        </h1>

        {/* Thin decorative line below title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 48,
            height: '0.5px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            margin: '24px 0 28px',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: '#9B7D6A',
            lineHeight: 1.9,
            marginBottom: 52,
            maxWidth: 420,
            letterSpacing: '0.01em',
          }}
        >
          Peças artesanais bordadas à mão, criadas com amor e delicadeza para a sua pequena princesa.
        </motion.p>

        {/* CTA Button — pill shape, dusty rose */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={createPageUrl("Products")}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#FFFAF7',
              background: '#C4927A',
              padding: '16px 48px',
              borderRadius: 999,
              display: 'inline-block',
              border: 'none',
              boxShadow: '0 4px 24px rgba(180, 120, 100, 0.22)',
              transition: 'background 0.4s, box-shadow 0.4s, transform 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#B07860';
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(160, 100, 80, 0.32)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#C4927A';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(180, 120, 100, 0.22)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Descobrir Coleção
          </Link>
        </motion.div>

        {/* Bottom eyebrow label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.2 }}
          style={{
            marginTop: 48,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.5rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C4A882',
          }}
        >
          Ateliê Artesanal · Recife · Brasil
        </motion.p>

      </div>
    </section>
  );
}