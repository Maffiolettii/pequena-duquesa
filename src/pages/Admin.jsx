import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AdminProducts from '../components/admin/AdminProducts';
import AdminMessages from '../components/admin/AdminMessages';
import AdminNewsletter from '../components/admin/AdminNewsletter';
import { Package, MessageSquare, Mail } from 'lucide-react';

const TABS = [
  { id: 'products', label: 'Produtos', icon: Package },
  { id: 'messages', label: 'Mensagens', icon: MessageSquare },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(u => { setUser(u); setChecking(false); })
      .catch(() => { setUser(null); setChecking(false); });
  }, []);

  const { data: products = [] } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => base44.entities.Product.list(),
    enabled: !checking && !!user && user.role === 'admin',
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => base44.entities.ContactMessage.list('-created_date'),
    enabled: !checking && !!user && user.role === 'admin',
  });

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FBFAF5' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C' }}>Verificando acesso...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: '#FBFAF5' }}>
        <p className="text-xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#7A5A5A' }}>
          Acesso restrito
        </p>
        <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
          Esta área é exclusiva para administradores.
        </p>
        <Link to={createPageUrl('Home')}
          className="text-xs tracking-[0.2em] uppercase velvet-transition"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
          ← Voltar à loja
        </Link>
      </div>
    );
  }

  const newMessages = messages.filter(m => m.status === 'novo').length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBFAF5' }}>
      {/* Header */}
      <div className="pt-16 sm:pt-24 pb-6 px-4 sm:px-6 border-b" style={{ borderColor: 'rgba(161,124,124,0.15)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            Painel de Controle
          </p>
          <h1 className="text-3xl sm:text-4xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
            Administração
          </h1>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 border" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
              <p className="text-xs tracking-widest uppercase" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>Total Produtos</p>
              <p className="text-3xl mt-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>{products.length}</p>
            </div>
            <div className="p-4 border" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
              <p className="text-xs tracking-widest uppercase" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>Em Estoque</p>
              <p className="text-3xl mt-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>{products.filter(p => p.in_stock).length}</p>
            </div>
            <div className="p-4 border col-span-2 sm:col-span-1" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
              <p className="text-xs tracking-widest uppercase" style={{ color: '#A17C7C', fontFamily: 'Montserrat, sans-serif' }}>Mensagens Novas</p>
              <p className="text-3xl mt-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>{newMessages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b" style={{ borderColor: 'rgba(161,124,124,0.15)' }}>
        <div className="max-w-7xl mx-auto flex gap-0">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-4 text-xs tracking-[0.15em] uppercase velvet-transition border-b-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: activeTab === tab.id ? '#7A5A5A' : '#A17C7C',
                  borderBottomColor: activeTab === tab.id ? '#7A5A5A' : 'transparent',
                  fontWeight: activeTab === tab.id ? 400 : 300,
                }}
              >
                <Icon size={14} />
                {tab.label}
                {tab.id === 'messages' && newMessages > 0 && (
                  <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center"
                    style={{ backgroundColor: '#A17C7C', color: 'white' }}>
                    {newMessages}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'messages' && <AdminMessages />}
        {activeTab === 'newsletter' && <AdminNewsletter />}
      </div>
    </div>
  );
}