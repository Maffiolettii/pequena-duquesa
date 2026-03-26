import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });
  const featured = allProducts.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-14 sm:py-20 px-6" style={{ backgroundColor: '#FBFAF5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, color: '#5A3E3E', letterSpacing: '0.01em' }}
          >
            Destaques da Coleção: Estilo Atemporal.
          </h2>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            to={createPageUrl("Products")}
            className="inline-block font-sans uppercase tracking-widest velvet-transition"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              color: '#A17C7C',
              border: '1px solid #A17C7C',
              padding: '10px 28px',
            }}
          >
            Ver Coleção Completa
          </Link>
        </motion.div>
      </div>
    </section>
  );
}