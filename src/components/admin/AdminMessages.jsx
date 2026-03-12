import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, Phone, CheckCheck, Eye } from 'lucide-react';

const STATUS_COLORS = {
  novo: { bg: '#F4E2E2', color: '#7A5A5A', label: 'Nova' },
  lido: { bg: '#F1E4D1', color: '#7A5A5A', label: 'Lida' },
  respondido: { bg: '#E2EAE2', color: '#4A6A4A', label: 'Respondida' },
};

export default function AdminMessages() {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => base44.entities.ContactMessage.list('-created_date'),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => base44.entities.ContactMessage.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-messages'] }),
  });

  if (isLoading) {
    return <div className="text-center py-20" style={{ color: '#A17C7C', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.25rem' }}>Carregando mensagens...</div>;
  }

  if (messages.length === 0) {
    return <div className="text-center py-20" style={{ color: '#A17C7C', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.25rem' }}>Nenhuma mensagem recebida ainda.</div>;
  }

  return (
    <div className="space-y-4">
      {messages.map(msg => {
        const s = STATUS_COLORS[msg.status] || STATUS_COLORS.novo;
        return (
          <div key={msg.id} className="border p-5 sm:p-6" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-medium" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>
                  {msg.name}
                </h3>
                <div className="flex flex-wrap gap-4 mt-1">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 text-xs hover:opacity-70 velvet-transition"
                    style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                    <Mail size={11} /> {msg.email}
                  </a>
                  {msg.phone && (
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1 text-xs hover:opacity-70 velvet-transition"
                      style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                      <Phone size={11} /> {msg.phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.color, fontFamily: 'Montserrat, sans-serif' }}>
                  {s.label}
                </span>
                <span className="text-xs" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>
                  {new Date(msg.created_date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: '#7A5A5A', fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
              {msg.message}
            </p>

            <div className="flex gap-2 flex-wrap">
              {msg.status === 'novo' && (
                <button
                  onClick={() => updateStatus.mutate({ id: msg.id, status: 'lido' })}
                  className="flex items-center gap-1 text-xs px-3 py-2 border velvet-transition hover:opacity-70"
                  style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <Eye size={12} /> Marcar como Lida
                </button>
              )}
              {msg.status !== 'respondido' && (
                <button
                  onClick={() => updateStatus.mutate({ id: msg.id, status: 'respondido' })}
                  className="flex items-center gap-1 text-xs px-3 py-2 border velvet-transition hover:opacity-70"
                  style={{ borderColor: 'rgba(161,124,124,0.3)', color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <CheckCheck size={12} /> Marcar como Respondida
                </button>
              )}
              <a
                href={`mailto:${msg.email}`}
                className="flex items-center gap-1 text-xs px-3 py-2 velvet-transition hover:opacity-80"
                style={{ backgroundColor: '#A17C7C', color: 'white', fontFamily: 'Montserrat, sans-serif' }}
              >
                <Mail size={12} /> Responder por E-mail
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}