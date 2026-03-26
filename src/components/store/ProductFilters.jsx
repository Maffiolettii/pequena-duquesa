import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'vestidos', name: 'Vestidos' },
  { id: 'conjuntos', name: 'Conjuntos' },
  { id: 'acessorios', name: 'Acessórios' },
  { id: 'calcados', name: 'Calçados' },
];

const COLLECTIONS = [
  { id: 'all', name: 'Todas' },
  { id: 'classica', name: 'Clássica' },
  { id: 'festiva', name: 'Festiva' },
  { id: 'jardim', name: 'Jardim' },
  { id: 'batizado', name: 'Batizado' },
];

function FilterGroup({ items, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className="relative group py-2 outline-none transition-all"
        >
          <span className={`
            font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase transition-colors duration-300
            ${active === item.id ? 'text-[#D4A5A5] font-semibold' : 'text-[#6B5252] opacity-70 group-hover:opacity-100'}
          `}>
            {item.name}
          </span>

          <motion.div
            initial={false}
            animate={{
              width: active === item.id ? '100%' : '0%',
              opacity: active === item.id ? 1 : 0
            }}
            className="absolute bottom-0 left-0 h-[1px] bg-[#D4A5A5]"
            transition={{ duration: 0.3 }}
          />

          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E2C792] group-hover:w-full transition-all duration-300 opacity-30" />
        </button>
      ))}
    </div>
  );
}

export default function ProductFilters({
  activeCategory,
  setActiveCategory,
  activeCollection,
  setActiveCollection,
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <FilterGroup items={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
      <div className="w-8 h-[0.5px] bg-[#E2C792] mx-auto opacity-40" />
      <FilterGroup items={COLLECTIONS} active={activeCollection} onChange={setActiveCollection} />
    </div>
  );
}