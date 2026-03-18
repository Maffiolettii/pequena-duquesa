import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CHAR_DELAY = 120;
const FULL_TITLE = 'Pequena Duquesa';

function useTypewriter(text, delay = 600) {
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
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return { displayed, done };
}

export default function HeroSection() {
  const { displayed, done } = useTypewriter(FULL_TITLE, 700);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 560,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* IMAGEM DE FUNDO FULL BLEED */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://media.base44.com/images/public/69b06ea4922854e28166d780/c062c9013_01.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
        />
        {/* gradiente escurecendo de baixo + leve véu por cima */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,8,8,0.18) 0%, rgba(20,8,8,0.08) 40%, rgba(20,8,8,0.55) 100%)',
        }} />
        {/* véu rosado sutil */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(180, 110, 110, 0.08)',
        }} />
      </div>

      {/* CONTEÚDO PRINCIPAL — centralizado na tela */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}>

        {/* Tag superior */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.32em' }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '0.55rem',
            letterSpacing: '0.32em',
            color: 'rgba(255,235,230,0.75)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 28,
          }}
        >
          Ateliê Artesanal · Recife · Brasil
        </motion.span>

        {/* Linha decorativa topo */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 40, height: '0.5px',
            background: 'rgba(255,220,210,0.5)',
            marginBottom: 24,
            transformOrigin: 'center',
          }}
        />

        {/* TÍTULO principal */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(3rem, 9vw, 6.5rem)',
          color: '#FFF5F0',
          lineHeight: 1,
          letterSpacing: '0.04em',
          margin: 0,
          marginBottom: 24,
          minHeight: '1em',
          textShadow: '0 2px 32px rgba(0,0,0,0.18)',
        }}>
          {displayed}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.55, repeat: Infinity }}
              style={{ fontStyle: 'normal', color: 'rgba(255,200,190,0.7)' }}
            >|</motion.span>
          )}
        </h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
            color: 'rgba(255,235,228,0.82)',
            lineHeight: 1.8,
            marginBottom: 44,
            maxWidth: 380,
            letterSpacing: '0.04em',
          }}
        >
          Vestidos artesanais bordados à mão, criados com amor para a sua pequena.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            to={createPageUrl("Products")}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FFF5F0',
              background: 'rgba(139,90,80,0.85)',
              padding: '15px 40px',
              display: 'inline-block',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              border: '0.5px solid rgba(255,200,190,0.25)',
              transition: 'background 0.4s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(110,65,55,0.9)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,90,80,0.85)'}
          >
            Ver Coleção
          </Link>

          <Link
            to={createPageUrl("Contact")}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,235,228,0.88)',
              background: 'transparent',
              padding: '15px 40px',
              display: 'inline-block',
              border: '0.5px solid rgba(255,210,200,0.35)',
              transition: 'border-color 0.4s, color 0.4s',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,210,200,0.7)'; e.currentTarget.style.color = '#FFF5F0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,210,200,0.35)'; e.currentTarget.style.color = 'rgba(255,235,228,0.88)'; }}
          >
            Fale Conosco
          </Link>
        </motion.div>
      </div>

      {/* RODAPÉ DO HERO — scroll hint + tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3 }}
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px 28px',
        }}
      >
        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,220,210,0.5)',
        }}>
          Bordado Artesanal
        </span>

        {/* Scroll indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 28,
              background: 'linear-gradient(to bottom, rgba(255,210,200,0.6), transparent)',
            }}
          />
        </div>

        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,220,210,0.5)',
        }}>
          Recife · PE
        </span>
      </motion.div>
    </section>
  );
}