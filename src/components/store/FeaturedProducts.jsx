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
  const featured = allProducts.filter(p => p.featured).slice(0, 6);

  return (
    <section className="py-20 sm:py-32 px-6" style={{ backgroundColor: '#FBFAF5' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            Curadoria
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
            Peças em Destaque
          </h2>
          <div className="mt-6 mx-auto w-16 h-px" style={{ backgroundColor: '#A17C7C', opacity: 0.3 }} />
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to={createPageUrl("Products")}
            className="inline-block px-8 py-3 text-xs tracking-[0.2em] uppercase velvet-transition gilded-frame hover:bg-[#A17C7C] hover:text-[#FBFAF5]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, color: '#A17C7C' }}
          >
            Ver Toda a Coleção
          </Link>
        </motion.div>
      </div>
    </section>
  );
}