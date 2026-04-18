import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// ── SVG Elements ──────────────────────────────────────────────────────────────

const Butterfly = ({ size = 28, color = '#D4A5A5', style = {} }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 40 30" fill="none" stroke={color} strokeWidth="0.5" style={style}>
    {/* Left wings */}
    <path d="M20 15 C14 8, 4 6, 2 12 C0 18, 10 20, 20 15Z" />
    <path d="M20 15 C15 20, 6 24, 4 20 C2 16, 10 14, 20 15Z" />
    {/* Right wings */}
    <path d="M20 15 C26 8, 36 6, 38 12 C40 18, 30 20, 20 15Z" />
    <path d="M20 15 C25 20, 34 24, 36 20 C38 16, 30 14, 20 15Z" />
    {/* Body */}
    <line x1="20" y1="10" x2="20" y2="22" strokeWidth="0.6" />
    {/* Antennae */}
    <path d="M20 10 C18 6, 15 4, 13 2" strokeWidth="0.4" />
    <path d="M20 10 C22 6, 25 4, 27 2" strokeWidth="0.4" />
    <circle cx="13" cy="2" r="0.8" fill={color} stroke="none" />
    <circle cx="27" cy="2" r="0.8" fill={color} stroke="none" />
    {/* Wing detail lines */}
    <path d="M20 15 C16 11, 10 10, 8 13" strokeWidth="0.3" opacity="0.6" />
    <path d="M20 15 C24 11, 30 10, 32 13" strokeWidth="0.3" opacity="0.6" />
  </svg>
);

