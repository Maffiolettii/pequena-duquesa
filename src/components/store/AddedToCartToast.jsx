import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AddedToCartToast({ product, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30, x: 30 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: -20, x: 30 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-24 right-4 z-[200] flex items-center gap-3 shadow-xl"
        style={{
          backgroundColor: '#FFFAF0',
          border: '1px solid rgba(212,165,165,0.4)',
          borderRadius: '16px',
          padding: '14px 16px',
          maxWidth: '320px',
          minWidth: '260px',
        }}
      >
        {/* Imagem do produto */}
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-12 h-16 object-cover flex-shrink-0"
            style={{ borderRadius: '8px', objectPosition: 'center 20%' }}
          />
        )}

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <ShoppingBag size={12} color="#D4A5A5" />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4A5A5' }}>
              Adicionado à sacola
            </span>
          </div>
          <p className="truncate" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: '#7A5A5A' }}>
            {product.name}
          </p>
          <Link
            to={createPageUrl('Cart')}
            onClick={onClose}
            className="inline-block mt-2 text-white text-[9px] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full transition-all"
            style={{ backgroundColor: '#D4A5A5', fontFamily: 'Montserrat, sans-serif' }}
          >
            Ver Sacola
          </Link>
        </div>

        {/* Fechar */}
        <button
          onClick={onClose}
          className="self-start p-1 hover:opacity-60 transition-opacity"
        >
          <X size={14} color="#A17C7C" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}