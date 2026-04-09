import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Upload, Loader2 } from 'lucide-react';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: 'vestidos',
  collection: 'classica',
  sizes: [],
  image_url: '',
  image_url_2: '',
  image_url_3: '',
  featured: false,
  in_stock: true,
  stock_quantity: 0,
};

const ALL_SIZES = [
  { id: 'RN', label: 'RN', sub: '0-1 mês' },
  { id: 'P baby', label: 'P baby', sub: '2-5 meses' },
  { id: 'M baby', label: 'M baby', sub: '5-7 meses' },
  { id: 'G baby', label: 'G baby', sub: '7-12 meses' },
  { id: '1', label: '1', sub: '' },
  { id: '2', label: '2', sub: '' },
  { id: '3', label: '3', sub: '' },
  { id: '4', label: '4', sub: '' },
  { id: '5', label: '5', sub: '' },
  { id: '6', label: '6', sub: '' },
];

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const [form, setForm] = useState(product ? { ...product } : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const toggleSize = (sizeId) => {
    set('sizes', form.sizes.includes(sizeId)
      ? form.sizes.filter(s => s !== sizeId)
      : [...form.sizes, sizeId]
    );
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      set(field, file_url);
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
      alert('Erro ao enviar imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, price: parseFloat(form.price) };
      if (product) {
        await base44.entities.Product.update(product.id, data);
      } else {
        await base44.entities.Product.create(data);
      }
      onSuccess();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      alert('Erro ao salvar produto. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-[20px] sm:rounded-none" style={{ backgroundColor: '#FBFAF5' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(161,124,124,0.2)' }}>
          <h2 className="text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="p-1 velvet-transition hover:opacity-60">
            <X size={18} color="#A17C7C" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="label-style">Nome do Produto *</label>
            <input required value={form.name} onChange={e => set('name', e.target.value)}
              className="input-style w-full" placeholder="Ex: Vestido Floral com Gola Bordada" />
          </div>

          {/* Description */}
          <div>
            <label className="label-style">Descrição</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={3} className="input-style w-full resize-none" placeholder="Descrição detalhada do produto..." />
          </div>

          {/* Price / Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-style">Preço (R$) *</label>
              <input required type="number" step="0.01" min="0" value={form.price} onChange={e => set('price', e.target.value)}
                className="input-style w-full" placeholder="299.90" />
            </div>
            <div>
              <label className="label-style">Qtd. em Estoque</label>
              <input type="number" min="0" value={form.stock_quantity ?? 0} onChange={e => set('stock_quantity', parseInt(e.target.value) || 0)}
                className="input-style w-full" placeholder="0" />
            </div>
          </div>

          {/* Category / Collection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-style">Categoria *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="input-style w-full">
                <option value="vestidos">Vestidos</option>
                <option value="conjuntos">Conjuntos</option>
                <option value="acessorios">Acessórios</option>
                <option value="calcados">Calçados</option>
                <option value="romper">Romper</option>
              </select>
            </div>
            <div>
              <label className="label-style">Coleção</label>
              <select value={form.collection} onChange={e => set('collection', e.target.value)} className="input-style w-full">
                <option value="classica">Clássica</option>
                <option value="festiva">Festiva</option>
                <option value="jardim">Jardim Encantado</option>
                <option value="batizado">Batizado</option>
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="label-style">Tamanhos Disponíveis</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {ALL_SIZES.map(s => (
                <button key={s.id} type="button" onClick={() => toggleSize(s.id)}
                  className="flex flex-col items-center justify-center px-4 py-2 text-xs velvet-transition border"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    backgroundColor: form.sizes.includes(s.id) ? '#7A5A5A' : 'transparent',
                    color: form.sizes.includes(s.id) ? 'white' : '#A17C7C',
                    borderColor: form.sizes.includes(s.id) ? '#7A5A5A' : 'rgba(161,124,124,0.3)',
                    minWidth: '100px',
                  }}>
                  <span className="font-semibold">{s.label}</span>
                  <span className="text-[10px] opacity-80 mt-0.5">{s.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{ label: 'Imagem Principal', field: 'image_url' }, { label: 'Imagem 2', field: 'image_url_2' }, { label: 'Imagem 3', field: 'image_url_3' }].map(img => (
              <div key={img.field}>
                <label className="label-style">{img.label}</label>
                {form[img.field] && (
                  <img src={form[img.field]} alt="" className="w-full object-contain mb-2" style={{ border: '0.5px solid rgba(161,124,124,0.2)', maxHeight: '280px', backgroundColor: '#faf9f5' }} />
                )}
                <input value={form[img.field]} onChange={e => set(img.field, e.target.value)}
                  className="input-style w-full mb-2" placeholder="URL da imagem" />
                <label className="flex items-center gap-2 text-xs cursor-pointer velvet-transition hover:opacity-70 px-3 py-2 border"
                  style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                  {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                  Fazer Upload
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, img.field)} />
                </label>
              </div>
            ))}
          </div>

          {/* Flags */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs" style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A' }}>
              <input type="checkbox" checked={form.in_stock} onChange={e => set('in_stock', e.target.checked)} />
              Em estoque
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs" style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A' }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
              Produto em destaque
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2 pb-2">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-3 sm:py-2 text-xs tracking-[0.15em] uppercase border velvet-transition hover:opacity-70 min-h-[44px]"
              style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="w-full sm:w-auto px-6 py-3 sm:py-2 text-xs tracking-[0.15em] uppercase velvet-transition hover:opacity-80 flex items-center justify-center gap-2 min-h-[44px]"
              style={{ backgroundColor: '#A17C7C', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
              {saving && <Loader2 size={12} className="animate-spin" />}
              {product ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .label-style { display: block; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #A17C7C; font-family: Montserrat, sans-serif; margin-bottom: 0.4rem; }
        .input-style { background: white; border: 1px solid rgba(161,124,124,0.25); padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #7A5A5A; font-family: Montserrat, sans-serif; outline: none; transition: border-color 0.3s; }
        .input-style:focus { border-color: #A17C7C; }
      `}</style>
    </div>
  );
}