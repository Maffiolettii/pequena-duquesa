import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'allowed' | 'redirect'

  useEffect(() => {
    base44.auth.me()
      .then(user => {
        if (user && user.role === 'admin') {
          setStatus('allowed');
        } else if (user) {
          // Logged in but not admin
          setStatus('forbidden');
        } else {
          setStatus('redirect');
        }
      })
      .catch(() => {
        setStatus('redirect');
      });
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FBFAF5' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C', fontSize: '1.1rem' }}>
          Verificando acesso...
        </p>
      </div>
    );
  }

  if (status === 'redirect') {
    base44.auth.redirectToLogin('/Admin');
    return null;
  }

  if (status === 'forbidden') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#FBFAF5' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#7A5A5A', fontSize: '1.4rem' }}>
          Acesso restrito
        </p>
        <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          Esta área é exclusiva para administradores.
        </p>
      </div>
    );
  }

  return children;
}