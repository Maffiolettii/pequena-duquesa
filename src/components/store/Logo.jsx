import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Logo({ size = 'md', linkTo = true }) {
  // Ajustamos os tamanhos para serem mais sutis e não criarem vãos no mobile
  const sizes = {
    sm: { img: 32, container: 'h-8' },
    md: { img: 48, container: 'h-12' },
    lg: { img: 64, container: 'h-16' },
    xl: { img: 90, container: 'h-24' },
  };

  const s = sizes[size] || sizes.md;

  const content = (
    <div 
      className={`flex items-center justify-center bg-transparent ${s.container}`} 
      aria-label="Pequena Duquesa - Ir para página inicial"
    >
      <motion.img
        src="https://media.base44.com/images/public/69b06ea4922854e28166d780/4000db67a_logonew.png"
        alt="Pequena Duquesa"
        animate={{ rotate: [-0.5, 0.5, -0.5] }} // Rotação mais suave para não 'vibrar' no mobile
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          height: s.img,
          width: 'auto', // Mantém a proporção correta
          objectFit: 'contain',
          // Removemos o mixBlendMode para evitar o 'fantasma' cinza no fundo creme
          filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.02))', 
          transformOrigin: 'center center',
        }}
      />
    </div>
  );

  if (!linkTo) return content;

  return (
    <Link to={createPageUrl("Home")} className="block transition-opacity hover:opacity-80">
      {content}
    </Link>
  );
}