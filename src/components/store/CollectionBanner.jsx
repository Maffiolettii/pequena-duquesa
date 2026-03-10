import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CollectionBanner() {
  return (
    <section className="py-20 sm:py-28 px-6" style={{ backgroundColor: '#F4E2E2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="gilded-frame p-4 bg-white/50">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68bc37bca4385f82fa4d811b/e067683c2_photo_4_2026-03-10_14-31-56.jpg"
                alt="Coleção Clássica Pequena Deusa"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            {/* Floating decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#A17C7C]/20 hidden md:block" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-center md:text-left"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
              Nova Coleção
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
              Cada peça conta<br />uma história de amor
            </h2>
            <p className="mt-6 text-sm leading-relaxed max-w-md"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300, letterSpacing: '0.05em' }}>
              Nossas peças são cuidadosamente bordadas à mão por artesãs brasileiras, 
              usando tecidos naturais que respeitam a delicadeza da pele infantil. 
              Cada vestido é uma obra de arte única, feita para ser guardada como herança.
            </p>
            <Link
              to={createPageUrl("Products") + "?collection=classica"}
              className="inline-block mt-8 px-8 py-3 text-xs tracking-[0.2em] uppercase velvet-transition"
              style={{ 
                fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
                color: '#FBFAF5', background: '#A17C7C' 
              }}
            >
              Conhecer a História
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}