import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Logo({ size = 'md', linkTo = true }) {
  // Aumentamos os valores para a logo não ficar "sumida"
  const sizes = {
    sm: { img: 50 },
    md: { img: 75 },
    lg: { img: 110 },
    xl: { img: 150 },
  };

  const s = sizes[size] || sizes.md;

  const content = (
    <div 
      className="flex items-center justify-center bg-transparent w-full" 
      aria-label="Pequena Duquesa - Ir para página inicial"
    >
      <motion.img
        src="https://media.base44.com/images/public/69b06ea4922854e28166d780/4000db67a_logonew.png"
        alt="Pequena Duquesa"
        animate={{ opacity: [0.9, 1, 0.9] }} // Pulsação sutil em vez de rotação para mobile
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          height: 'auto',
          width: s.img, // Define a largura para ser proporcional
          maxWidth: '100%',
          objectFit: 'contain',
          // Aumenta o contraste e nitidez da logo que estava apagada
          filter: 'contrast(1.1) saturate(1.1) drop-shadow(0px 2px 8px rgba(0,0,0,0.05))',
          mixBlendMode: 'normal', // Removemos o multiply que "apagava" a logo no fundo creme
        }}
      />
    </div>
  );

  if (!linkTo) return content;

  return (
    <Link to={createPageUrl("Home")} className="block py-2 transition-transform hover:scale-105">
      {content}
    </Link>
  );
}