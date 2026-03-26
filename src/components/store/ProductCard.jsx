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
      transition={{ duration: 1.1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={createPageUrl("ProductDetail") + `?id=${product.id}`}
        className="group block"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        {/* Card container */}
        <div
          className="velvet-transition group-hover:shadow-lg"
          style={{
            backgroundColor: '#FAF9F6',
            border: '0.5px solid rgba(201,167,124,0.15)',
            overflow: 'hidden',
            transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,167,124,0.5)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,167,124,0.15)'}
        >
          {/* Image — 4:5 aspect ratio */}
          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', padding: '12px 12px 0' }}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
              className="group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Featured badge */}
            {product.featured && (
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                padding: '4px 12px',
                backgroundColor: '#C4937C',
                color: '#FAF9F6',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontSize: '0.45rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                borderRadius: 999,
              }}>
                Destaque
              </div>
            )}
          </div>

          {/* Text info */}
          <div style={{ padding: '16px 16px 20px', textAlign: 'center' }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.05rem',
              color: '#7A5C58',
              lineHeight: 1.3,
              margin: '0 0 8px',
              letterSpacing: '0.01em',
            }}>
              {product.name}
            </h3>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '0.75rem',
              color: '#A08070',
              letterSpacing: '0.08em',
              margin: 0,
            }}>
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}