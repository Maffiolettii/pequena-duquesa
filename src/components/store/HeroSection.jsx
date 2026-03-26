import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="flex flex-col w-full bg-[#FFFAF0]">
      {/* 1. ÁREA DE TEXTO (Topo com fundo sólido Branco Creme) */}
      <div className="w-full text-center px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Título Principal Conforme sua solicitação */}
          <h1
            className="font-serif leading-tight mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              fontWeight: 400,
              color: '#4A3A3A', // marrom-newsletter
            }}
          >
            Vestidos artesanais bordados a mão
          </h1>

          {/* Subtítulo com o texto exato fornecido */}
          <p
            className="font-serif italic mb-10"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              color: '#6B5252', // texto-suave
              lineHeight: '1.4'
            }}
          >
            criados com amor para transformar cada momento em memoria eterna <br className="hidden md:block"/>
            – para a sua pequena duquesa
          </p>

          {/* Botão Ver Coleção - Estilo Aprimorado */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to={createPageUrl("Products")}
              className="inline-block font-sans uppercase tracking-[0.2em] transition-all"
              style={{
                backgroundColor: '#D4A5A5', // rosa-principal
                border: '1px solid #E2C792', // dourado-antigo
                color: '#FFFFFF',
                padding: '16px 45px',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '50px',
                boxShadow: '0 10px 20px rgba(212, 165, 165, 0.3)',
              }}
            >
              Ver Coleção
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. ÁREA DA IMAGEM (Abaixo do texto, ocupando largura total) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full overflow-hidden" 
        style={{ height: '65vh', minHeight: 400 }}
      >
        <div
          className="w-full h-full bg-cover bg-top"
          style={{
            backgroundImage: "url('https://media.base44.com/images/public/69b06ea4922854e28166d780/c4dad9bb6_IMG_7444.png')",
          }}
          aria-hidden="true"
        />
        
        {/* Overlay sutil para suavizar a transição com o topo creme */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, #FFFAF0 0%, transparent 15%)' 
          }} 
        />
      </motion.div>
    </section>
  );
}