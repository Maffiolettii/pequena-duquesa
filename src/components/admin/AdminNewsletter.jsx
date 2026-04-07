import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, Plus, Loader2, Upload, CheckCircle2, Trash2 } from 'lucide-react';

const EMPTY = { subject: '', message: '', image_url: '' };

export default function AdminNewsletter() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(null);

  const { data: campaigns = [] } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => base44.entities.NewsletterCampaign.list('-created_date'),
  });

  const { data: subscribers = [] } = useQuery({
    queryKey: ['subscribers'],
    queryFn: () => base44.entities.NewsletterSubscriber.list(),
  });

  const saveCampaign = useMutation({
    mutationFn: (data) => base44.entities.NewsletterCampaign.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      setForm(EMPTY);
      setShowForm(false);
    },
  });

  const deleteCampaign = useMutation({
    mutationFn: (id) => base44.entities.NewsletterCampaign.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campaigns'] }),
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, image_url: file_url }));
    setUploading(false);
  };

  const handleSend = async (campaign) => {
    if (!confirm(`Enviar "${campaign.subject}" para ${subscribers.length} inscritos?`)) return;
    setSending(campaign.id);
    await base44.functions.invoke('sendNewsletter', { campaignId: campaign.id });
    queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    setSending(null);
  };

  const labelStyle = { fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A17C7C', display: 'block', marginBottom: '0.4rem' };
  const inputStyle = { background: 'white', border: '1px solid rgba(161,124,124,0.25)', padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: '#7A5A5A', fontFamily: 'Montserrat, sans-serif', outline: 'none', width: '100%' };

  return (
    <div>
      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="px-4 py-3 border" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A17C7C' }}>Inscritos</p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', color: '#7A5A5A' }}>{subscribers.length}</p>
        </div>
        <div className="px-4 py-3 border" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A17C7C' }}>Enviadas</p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', color: '#7A5A5A' }}>{campaigns.filter(c => c.status === 'enviado').length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase hover:opacity-80 velvet-transition ml-auto"
          style={{ backgroundColor: '#A17C7C', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
        >
          <Plus size={14} /> Nova Campanha
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 border" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: '#FBFAF5' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontStyle: 'italic', color: '#7A5A5A', marginBottom: '1.5rem' }}>Nova Campanha</h3>
          <div className="space-y-4">
            <div>
              <label style={labelStyle}>Assunto do E-mail</label>
              <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={inputStyle} placeholder="Ex: Nova Coleção Primavera chegou! 🌸" />
            </div>
            <div>
              <label style={labelStyle}>Mensagem</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'none' }} placeholder="Olá, querida! Temos novidades incríveis para você..." />
            </div>
            <div>
              <label style={labelStyle}>Imagem (opcional)</label>
              {form.image_url && (
                <img src={form.image_url} alt="" className="mb-2 rounded-lg object-cover" style={{ maxHeight: '200px', maxWidth: '100%' }} />
              )}
              <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} style={{ ...inputStyle, marginBottom: '0.5rem' }} placeholder="URL da imagem ou faça upload" />
              <label className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity px-3 py-2 border w-fit"
                style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem' }}>
                {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                Upload de Imagem
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setShowForm(false); setForm(EMPTY); }}
                className="px-5 py-2 text-xs tracking-[0.15em] uppercase border velvet-transition hover:opacity-70"
                style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                Cancelar
              </button>
              <button onClick={() => saveCampaign.mutate(form)} disabled={!form.subject || !form.message || saveCampaign.isPending}
                className="px-5 py-2 text-xs tracking-[0.15em] uppercase velvet-transition hover:opacity-80 flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: '#A17C7C', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
                {saveCampaign.isPending && <Loader2 size={12} className="animate-spin" />}
                Salvar Rascunho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign List */}
      {campaigns.length === 0 ? (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C', fontSize: '1.1rem', textAlign: 'center', padding: '3rem 0' }}>
          Nenhuma campanha criada ainda.
        </p>
      ) : (
        <div className="space-y-3">
          {campaigns.map(c => (
            <div key={c.id} className="p-4 border" style={{ borderColor: 'rgba(161,124,124,0.15)', backgroundColor: 'white' }}>
              <div className="flex items-start gap-3">
                {c.image_url && (
                  <img src={c.image_url} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: '#7A5A5A' }}>{c.subject}</p>
                  <p className="truncate text-xs mt-0.5" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>{c.message}</p>
                  {c.status === 'enviado' && (
                    <p className="flex items-center gap-1 mt-1" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', color: '#4A8A4A' }}>
                      <CheckCircle2 size={11} /> Enviado para {c.recipients_count} · {new Date(c.sent_at).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
                <button onClick={() => { if (confirm('Excluir campanha?')) deleteCampaign.mutate(c.id); }}
                  className="p-2 velvet-transition hover:opacity-70 border shrink-0"
                  style={{ borderColor: 'rgba(200,100,100,0.3)' }}>
                  <Trash2 size={13} color="#C06060" />
                </button>
              </div>
              {c.status !== 'enviado' && (
                <div className="mt-3 flex justify-end">
                  <button onClick={() => handleSend(c)} disabled={sending === c.id}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs tracking-[0.12em] uppercase velvet-transition hover:opacity-80 disabled:opacity-50"
                    style={{ backgroundColor: '#D4A5A5', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
                    {sending === c.id ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                    Enviar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}