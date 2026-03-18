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
      <img
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b06ea4922854e28166d780/60920f0e2_photo_2026-03-10_16-45-11.jpg"
        alt="Pequena Duquesa"
        style={{
          height: s.img,
          width: s.img,
          objectFit: 'cover',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
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