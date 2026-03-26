import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 bg-gradient-to-r from-duquesa-creme/40 to-transparent" />

      {/* Conteúdo Animado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-sans text-[0.55rem] tracking-[0.32em] uppercase text-duquesa-dourado mb-5">
          Ateliê Artesanal · Recife
        </p>

        <h2 className="font-serif text-4xl md:text-6xl text-duquesa-sepia mb-4 drop-shadow-sm italic">
          Pequena Duquesa
        </h2>

        <p className="font-serif text-duquesa-sepia/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto italic">
          Peças bordadas à mão com amor e delicadeza, para a sua pequena duquesa.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={createPageUrl("Products")}
            className="bg-duquesa-rosa hover:bg-duquesa-sepia text-white font-sans px-10 py-4 rounded-full tracking-widest transition-colors duration-300 shadow-lg inline-block"
          >
            Descobrir Coleção
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}