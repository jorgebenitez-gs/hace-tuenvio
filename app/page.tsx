'use client';

import Loader from '@/components/common/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (session) {
      // si está logueado, redirigir a gestión de envío
      router.push('/gestionar-envio');
    } else {
      // si no está logueado, redirigir a login
      router.push('/login');
    }
  }, [session, status, router]);

  
  if (status === 'loading') {
    return (
      <Loader />
    );
  }

  // Este contenido no debería mostrarse nunca, pero por si acaso
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader />
    </main>
  );
}