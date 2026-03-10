import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/store/ProductCard';
import ProductFilters from '../components/store/ProductFilters';
import NewsletterFooter from '../components/store/NewsletterFooter';
import { PRODUCTS } from '../components/store/productData';

export default function Products() {
  const urlParams = new URLSearchParams(window.location.search);
  const collectionParam = urlParams.get('collection');

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCollection, setActiveCollection] = useState(collectionParam || 'all');

  useEffect(() => {
    if (collectionParam) setActiveCollection(collectionParam);
  }, [collectionParam]);

  const filtered = PRODUCTS.filter(p => {
    const catMatch = activeCategory === 'all' || p.category === activeCategory;
    const colMatch = activeCollection === 'all' || p.collection === activeCollection;
    return catMatch && colMatch;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="pt-28 sm:pt-36 pb-12 px-6 text-center" style={{ backgroundColor: '#F4E2E2' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            Coleção Completa
          </p>
          <h1 className="text-4xl sm:text-6xl"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
            Nossos Vestidos
          </h1>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="py-8 px-6 border-b" style={{ borderColor: 'rgba(161,124,124,0.15)' }}>
        <div className="max-w-7xl mx-auto flex justify-center">
          <ProductFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12 sm:py-16 px-6" style={{ backgroundColor: '#FBFAF5' }}>
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C' }}>
                Nenhuma peça encontrada nesta seleção.
              </p>
            </div>
          )}
        </div>
      </div>

      <NewsletterFooter />
    </div>
  );
}