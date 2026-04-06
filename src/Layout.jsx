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
];

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const update = () => {
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScrollY) < 10) return;
      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return scrollDirection;
}

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  const isVisible = scrollDirection === "up";

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-duquesa-creme">
      {/* Header Inteligente */}
      <motion.header
        animate={isVisible ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 border-b border-duquesa-sepia/10"
        style={{ backgroundColor: '#FFFAF0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
      >
        <div className="container mx-auto px-4 pt-2 pb-0">

          {/* Logo + Nome centralizados */}
          <div className="flex flex-col items-center justify-center mb-3">
            <Logo size="sm" linkTo={true} />
            <Link to={createPageUrl("Home")}>
              <h1 className="font-serif text-xl md:text-2xl tracking-[0.2em] text-duquesa-sepia uppercase text-center mt-1 hover:text-duquesa-rosa velvet-transition">
                Pequena Duquesa
              </h1>
            </Link>
          </div>

          {/* Nav + ícones */}
          <nav className="flex items-center justify-center border-t border-duquesa-sepia/10 py-2 gap-8">

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <li key={item.page}>
                  <Link
                    to={createPageUrl(item.page)}
                    className="font-sans text-[10px] tracking-[0.15em] uppercase text-duquesa-sepia hover:text-duquesa-rosa velvet-transition min-h-[44px] flex items-center font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sacola — ao lado do nav, sem absolute */}
            <Link
              to={createPageUrl("Cart")}
              className="relative hidden md:flex hover:text-duquesa-rosa transition-colors min-w-[44px] min-h-[44px] items-center justify-center text-duquesa-sepia"
              aria-label={`Carrinho com ${cartCount} itens`}
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-duquesa-rosa text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile: sacola + hambúrguer */}
            <div className="md:hidden flex items-center gap-1 text-duquesa-sepia">
              <Link
                to={createPageUrl("Cart")}
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-duquesa-rosa transition-colors"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-duquesa-rosa text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
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
              className="md:hidden overflow-hidden border-t border-duquesa-sepia/10"
              style={{ backgroundColor: 'var(--rosa-pastel)' }}
            >
              <div className="px-6 py-5 flex flex-col gap-3">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="text-xs tracking-[0.15em] uppercase py-2 min-h-[44px] flex items-center font-sans text-duquesa-sepia hover:text-duquesa-rosa transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Page Content — offset para o header fixo + safe area iOS */}
      <main className="pt-[56px]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {children}
      </main>
    </div>
  );
}