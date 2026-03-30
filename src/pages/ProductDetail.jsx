import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../components/store/useCart';
import NewsletterFooter from '../components/store/NewsletterFooter';
import ProductCard from '../components/store/ProductCard';
import ProductImageCarousel from '../components/store/ProductImageCarousel';

const COLLECTION_LABELS = {
  classica: 'Coleção Clássica',
  festiva: 'Coleção Festiva',
  jardim: 'Jardim Encantado',
  batizado: 'Coleção Batizado',
};

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  const [selectedSize, setSelectedSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setSelectedSize('');
    setAddedToCart(false);
    window.scrollTo(0, 0);
  }, [productId]);
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => base44.entities.Product.filter({ id: productId }).then(r => r[0]),
    enabled: !!productId,
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen flex items-center justify-center">
        <p className="text-lg" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C' }}>
          Carregando produto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen flex items-center justify-center">
        <div>
          <p className="text-lg" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C' }}>
            Produto não encontrado
          </p>
          <Link to={createPageUrl("Products")} className="inline-block mt-6 text-xs tracking-[0.15em] uppercase velvet-transition"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
            ← Voltar à coleção
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = allProducts
    .filter(p => p.id !== product.id && (p.collection === product.collection || p.category === product.category))
    .slice(0, 3);

  return (
    <div>
      <div className="pt-10 sm:pt-14 pb-16 sm:pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link to={createPageUrl("Products")}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase velvet-transition hover:opacity-60 mb-8 min-h-[44px]"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
              <ArrowLeft size={14} /> Voltar
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
              <ProductImageCarousel product={product} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col justify-center">
              <p className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                {COLLECTION_LABELS[product.collection] || ''}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
                {product.name}
              </h1>

              <p className="mt-6 text-sm leading-relaxed"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300, letterSpacing: '0.05em' }}>
                {product.description}
              </p>

              <p className="mt-8 text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#7A5A5A' }}>
                R$ {Number(product.price).toFixed(2).replace('.', ',')}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs tracking-[0.15em] uppercase mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C' }}>
                    Tamanho
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className="min-w-[44px] min-h-[44px] px-5 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full transition-all duration-300 font-sans border"
                        style={{
                          backgroundColor: selectedSize === size ? '#D4A5A5' : 'transparent',
                          color: selectedSize === size ? '#FFFFFF' : '#A17C7C',
                          borderColor: '#D4A5A5',
                        }}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={handleAddToCart} disabled={!selectedSize && product.sizes && product.sizes.length > 0}
                className="mt-8 px-10 py-4 text-[10px] tracking-[0.25em] uppercase rounded-full font-sans font-semibold min-h-[44px] flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                style={{ color: '#FFFFFF', background: addedToCart ? '#4A3A3A' : '#D4A5A5' }}>
                {addedToCart ? (
                  <><Check size={14} /> Adicionado</>
                ) : (
                  selectedSize || !product.sizes?.length ? 'Adicionar ao Carrinho' : 'Selecione um Tamanho'
                )}
              </button>

              <div className="mt-10 pt-8" style={{ borderTop: '0.5px solid rgba(161,124,124,0.2)' }}>
                <div className="grid grid-cols-2 gap-y-4 text-xs"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, color: '#A17C7C', letterSpacing: '0.05em' }}>
                  <span>Tecido</span><span>Linho / Algodão Natural</span>
                  <span>Bordado</span><span>Artesanal à mão</span>
                  <span>Cuidados</span><span>Lavar à mão, secar à sombra</span>
                </div>
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <div className="mt-20 sm:mt-28">
              <h3 className="text-center text-2xl sm:text-3xl mb-12"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#7A5A5A' }}>
                Você também pode gostar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <NewsletterFooter />
    </div>
  );
}