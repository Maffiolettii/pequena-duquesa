import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: '#7A5A5A' }}>
      {/* Newsletter Section */}
      <div className="py-16 sm:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#F4E2E2', fontWeight: 300 }}>
              Carta à Deusa
            </p>
            <h3 className="text-2xl sm:text-4xl"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#FBFAF5' }}>
              Receba nossas novidades
            </h3>
            <p className="mt-4 text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#F4E2E2', fontWeight: 300, letterSpacing: '0.05em' }}>
              Seja a primeira a descobrir nossas novas coleções e peças exclusivas.
            </p>

            {submitted ? (
              <p className="mt-8 text-sm" style={{ color: '#F4E2E2' }}>
                Obrigada por se inscrever ✦
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  required
                  className="w-full bg-transparent border-b border-[#F4E2E2]/40 pb-2 text-sm outline-none placeholder-[#F4E2E2]/50 velvet-transition focus:border-[#F4E2E2]"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#FBFAF5', letterSpacing: '0.05em' }}
                  aria-label="Seu endereço de e-mail para newsletter"
                />
                <button
                  type="submit"
                  className="px-6 py-2 text-xs tracking-[0.2em] uppercase velvet-transition min-w-[44px] min-h-[44px] flex items-center justify-center"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
                    color: '#7A5A5A', background: '#FBFAF5' 
                  }}
                >
                  Inscrever
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#FBFAF5]/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-[0.15em]"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#F4E2E2', fontWeight: 300 }}>
            © 2026 Pequena Duquesa — Todos os direitos reservados
          </p>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/pequenaduquesa_?igsh=MWRoNTZ2MXNoeDUxNg==" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.1em] velvet-transition hover:opacity-70 min-w-[44px] min-h-[44px] flex items-center"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#F4E2E2', fontWeight: 300 }}>
              Instagram
            </a>
            <a href="#" className="text-xs tracking-[0.1em] velvet-transition hover:opacity-70 min-w-[44px] min-h-[44px] flex items-center"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#F4E2E2', fontWeight: 300 }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}