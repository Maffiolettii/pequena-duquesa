import React from 'react';
import { COLLECTIONS } from './productData';

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'vestidos', name: 'Vestidos' },
  { id: 'conjuntos', name: 'Conjuntos' },
];

export default function ProductFilters({ activeCategory, setActiveCategory, activeCollection, setActiveCollection }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
      {/* Category Filter */}
      <div className="flex items-center gap-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="velvet-transition min-h-[44px] px-1 relative"
            style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: activeCategory === cat.id ? 'italic' : 'normal',
            fontWeight: 400,
            fontSize: '0.95rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: activeCategory === cat.id ? '#7A5C58' : '#B8957A',
            }}
          >
            {cat.name}
            {activeCategory === cat.id && (
              <div className="absolute bottom-2 left-0 right-0 h-px" style={{ backgroundColor: '#A17C7C' }} />
            )}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'rgba(161,124,124,0.3)' }} />

      {/* Collection Filter */}
      <div className="flex items-center gap-6 flex-wrap justify-center">
        <button
          onClick={() => setActiveCollection('all')}
          className="text-xs tracking-[0.15em] uppercase velvet-transition min-h-[44px] px-1 relative"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: activeCollection === 'all' ? 400 : 300,
            color: activeCollection === 'all' ? '#7A5A5A' : '#A17C7C',
          }}
        >
          Todas
          {activeCollection === 'all' && (
            <div className="absolute bottom-2 left-0 right-0 h-px" style={{ backgroundColor: '#A17C7C' }} />
          )}
        </button>
        {COLLECTIONS.map(col => (
          <button
            key={col.id}
            onClick={() => setActiveCollection(col.id)}
            className="text-xs tracking-[0.15em] uppercase velvet-transition min-h-[44px] px-1 relative"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: activeCollection === col.id ? 400 : 300,
              color: activeCollection === col.id ? '#7A5A5A' : '#A17C7C',
            }}
          >
            {col.name}
            {activeCollection === col.id && (
              <div className="absolute bottom-2 left-0 right-0 h-px" style={{ backgroundColor: '#A17C7C' }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}