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
      <header className="w-full bg-duquesa-creme sticky top-0 z-50 border-b border-duquesa-sepia/10">
        <div className="container mx-auto px-4 pt-5 pb-0">

          {/* Logo + Nome centralizados */}
          <div className="flex flex-col items-center justify-center mb-4">
            <Logo size="sm" linkTo={true} />
            <Link to={createPageUrl("Home")}>
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-duquesa-sepia uppercase text-center mt-1 hover:text-duquesa-rosa velvet-transition">
                Pequena Duquesa
              </h1>
            </Link>
          </div>

          {/* Nav + ícones */}
          <nav className="relative flex items-center justify-center border-t border-duquesa-sepia/10 py-3">

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <li key={item.page}>
                  <Link
                    to={createPageUrl(item.page)}
                    className="font-sans text-[11px] tracking-[0.15em] uppercase text-duquesa-sepia hover:text-duquesa-rosa velvet-transition min-h-[44px] flex items-center font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Ícones direita */}
            <div className="absolute right-0 flex items-center gap-3 text-duquesa-sepia">
              <button className="hidden md:flex hover:text-duquesa-rosa transition-colors min-w-[44px] min-h-[44px] items-center justify-center" aria-label="Buscar">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link
                to={createPageUrl("Cart")}
                className="relative hover:text-duquesa-rosa transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Carrinho com ${cartCount} itens`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
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
                {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden bg-duquesa-creme/95 backdrop-blur-md border-t border-duquesa-sepia/10"
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