const Flower = ({ size = 18, color = '#C9A77C', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="0.5" style={style}>
    <ellipse cx="12" cy="7" rx="2.5" ry="4" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(135 12 12)" />
    <circle cx="12" cy="12" r="2" />
    <line x1="12" y1="14" x2="12" y2="22" strokeWidth="0.5" />
    <path d="M12 19 C10 17, 8 17, 8 19" strokeWidth="0.4" />
  </svg>
);

const SmallFlower = ({ size = 12, color = '#D4A5A5', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="0.5" style={style}>
    <circle cx="8" cy="4" r="1.8" />
    <circle cx="12" cy="8" r="1.8" />
    <circle cx="8" cy="12" r="1.8" />
    <circle cx="4" cy="8" r="1.8" />
    <circle cx="8" cy="8" r="1.5" />
  </svg>
);

const FairyDust = ({ color = '#C9A77C', style = {} }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="0.4" style={style}>
    <circle cx="8" cy="32" r="1" />
    <circle cx="15" cy="25" r="0.6" />
    <circle cx="24" cy="18" r="1.2" />
    <circle cx="30" cy="10" r="0.7" />
    <circle cx="36" cy="5" r="0.9" />
    {/* mini stars */}
    <path d="M12 20 L12.5 18.5 L13 20 L14.5 20 L13.3 21 L13.8 22.5 L12.5 21.5 L11.2 22.5 L11.7 21 L10.5 20Z" strokeWidth="0.3" />
    <path d="M28 28 L28.4 27 L28.8 28 L29.8 28 L29 28.7 L29.3 29.7 L28.4 29.1 L27.5 29.7 L27.8 28.7 L27 28Z" strokeWidth="0.3" />
  </svg>
);

const Leaf = ({ size = 20, color = '#C9A77C', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="0.5" style={style}>
    <path d="M10 18 C4 14, 2 8, 6 4 C10 0, 16 4, 14 10 C12 16, 10 18, 10 18Z" />
    <line x1="10" y1="18" x2="10" y2="4" strokeWidth="0.4" />
    <line x1="10" y1="14" x2="7" y2="10" strokeWidth="0.3" />
    <line x1="10" y1="11" x2="13" y2="8" strokeWidth="0.3" />
    <line x1="10" y1="8" x2="8" y2="6" strokeWidth="0.3" />
  </svg>
);

// ── Float animation ────────────────────────────────────────────────────────────
const floatAnim = (duration = 4, yRange = 6) => ({
  animate: { y: [0, -yRange, 0], rotate: [0, 3, -3, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
});

// ── Main Component ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="flex flex-col w-full bg-[#FFFAF0] relative z-0">
      <div className="w-full text-center px-6 pt-14 pb-10 md:pt-20 md:pb-16 bg-[#FFFAF0] relative overflow-hidden">

        {/* ── Garden decorations ── */}

        {/* Bottom-left cluster */}
        <Flower size={22} color="#C9A77C" style={{ position:'absolute', bottom:'10%', left:'3%', opacity:0.55 }} />
        <Leaf size={18} color="#C9A77C" style={{ position:'absolute', bottom:'18%', left:'7%', opacity:0.4, transform:'rotate(-20deg)' }} />
        <SmallFlower size={10} color="#D4A5A5" style={{ position:'absolute', bottom:'30%', left:'5%', opacity:0.5 }} />
        <FairyDust color="#C9A77C" style={{ position:'absolute', bottom:'5%', left:'12%', opacity:0.5 }} />
        <SmallFlower size={8} color="#C9A77C" style={{ position:'absolute', bottom:'40%', left:'2%', opacity:0.35 }} />
        <Leaf size={14} color="#D4A5A5" style={{ position:'absolute', bottom:'50%', left:'9%', opacity:0.3, transform:'rotate(15deg)' }} />

        {/* Mid-left */}
        <Flower size={14} color="#D4A5A5" style={{ position:'absolute', top:'35%', left:'14%', opacity:0.4, transform:'rotate(-10deg)' }} />
        <FairyDust color="#D4A5A5" style={{ position:'absolute', top:'20%', left:'8%', opacity:0.45 }} />
        <SmallFlower size={9} color="#C9A77C" style={{ position:'absolute', top:'55%', left:'18%', opacity:0.35 }} />

        {/* Top-left */}
        <Flower size={16} color="#C9A77C" style={{ position:'absolute', top:'8%', left:'16%', opacity:0.4, transform:'rotate(10deg)' }} />
        <Leaf size={12} color="#C9A77C" style={{ position:'absolute', top:'15%', left:'22%', opacity:0.35, transform:'rotate(-30deg)' }} />
        <FairyDust color="#C9A77C" style={{ position:'absolute', top:'5%', left:'28%', opacity:0.4 }} />

        {/* Top-right */}
        <Flower size={18} color="#D4A5A5" style={{ position:'absolute', top:'6%', right:'18%', opacity:0.45, transform:'rotate(-15deg)' }} />
        <Leaf size={14} color="#C9A77C" style={{ position:'absolute', top:'14%', right:'24%', opacity:0.35, transform:'rotate(25deg)' }} />
        <FairyDust color="#D4A5A5" style={{ position:'absolute', top:'3%', right:'30%', opacity:0.4 }} />
        <SmallFlower size={10} color="#D4A5A5" style={{ position:'absolute', top:'22%', right:'14%', opacity:0.4 }} />

        {/* Mid-right */}
        <Flower size={15} color="#C9A77C" style={{ position:'absolute', top:'40%', right:'10%', opacity:0.4, transform:'rotate(8deg)' }} />
        <FairyDust color="#C9A77C" style={{ position:'absolute', top:'25%', right:'6%', opacity:0.45 }} />
        <Leaf size={16} color="#D4A5A5" style={{ position:'absolute', top:'55%', right:'16%', opacity:0.3, transform:'rotate(-20deg)' }} />

        {/* Bottom-right cluster */}
        <Flower size={20} color="#D4A5A5" style={{ position:'absolute', bottom:'12%', right:'5%', opacity:0.5 }} />
        <Leaf size={18} color="#C9A77C" style={{ position:'absolute', bottom:'22%', right:'9%', opacity:0.4, transform:'rotate(20deg)' }} />
        <SmallFlower size={11} color="#C9A77C" style={{ position:'absolute', bottom:'35%', right:'4%', opacity:0.45 }} />
        <FairyDust color="#D4A5A5" style={{ position:'absolute', bottom:'8%', right:'18%', opacity:0.5 }} />
        <SmallFlower size={8} color="#D4A5A5" style={{ position:'absolute', bottom:'48%', right:'20%', opacity:0.3 }} />

        {/* ── Animated butterflies ── */}
        <motion.div style={{ position:'absolute', top:'12%', left:'30%' }} {...floatAnim(5, 7)}>
          <Butterfly size={22} color="#D4A5A5" style={{ opacity:0.55 }} />
        </motion.div>
        <motion.div style={{ position:'absolute', bottom:'25%', left:'22%' }} {...floatAnim(6.5, 5)}>
          <Butterfly size={18} color="#C9A77C" style={{ opacity:0.45, transform:'rotate(-10deg)' }} />
        </motion.div>
        <motion.div style={{ position:'absolute', top:'18%', right:'28%' }} {...floatAnim(4.5, 8)}>
          <Butterfly size={26} color="#D4A5A5" style={{ opacity:0.5, transform:'scaleX(-1)' }} />
        </motion.div>
        <motion.div style={{ position:'absolute', bottom:'20%', right:'32%' }} {...floatAnim(7, 6)}>
          <Butterfly size={16} color="#C9A77C" style={{ opacity:0.4, transform:'rotate(8deg) scaleX(-1)' }} />
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h1
            className="font-serif leading-tight mb-5"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 3.5rem)', color: '#2A1A1A' }}
          >
            Vestidos artesanais <br className="md:hidden"/> bordados a mão
          </h1>

          <p
            className="font-serif italic mb-8 px-4 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.4rem)', color: '#4A3030', lineHeight: '1.4' }}
          >
            criados com amor para transformar cada momento em memória eterna – para a sua pequena duquesa
          </p>

          <Link
            to={createPageUrl("Products")}
            className="inline-block font-sans uppercase bg-[#D4A5A5] hover:bg-[#4A3A3A] text-white py-4 px-12 text-[0.7rem] rounded-full transition-all duration-300 shadow-sm" style={{ letterSpacing: '0.1em' }}
          >
            Ver Coleção
          </Link>
        </motion.div>
      </div>

      {/* Container da Imagem:
          Aumentamos um pouco a altura (45vh) para não parecer "esmagada" 
          e adicionamos arredondamento nas laterais em telas grandes.
      */}
      <div className="relative w-full px-0 md:px-10">
        <div 
          className="relative w-full overflow-hidden rounded-b-[40px] md:rounded-[40px] shadow-sm" 
          style={{ height: '45vh', minHeight: 320 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://media.base44.com/images/public/69b06ea4922854e28166d780/c4dad9bb6_IMG_7444.png')",
              backgroundPosition: 'center 40%' 
            }} 
          />
          {/* Degradê sutil para fusão suave com o fundo creme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFAF0]/40 via-transparent to-transparent h-20" />
        </div>
      </div>
    </section>
  );
}