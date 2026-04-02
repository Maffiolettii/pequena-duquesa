import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProductCard({ product, index = 0, imgPosition = 'center 15%' }) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      /* Adicionamos mb-12 para garantir que uma linha de produtos não cole na outra */
      className="group flex flex-col items-center w-full mb-12"
    >
      <Link
        to={createPageUrl("ProductDetail") + `?id=${product.id}`}
        className="w-full flex flex-col items-center"
      >
        {/* CONTAINER DA IMAGEM - Bordas arredondadas de 20px conforme o padrão */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[20px] bg-[#FDFDF2] shadow-sm transition-all duration-500 group-hover:shadow-lg">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
            style={{ objectPosition: imgPosition }}
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-[#FFFAF0]/90 backdrop-blur-sm text-[#A17C7C] text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-[#E2C792]/20">
              Novo
            </span>
          )}
        </div>

        {/* INFO DO PRODUTO - Aumentamos o mt (margin-top) para respirar */}
        <div className="mt-6 text-center px-2">
          <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#4A3A3A] font-semibold mb-2 opacity-90">
            {product.name}
          </h3>

          <p className="font-serif italic text-base md:text-lg text-[#6B5252] mb-5">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price)}
          </p>

          {/* BOTÃO PADRONIZADO - Rosa Duquesa com hover Marrom */}
          <div className="inline-block bg-[#D4A5A5] group-hover:bg-[#4A3A3A] text-white font-sans text-[8px] md:text-[9px] uppercase tracking-[0.25em] px-10 py-3 rounded-full transition-all duration-300 shadow-sm transform group-hover:-translate-y-1">
            Ver Detalhes
          </div>
        </div>
      </Link>
    </motion.div>
  );
}