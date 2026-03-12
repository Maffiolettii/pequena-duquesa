import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './components/store/useCart';
import Logo from './components/store/Logo';

const NAV_ITEMS = [
  { label: 'Início', page: 'Home' },
  { label: 'Coleção', page: 'Products' },
  { label: 'Contato', page: 'Contact' },
  { label: 'Admin', page: 'Admin' },
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
    <div className="min-h-screen" style={{ backgroundColor: '#FBFAF5' }}>
      {/* Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-50 velvet-transition"
        style={{ backgroundColor: headerBg, backdropFilter: headerBlur, WebkitBackdropFilter: headerBlur }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <Logo size="sm" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className="text-xs tracking-[0.15em] uppercase velvet-transition hover:opacity-60 min-h-[44px] flex items-center"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 400 }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={createPageUrl("Cart")}
              className="relative velvet-transition hover:opacity-60 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Carrinho com ${cartCount} itens`}
            >
              <ShoppingBag size={18} color="#A17C7C" strokeWidth={1.5} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                  style={{ backgroundColor: '#A17C7C', color: '#FBFAF5', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              to={createPageUrl("Cart")}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Carrinho com ${cartCount} itens`}
            >
              <ShoppingBag size={18} color="#A17C7C" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                  style={{ backgroundColor: '#A17C7C', color: '#FBFAF5' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X size={20} color="#A17C7C" /> : <Menu size={20} color="#A17C7C" />}
            </button>
          </div>
        </nav>

        {/* Decorative line */}
        <div className="mx-auto" style={{ width: '80%', height: '0.5px', backgroundColor: 'rgba(161,124,124,0.15)' }} />

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden"
              style={{ backgroundColor: 'rgba(251,250,245,0.95)', backdropFilter: 'blur(12px)' }}
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="text-sm tracking-[0.15em] uppercase py-2 min-h-[44px] flex items-center"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 400 }}
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