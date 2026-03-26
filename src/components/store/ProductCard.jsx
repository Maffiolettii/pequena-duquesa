import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group flex flex-col"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #EDE3D8',
          overflow: 'hidden',
        }}
      >
        {/* Image */}
        <Link
          to={createPageUrl("ProductDetail") + `?id=${product.id}`}
          aria-label={`Ver detalhes de ${product.name}`}
          className="block overflow-hidden"
          style={{ aspectRatio: '3/4' }}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
            loading="lazy"
          />
        </Link>

        {/* Info */}
        <div className="flex flex-col items-center gap-3 py-5 px-4 text-center">
          <p
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: '0.62rem', color: '#A17C7C', letterSpacing: '0.2em', fontWeight: 400 }}
          >
            {product.name}
          </p>

          <p
            className="font-serif"
            style={{ fontSize: '1.05rem', color: '#5A3E3E', fontWeight: 400 }}
          >
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </p>

          <Link
            to={createPageUrl("ProductDetail") + `?id=${product.id}`}
            className="font-sans uppercase tracking-widest velvet-transition"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              color: '#A17C7C',
              border: '1px solid #A17C7C',
              padding: '7px 22px',
              fontWeight: 400,
            }}
          >
            Ver Mais
          </Link>
        </div>
      </div>
    </motion.div>
  );
}