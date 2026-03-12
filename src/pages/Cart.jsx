import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../components/store/useCart';

const WHATSAPP_NUMBER = '5581992656652';

function buildWhatsAppMessage(cart, cartTotal) {
  const lines = cart.map(item =>
    `• ${item.name} (Tam: ${item.size}) x${item.quantity} — R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`
  );
  const msg = `Olá! Gostaria de finalizar meu pedido na Pequena Duquesa:\n\n${lines.join('\n')}\n\n*Total: R$ ${cartTotal.toFixed(2).replace('.', ',')}*\n\nAguardo instruções de pagamento e entrega. 💕`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            Seu Carrinho
          </p>
          <h1 className="text-3xl sm:text-5xl"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
            {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'peça selecionada' : 'peças selecionadas'}` : 'Carrinho vazio'}
          </h1>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-16"
          >
            <ShoppingBag size={48} className="mx-auto mb-6" style={{ color: '#A17C7C', opacity: 0.3 }} strokeWidth={1} />
            <p className="text-sm mb-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
              Sua sacola ainda está vazia. Descubra peças que encantam.
            </p>
            <Link
              to={createPageUrl("Products")}
              className="inline-block px-8 py-3 text-xs tracking-[0.2em] uppercase velvet-transition"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, color: '#FBFAF5', background: '#A17C7C' }}
            >
              Explorar Coleção
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-0">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 sm:gap-6 py-6"
                  style={{ borderBottom: '0.5px solid rgba(161,124,124,0.15)' }}
                >
                  {/* Image */}
                  <Link to={createPageUrl("ProductDetail") + `?id=${item.id}`} className="shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-24 sm:w-24 sm:h-32 object-cover gilded-frame"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg truncate"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#7A5A5A' }}>
                      {item.name}
                    </h3>
                    <p className="text-xs mt-1" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
                      Tamanho: {item.size}
                    </p>
                    <p className="text-sm mt-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#7A5A5A' }}>
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center velvet-transition hover:opacity-60"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus size={14} color="#A17C7C" />
                    </button>
                    <span className="text-sm w-6 text-center" style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center velvet-transition hover:opacity-60"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus size={14} color="#A17C7C" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center velvet-transition hover:opacity-60"
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    <Trash2 size={14} color="#A17C7C" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-8 pt-6" style={{ borderTop: '0.5px solid rgba(161,124,124,0.3)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                  Total
                </span>
                <span className="text-2xl"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#7A5A5A' }}>
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <p className="text-xs mt-4 text-center"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
                Frete e condições de pagamento serão calculados ao finalizar.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to={createPageUrl("Products")}
                  className="flex-1 px-6 py-4 text-center text-xs tracking-[0.2em] uppercase velvet-transition gilded-frame min-h-[44px] flex items-center justify-center"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, color: '#A17C7C' }}
                >
                  Continuar Comprando
                </Link>
                <a
                  href={buildWhatsAppMessage(cart, cartTotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 text-center text-xs tracking-[0.2em] uppercase velvet-transition min-h-[44px] flex items-center justify-center"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, color: '#FBFAF5', background: '#A17C7C' }}
                >
                  Finalizar Pedido
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}