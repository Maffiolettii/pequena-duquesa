import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedProducts() {
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });
  const products = allProducts.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-16 px-6 bg-[#FFFAF0]">
      <div className="max-w-7xl mx-auto">
        {/* Título da Seção - Estilo Atemporal */}
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
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={createPageUrl("ProductDetail") + `?id=${product.id}`} className="block">
                {/* Container da Imagem */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-white shadow-sm transition-shadow group-hover:shadow-md">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info do Produto */}
                <div className="mt-6 text-center">
                  <h3 className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#4A3A3A] font-medium mb-2">
                    {product.name}
                  </h3>
                  <p className="font-serif italic text-lg text-[#6B5252]">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </p>
                  <div className="mt-4 inline-block font-sans text-[9px] tracking-[0.2em] uppercase border-b border-[#E2C792] pb-1 text-[#A17C7C] group-hover:text-[#D4A5A5] transition-colors">
                    Ver Detalhes
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}