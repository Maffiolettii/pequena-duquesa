import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CollectionBanner() {
  return (
    /* Ajustamos o fundo para o Rosa Pastel da marca (#F8E8EE) para suavizar a transição */
    <section className="pt-24 sm:pt-32 pb-24 sm:pb-32 px-6" style={{ backgroundColor: '#F8E8EE' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Esquerda - Imagem com Moldura Arredondada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Padronizamos as bordas arredondadas (20px) e o respiro interno */}
            <div className="p-3 bg-white/40 rounded-[25px] shadow-sm backdrop-blur-sm">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68bc37bca4385f82fa4d811b/e067683c2_photo_4_2026-03-10_14-31-56.jpg"
                alt="Coleção Clássica Pequena Duquesa"
                className="w-full aspect-[3/4] object-contain object-center rounded-[20px]"
                style={{ padding: '12px' }}
              />
            </div>
            {/* Detalhe Decorativo sutil */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-[#D4A5A5]/30 rounded-bl-[40px] hidden md:block" />
          </motion.div>

          {/* Direita - Conteúdo com Tipografia Alinhada */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B5252' }}>
              Tradição e Delicadeza
            </p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4A3A3A' }}>
              Cada peça conta uma <br className="hidden lg:block" /> 
              <span className="italic">história de amor</span>
            </h2>
            
            <p className="mt-8 text-sm md:text-base leading-relaxed max-w-md text-[#6B5252]"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, letterSpacing: '0.03em' }}>
              Nossas peças são cuidadosamente bordadas à mão, usando tecidos naturais 
              que respeitam a delicadeza da pele infantil. Cada vestido é uma obra 
              única para ser guardada como herança.
            </p>

            <Link
              to={createPageUrl("Products") + "?collection=classica"}
              className="inline-block mt-10 px-12 py-4 text-[10px] tracking-[0.25em] uppercase rounded-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              style={{ 
                fontFamily: 'Montserrat, sans-serif', 
                color: '#FFFFFF', 
                background: '#D4A5A5' 
              }}
            >
              Conhecer a Coleção
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}