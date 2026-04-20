import React from 'react';
import { motion } from 'framer-motion';

// ── Mini SVG decorations (same style as HeroSection) ──────────────────────────
const Flower = ({ size = 18, color = '#D4A5A5', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" style={style}>
    <ellipse cx="12" cy="7" rx="2.5" ry="4" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(120 12 12)" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(180 12 12)" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(240 12 12)" />
    <ellipse cx="12" cy="7" rx="2.5" ry="4" transform="rotate(300 12 12)" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SmallFlower = ({ size = 12, color = '#D4A5A5', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1" style={style}>
    <circle cx="8" cy="4" r="1.8" />
    <circle cx="12" cy="8" r="1.8" />
    <circle cx="8" cy="12" r="1.8" />
    <circle cx="4" cy="8" r="1.8" />
    <circle cx="8" cy="8" r="1.5" />
  </svg>
);

const Leaf = ({ size = 20, color = '#C9A77C', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1" style={style}>
    <path d="M10 18 C4 14, 2 8, 6 4 C10 0, 16 4, 14 10 C12 16, 10 18, 10 18Z" />
    <line x1="10" y1="18" x2="10" y2="4" strokeWidth="0.7" />
    <line x1="10" y1="14" x2="7" y2="10" strokeWidth="0.6" />
    <line x1="10" y1="11" x2="13" y2="8" strokeWidth="0.6" />
  </svg>
);

const FairyDust = ({ color = '#C9A77C', style = {} }) => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="0.8" style={style}>
    <circle cx="8" cy="32" r="1.2" />
    <circle cx="15" cy="25" r="0.9" />
    <circle cx="24" cy="18" r="1.5" />
    <circle cx="30" cy="10" r="1" />
    <circle cx="36" cy="5" r="1.1" />
    <path d="M12 20 L12.5 18.5 L13 20 L14.5 20 L13.3 21 L13.8 22.5 L12.5 21.5 L11.2 22.5 L11.7 21 L10.5 20Z" strokeWidth="0.6" />
  </svg>
);

const Butterfly = ({ size = 24, color = '#D4A5A5', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" style={style}>
    <path d="M12 12 C8 8, 2 6, 3 11 C4 16, 10 15, 12 12Z" />
    <path d="M12 12 C16 8, 22 6, 21 11 C20 16, 14 15, 12 12Z" />
    <path d="M12 12 C9 14, 4 16, 5 20 C6 22, 11 20, 12 12Z" />
    <path d="M12 12 C15 14, 20 16, 19 20 C18 22, 13 20, 12 12Z" />
    <line x1="12" y1="10" x2="11" y2="7" strokeWidth="0.8" />
    <line x1="12" y1="10" x2="13" y2="7" strokeWidth="0.8" />
  </svg>
);

// ── Main mailbox SVG illustration ─────────────────────────────────────────────
const MailboxSVG = () => (
  <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '70%', maxWidth: 220, filter: 'drop-shadow(0 8px 24px rgba(212,165,165,0.18))' }}>

    {/* Post */}
    <rect x="75" y="130" width="10" height="85" rx="3" fill="#D4B8A0" stroke="#C9A77C" strokeWidth="1" />

    {/* Box body */}
    <rect x="38" y="80" width="84" height="60" rx="12" fill="#FFFAF0" stroke="#D4A5A5" strokeWidth="1.5" />

    {/* Rounded top (dome) */}
    <path d="M38 92 Q38 68 80 68 Q122 68 122 92" fill="#F8E8EE" stroke="#D4A5A5" strokeWidth="1.5" />

    {/* Mail slot */}
    <rect x="52" y="104" width="56" height="6" rx="3" fill="#F4D5D5" stroke="#C9A77C" strokeWidth="1" />

    {/* Flag */}
    <line x1="122" y1="80" x2="122" y2="105" stroke="#C9A77C" strokeWidth="1.2" />
    <path d="M122 80 L138 86 L122 92Z" fill="#D4A5A5" stroke="#D4A5A5" strokeWidth="0.8" />

    {/* Decorative border on box */}
    <rect x="42" y="84" width="76" height="52" rx="10" fill="none" stroke="#E2C792" strokeWidth="0.6" strokeDasharray="3 3" />

    {/* Small flower on box */}
    <circle cx="80" cy="125" r="3" fill="none" stroke="#D4A5A5" strokeWidth="0.8" />
    <circle cx="80" cy="121" r="1.5" fill="none" stroke="#D4A5A5" strokeWidth="0.8" />
    <circle cx="80" cy="129" r="1.5" fill="none" stroke="#D4A5A5" strokeWidth="0.8" />
    <circle cx="76" cy="125" r="1.5" fill="none" stroke="#D4A5A5" strokeWidth="0.8" />
    <circle cx="84" cy="125" r="1.5" fill="none" stroke="#D4A5A5" strokeWidth="0.8" />

    {/* Envelope peeking out of slot */}
    <rect x="60" y="95" width="40" height="28" rx="3" fill="#FFF0F0" stroke="#D4A5A5" strokeWidth="1" />
    <path d="M60 97 L80 113 L100 97" stroke="#D4A5A5" strokeWidth="1" fill="none" />

    {/* Ground line */}
    <line x1="30" y1="215" x2="130" y2="215" stroke="#E2C792" strokeWidth="0.8" />
    {/* Small grass tufts */}
    <path d="M50 215 Q52 210 54 215" stroke="#C9A77C" strokeWidth="0.8" fill="none" />
    <path d="M70 215 Q72 209 74 215" stroke="#C9A77C" strokeWidth="0.8" fill="none" />
    <path d="M95 215 Q97 211 99 215" stroke="#C9A77C" strokeWidth="0.8" fill="none" />
    <path d="M110 215 Q112 210 114 215" stroke="#C9A77C" strokeWidth="0.8" fill="none" />
  </svg>
);

const floatAnim = (duration = 4, yRange = 6) => ({
  animate: { y: [0, -yRange, 0], rotate: [0, 3, -3, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' },
});

// ── Component ──────────────────────────────────────────────────────────────────
export default function EnchantedMailbox() {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FFFAF0', minHeight: 320, height: '100%' }}>

      {/* Garden decorations — scattered around */}
      <Flower size={20} color="#C9A77C" style={{ position:'absolute', top:'6%', left:'5%', opacity:0.75 }} />
      <Leaf size={18} color="#C9A77C" style={{ position:'absolute', top:'12%', left:'14%', opacity:0.65, transform:'rotate(-25deg)' }} />
      <SmallFlower size={12} color="#D4A5A5" style={{ position:'absolute', top:'4%', left:'28%', opacity:0.7 }} />
      <FairyDust color="#C9A77C" style={{ position:'absolute', top:'3%', left:'42%', opacity:0.65 }} />

      <Flower size={16} color="#D4A5A5" style={{ position:'absolute', top:'8%', right:'8%', opacity:0.7, transform:'rotate(15deg)' }} />
      <Leaf size={14} color="#C9A77C" style={{ position:'absolute', top:'18%', right:'18%', opacity:0.6, transform:'rotate(30deg)' }} />
      <FairyDust color="#D4A5A5" style={{ position:'absolute', top:'5%', right:'32%', opacity:0.6 }} />

      <SmallFlower size={10} color="#C9A77C" style={{ position:'absolute', bottom:'8%', left:'6%', opacity:0.68 }} />
      <Leaf size={20} color="#D4A5A5" style={{ position:'absolute', bottom:'14%', left:'18%', opacity:0.65, transform:'rotate(-15deg)' }} />
      <Flower size={18} color="#C9A77C" style={{ position:'absolute', bottom:'6%', left:'32%', opacity:0.7 }} />

      <SmallFlower size={11} color="#D4A5A5" style={{ position:'absolute', bottom:'10%', right:'10%', opacity:0.7 }} />
      <Leaf size={16} color="#C9A77C" style={{ position:'absolute', bottom:'20%', right:'20%', opacity:0.6, transform:'rotate(20deg)' }} />
      <FairyDust color="#C9A77C" style={{ position:'absolute', bottom:'5%', right:'36%', opacity:0.65 }} />

      <SmallFlower size={9} color="#C9A77C" style={{ position:'absolute', top:'45%', left:'4%', opacity:0.6 }} />
      <SmallFlower size={9} color="#D4A5A5" style={{ position:'absolute', top:'40%', right:'5%', opacity:0.6 }} />

      {/* Animated butterflies */}
      <motion.div style={{ position:'absolute', top:'22%', left:'8%' }} {...floatAnim(5, 6)}>
        <Butterfly size={22} color="#D4A5A5" style={{ opacity:0.72 }} />
      </motion.div>
      <motion.div style={{ position:'absolute', top:'16%', right:'12%' }} {...floatAnim(6.5, 5)}>
        <Butterfly size={18} color="#C9A77C" style={{ opacity:0.65, transform:'scaleX(-1)' }} />
      </motion.div>
      <motion.div style={{ position:'absolute', bottom:'28%', right:'8%' }} {...floatAnim(4.5, 7)}>
        <Butterfly size={16} color="#D4A5A5" style={{ opacity:0.6, transform:'rotate(8deg)' }} />
      </motion.div>

      {/* Centered Mailbox */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4 relative z-10"
      >
        <MailboxSVG />
        <p className="font-serif italic text-center text-base"
          style={{ color: '#7A5A5A', fontSize: '1.05rem', letterSpacing: '0.03em' }}>
          Sua mensagem chegará<br />com carinho
        </p>
      </motion.div>
    </div>
  );
}