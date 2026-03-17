import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Package, ToggleLeft, ToggleRight } from 'lucide-react';
import ProductFormModal from './ProductFormModal';

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const toggleStock = useMutation({
    mutationFn: (product) => base44.entities.Product.update(product.id, { in_stock: !product.in_stock }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const deleteProduct = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filtered = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'vestidos', label: 'Vestidos' },
    { id: 'conjuntos', label: 'Conjuntos' },
    { id: 'acessorios', label: 'Acessórios' },
    { id: 'calcados', label: 'Calçados' },
  ];

  if (isLoading) {
    return <div className="text-center py-20" style={{ color: '#A17C7C', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.25rem' }}>Carregando produtos...</div>;
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className="text-xs px-4 py-2 tracking-widest uppercase velvet-transition"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                backgroundColor: filterCategory === cat.id ? '#7A5A5A' : 'transparent',
                color: filterCategory === cat.id ? 'white' : '#A17C7C',
                border: '1px solid rgba(161,124,124,0.3)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-5 py-2 text-xs tracking-[0.15em] uppercase velvet-transition hover:opacity-80"
          style={{ backgroundColor: '#A17C7C', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
        >
          <Plus size={14} /> Novo Produto
        </button>
      </div>

      {/* Product List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#A17C7C', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.25rem' }}>
          Nenhum produto cadastrado. Clique em "Novo Produto" para começar.
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {filtered.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-3 border"
                style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-16 h-20 object-cover shrink-0"
                    style={{ border: '0.5px solid rgba(161,124,124,0.2)' }} />
                ) : (
                  <div className="w-16 h-20 flex items-center justify-center shrink-0" style={{ backgroundColor: '#F4E2E2' }}>
                    <Package size={20} color="#A17C7C" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-base truncate" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>
                    {product.name}
                  </p>
                  <p className="text-xs mt-0.5 capitalize" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
                    {product.category || '—'} · {product.collection || '—'}
                  </p>
                  <p className="text-sm mt-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>
                    R$ {Number(product.price).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button onClick={() => toggleStock.mutate(product)} className="velvet-transition hover:opacity-70">
                    {product.in_stock
                      ? <ToggleRight size={24} color="#4A8A4A" />
                      : <ToggleLeft size={24} color="#A17C7C" />
                    }
                  </button>
                  <button onClick={() => handleEdit(product)} className="p-2 velvet-transition hover:opacity-70"
                    style={{ border: '1px solid rgba(161,124,124,0.3)' }}>
                    <Pencil size={14} color="#A17C7C" />
                  </button>
                  <button onClick={() => { if (confirm('Excluir produto?')) deleteProduct.mutate(product.id); }}
                    className="p-2 velvet-transition hover:opacity-70"
                    style={{ border: '1px solid rgba(200,100,100,0.3)' }}>
                    <Trash2 size={14} color="#C06060" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(161,124,124,0.2)' }}>
                  {['Produto', 'Categoria', 'Coleção', 'Preço', 'Tamanhos', 'Estoque', 'Ações'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-xs tracking-[0.15em] uppercase"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id} className="border-b velvet-transition hover:bg-rose-50/30"
                    style={{ borderColor: 'rgba(161,124,124,0.1)' }}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover" style={{ border: '0.5px solid rgba(161,124,124,0.2)' }} />
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#F4E2E2' }}>
                            <Package size={16} color="#A17C7C" />
                          </div>
                        )}
                        <span className="text-sm font-medium max-w-[160px]" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-xs capitalize" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                      {product.category || '—'}
                    </td>
                    <td className="py-3 pr-4 text-xs capitalize" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                      {product.collection || '—'}
                    </td>
                    <td className="py-3 pr-4 text-sm" style={{ color: '#7A5A5A', fontFamily: 'Cormorant Garamond, serif' }}>
                      R$ {Number(product.price).toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-xs" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                      {(product.sizes || []).join(', ') || '—'}
                    </td>
                    <td className="py-3 pr-4">
                      <button onClick={() => toggleStock.mutate(product)} className="velvet-transition hover:opacity-70">
                        {product.in_stock
                          ? <ToggleRight size={22} color="#4A8A4A" />
                          : <ToggleLeft size={22} color="#A17C7C" />
                        }
                      </button>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)} className="p-1.5 velvet-transition hover:opacity-70"
                          style={{ border: '1px solid rgba(161,124,124,0.3)' }}>
                          <Pencil size={13} color="#A17C7C" />
                        </button>
                        <button onClick={() => { if (confirm('Excluir produto?')) deleteProduct.mutate(product.id); }}
                          className="p-1.5 velvet-transition hover:opacity-70"
                          style={{ border: '1px solid rgba(200,100,100,0.3)' }}>
                          <Trash2 size={13} color="#C06060" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showModal && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleClose}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
            handleClose();
          }}
        />
      )}
    </div>
  );
}