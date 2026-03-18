import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={createPageUrl("ProductDetail") + `?id=${product.id}`}
        className="group block"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <div className="gilded-frame p-3 sm:p-5 bg-white/40 velvet-transition group-hover:shadow-lg group-hover:shadow-rose-100/50">
          <div className="relative overflow-hidden aspect-[3/4]">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover velvet-transition group-hover:scale-105"
              loading="lazy"
            />
            {product.featured && (
              <div className="absolute top-3 left-3 px-3 py-1 text-xs tracking-widest uppercase"
                style={{ background: 'rgba(244, 226, 226, 0.9)', color: '#7A5A5A', fontFamily: 'Montserrat, sans-serif' }}>
                Destaque
              </div>
            )}
          </div>
          <div className="mt-4 sm:mt-5 text-center">
            <h3 className="font-serif text-base sm:text-lg leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
              {product.name}
            </h3>
            <p className="mt-2 text-sm tracking-wider opacity-0 group-hover:opacity-100 velvet-transition"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}