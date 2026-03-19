import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Logo({ size = 'md', linkTo = true }) {
  const sizes = {
    sm: { img: 40, container: 'h-10' },
    md: { img: 56, container: 'h-14' },
    lg: { img: 80, container: 'h-20' },
    xl: { img: 120, container: 'h-28' },
  };

  const s = sizes[size] || sizes.md;

  const content = (
    <div className={`flex items-center justify-center ${s.container}`} aria-label="Pequena Duquesa - Ir para página inicial">
      <motion.img
        src="https://media.base44.com/images/public/69b06ea4922854e28166d780/4000db67a_logonew.png"
        alt="Pequena Duquesa"
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          height: s.img,
          width: s.img,
          objectFit: 'contain',
          borderRadius: 0,
          mixBlendMode: 'multiply',
          transformOrigin: 'top center',
        }}
      />
    </div>
  );

  if (!linkTo) return content;

  return (
    <Link to={createPageUrl("Home")} className="velvet-transition hover:opacity-75">
      {content}
    </Link>
  );
}