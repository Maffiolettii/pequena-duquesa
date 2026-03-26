import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './components/store/useCart';
import Logo from './components/store/Logo';

const NAV_ITEMS = [
  { label: 'Início', page: 'Home' },
  { label: 'Coleção', page: 'Products' },
  { label: 'Contato', page: 'Contact' },
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const isHome = currentPageName === 'Home';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const headerBg = scrolled || !isHome
    ? 'rgba(251,250,245,0.85)'
    : 'transparent';
  const headerBlur = scrolled || !isHome ? 'blur(12px)' : 'none';

  return (
    <div className="min-h-screen bg-duquesa-creme">
      {/* Navigation */}
      <header className="w-full bg-duquesa-creme/90 backdrop-blur-md sticky top-0 z-50 border-b border-duquesa-dourado/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* Busca (desktop) */}
          <button className="hidden md:flex text-duquesa-sepia hover:text-duquesa-rosa transition-colors min-w-[44px] min-h-[44px] items-center justify-center">
            <Search size={20} />
          </button>

          {/* Logo Centralizada */}
          <div className="flex flex-col items-center mx-auto md:mx-0">
            <Logo size="sm" />
          </div>

          {/* Direita: carrinho + menu mobile */}
          <div className="flex items-center gap-4 text-duquesa-sepia">
            <Link
              to={createPageUrl("Cart")}
              className="relative hover:text-duquesa-rosa transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Carrinho com ${cartCount} itens`}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-duquesa-rosa text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className="text-xs tracking-[0.15em] uppercase velvet-transition hover:text-duquesa-rosa min-h-[44px] flex items-center font-sans text-duquesa-sepia"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden bg-duquesa-creme/95 backdrop-blur-md"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="text-sm tracking-[0.15em] uppercase py-2 min-h-[44px] flex items-center font-sans text-duquesa-sepia hover:text-duquesa-rosa transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  );
}