import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Logo({ size = 'md', linkTo = true }) {
  const widths = {
    sm: 120,
    md: 180,
    lg: 240,
    xl: 320,
  };

  const currentWidth = widths[size] || widths.md;

  const content = (
    <div 
      className="flex flex-col items-center justify-center bg-transparent py-2" 
      aria-label="Pequena Duquesa - Home"
    >
      <motion.img
        src="https://media.base44.com/images/public/69b06ea4922854e28166d780/4000db67a_logonew.png"
        alt="Pequena Duquesa"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: currentWidth,
          height: 'auto',
          objectFit: 'contain',
          filter: 'contrast(1.05) saturate(1.1)',
        }}
      />
    </div>
  );

  if (!linkTo) return content;

  return (
    <Link to={createPageUrl("Home")} className="block transition-transform hover:scale-[1.02]">
      {content}
    </Link>
  );
}