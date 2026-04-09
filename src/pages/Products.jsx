import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/store/ProductCard';
import ProductFilters from '../components/store/ProductFilters';
import NewsletterFooter from '../components/store/NewsletterFooter';

export default function Products() {
  const urlParams = new URLSearchParams(window.location.search);
  const collectionParam = urlParams.get('collection');

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCollection, setActiveCollection] = useState(collectionParam || 'all');

  useEffect(() => {
    if (collectionParam) setActiveCollection(collectionParam);
  }, [collectionParam]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const filtered = products.filter(p => {
    if (p.in_stock === false) return false;
    const catMatch = activeCategory === 'all' || p.category === activeCategory;
    const colMatch = activeCollection === 'all' || p.collection === activeCollection;
    return catMatch && colMatch;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="pt-14 sm:pt-16 pb-10 px-6 text-center" style={{ backgroundColor: '#F4E2E2' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B4F4F' }}>
            Coleção Completa
          </p>
          <h1 className="text-4xl sm:text-6xl"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontStyle: 'italic', color: '#2A1A1A' }}>
            Nossos Vestidos
          </h1>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="py-8 px-6 border-b" style={{ borderColor: 'rgba(161,124,124,0.15)' }}>
        <div className="max-w-7xl mx-auto flex justify-center">
          <ProductFilters
            categories={[
              { id: 'all', name: 'Todos' },
              { id: 'vestidos', name: 'Vestidos' },
              { id: 'conjuntos', name: 'Conjuntos' },
              { id: 'acessorios', name: 'Acessórios' },
              { id: 'calcados', name: 'Calçados' },
              { id: 'romper', name: 'Romper' },
            ]}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12 sm:py-16 px-6" style={{ backgroundColor: '#FBFAF5' }}>
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C', fontSize: '1.25rem' }}>
              Carregando coleção...
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} imgPosition="center 30%" />
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