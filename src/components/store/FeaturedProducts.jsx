import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });
  const products = allProducts.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-16 px-6 bg-[#FFFAF0]">
      <div className="max-w-7xl mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#A17C7C] mb-2">
            Seleção Especial
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#4A3A3A]">
            Destaques da Coleção
          </h2>
          <div className="w-12 h-[1px] bg-[#E2C792] mx-auto mt-4 opacity-50" />
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}