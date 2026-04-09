import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, AlertTriangle, Clock, Loader2, Sparkles, RefreshCw, Check } from 'lucide-react';

const STATUS_CONFIG = {
  ok: { icon: CheckCircle, color: '#4A8A4A', bg: '#E8F4E8', label: 'Descrição OK' },
  inconsistent: { icon: AlertTriangle, color: '#C06060', bg: '#F4E8E8', label: 'Inconsistente' },
  pending_review: { icon: Clock, color: '#A17C7C', bg: '#F4EEE8', label: 'Pendente' },
  analyzing: { icon: Loader2, color: '#7A7AC0', bg: '#EEE8F4', label: 'Analisando...' },
};

export default function ProductAIValidation({ product, onDescriptionApproved }) {
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [localProduct, setLocalProduct] = useState(product);

  const status = localProduct.description_validation_status || 'pending_review';
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending_review;
  const Icon = config.icon;

  const handleAnalyze = async () => {
    setLoading(true);
    setLocalProduct(p => ({ ...p, description_validation_status: 'analyzing' }));
    const res = await base44.functions.invoke('analyzeProductImage', { product_id: product.id });
    setLocalProduct(p => ({
      ...p,
      description_validation_status: res.data.status,
      inconsistency_details: res.data.inconsistency_details,
      suggested_description: res.data.suggested_description,
    }));
    setLoading(false);
  };

  const handleApprove = async () => {
    setApproving(true);
    await base44.entities.Product.update(product.id, {
      description: localProduct.suggested_description,
      description_validation_status: 'ok',
    });
    setLocalProduct(p => ({
      ...p,
      description: p.suggested_description,
      description_validation_status: 'ok',
    }));
    setApproving(false);
    if (onDescriptionApproved) onDescriptionApproved(localProduct.suggested_description);
  };

  return (
    <div className="border rounded-none p-4 space-y-3" style={{ borderColor: 'rgba(161,124,124,0.25)', backgroundColor: '#FBFAF5' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={13} color="#A17C7C" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            Análise IA
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ backgroundColor: config.bg }}>
          <Icon size={11} color={config.color} className={status === 'analyzing' ? 'animate-spin' : ''} />
          <span className="text-[10px] font-medium" style={{ color: config.color, fontFamily: 'Montserrat, sans-serif' }}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Inconsistency details */}
      {localProduct.inconsistency_details && status !== 'analyzing' && (
        <div className="text-xs leading-relaxed p-3" style={{
          backgroundColor: status === 'inconsistent' ? '#FEF2F2' : '#F0FDF4',
          borderLeft: `3px solid ${config.color}`,
          color: '#4A2A2A',
          fontFamily: 'Montserrat, sans-serif',
        }}>
          {localProduct.inconsistency_details}
        </div>
      )}

      {/* Suggested description */}
      {localProduct.suggested_description && status !== 'analyzing' && (
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            Descrição Sugerida
          </p>
          <p className="text-xs leading-relaxed italic" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#5A3A3A', fontSize: '0.875rem' }}>
            "{localProduct.suggested_description}"
          </p>
          {localProduct.suggested_description !== localProduct.description && (
            <button
              onClick={handleApprove}
              disabled={approving}
              className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[0.1em] velvet-transition hover:opacity-80"
              style={{ backgroundColor: '#A17C7C', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
            >
              {approving ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
              Aprovar e Aplicar
            </button>
          )}
        </div>
      )}

      {/* Analyze button */}
      {product.image_url && (
        <button
          onClick={handleAnalyze}
          disabled={loading || status === 'analyzing'}
          className="flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.1em] border velvet-transition hover:opacity-70 disabled:opacity-40"
          style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}
        >
          {loading || status === 'analyzing'
            ? <Loader2 size={11} className="animate-spin" />
            : <RefreshCw size={11} />}
          {status === 'pending_review' ? 'Analisar Imagem' : 'Re-analisar'}
        </button>
      )}
    </div>
  );
}