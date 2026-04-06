import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Minus, Plus, Trash2, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '../components/store/useCart';

const WHATSAPP_NUMBER = '5581992656652';

function buildWhatsAppMessage(cart, cartTotal, cep) {
  const lines = cart.map(item =>
    `• *${item.name}*\n  Tamanho: ${item.size} | Qtd: ${item.quantity} | R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`
  );
  const cepLine = cep ? `\n📦 *CEP para entrega: ${cep}*` : '';
  const msg = `Olá! Gostaria de finalizar meu pedido na Pequena Duquesa:\n\n${lines.join('\n\n')}\n\n*Total: R$ ${cartTotal.toFixed(2).replace('.', ',')}*${cepLine}\n\nAguardo instruções de pagamento e entrega. 💕`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [cep, setCep] = useState('');

  return (
    <div className="pt-6 pb-24 px-4 sm:px-6 min-h-screen bg-[#FFFAF0]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-4"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3 font-sans text-[#6B5252]">
            Sua Seleção
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif italic text-[#4A3A3A]">
            {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'peça' : 'peças'}` : 'Sacola vazia'}
          </h1>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto mb-6 text-[#D4A5A5] opacity-40" strokeWidth={1} />
            <p className="text-sm mb-10 font-sans text-[#6B5252] font-light">
              Sua sacola ainda está vazia. Descubra peças que encantam.
            </p>
            <Link
              to={createPageUrl("Products")}
              className="inline-block px-12 py-4 text-[10px] tracking-[0.2em] uppercase rounded-full bg-[#D4A5A5] text-white hover:bg-[#4A3A3A] transition-all"
            >
              Explorar Coleção
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Itens do Carrinho */}
            <div className="divide-y divide-[#D4A5A5]/10">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="py-5"
                >
                  {/* Linha principal: imagem + info + lixeira */}
                  <div className="flex items-start gap-4">
                    <Link to={createPageUrl("ProductDetail") + `?id=${item.id}`} className="shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-20 h-24 sm:w-24 sm:h-32 object-cover rounded-[12px] shadow-sm"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-serif text-[#4A3A3A] leading-tight mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[10px] tracking-widest uppercase text-[#6B5252] opacity-60 mb-2">
                        Tam: {item.size}
                      </p>
                      <p className="text-base font-serif italic text-[#6B5252]">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>

                      {/* Controles de quantidade — abaixo do preço, no mobile */}
                      <div className="flex items-center mt-3 w-fit bg-white/70 rounded-full border border-[#D4A5A5]/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:opacity-50 transition-opacity"
                        >
                          <Minus size={11} className="text-[#6B5252]" />
                        </button>
                        <span className="text-xs font-sans w-6 text-center text-[#4A3A3A]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:opacity-50 transition-opacity"
                        >
                          <Plus size={11} className="text-[#6B5252]" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 mt-1 hover:text-[#D4A5A5] text-[#C4A4A4] transition-colors shrink-0"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resumo e CEP */}
            <div className="mt-8 p-6 rounded-[20px] bg-white/40 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B5252]">Total do Pedido</span>
                <span className="text-2xl sm:text-3xl font-serif text-[#4A3A3A]">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#6B5252] mb-3">
                  <MapPin size={12} /> CEP para entrega
                </label>
                <input
                  type="text"
                  value={cep}
                  onChange={e => setCep(e.target.value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'))}
                  placeholder="00000-000"
                  className="w-full bg-transparent border-b border-[#D4A5A5]/30 pb-2 font-sans text-sm focus:border-[#4A3A3A] outline-none transition-all"
                />
              </div>

              {/* Botões de Ação Final */}
              <div className="flex flex-col gap-3">
                <a
                  href={buildWhatsAppMessage(cart, cartTotal, cep)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 text-center text-[10px] tracking-[0.2em] uppercase rounded-full bg-[#D4A5A5] text-white hover:bg-[#4A3A3A] shadow-md transition-all"
                >
                  Finalizar via WhatsApp
                </a>
                <Link
                  to={createPageUrl("Products")}
                  className="w-full py-4 text-center text-[10px] tracking-[0.2em] uppercase rounded-full border border-[#D4A5A5]/40 text-[#6B5252] hover:bg-white/50 transition-all"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}