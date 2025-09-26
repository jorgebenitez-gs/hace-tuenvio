// components/specific/DashboardContent.tsx

"use client";

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function DashboardContent() {
  // Obtenemos los datos de la sesión (solo funciona en Client Components)
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="text-center mt-20">
        <p className="text-xl">Cargando datos del usuario...</p>
      </div>
    );
  }

  // Los datos del usuario están disponibles en session.user
  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 border-[#f5333f]">
      <h1 className="text-4xl font-extrabold mb-6 text-white border-b border-gray-700 pb-4">
        Bienvenido al Dashboard 👋
      </h1>

      <div className="flex items-center space-x-6 mb-8">
        {user?.image && (
          <Image
            src={user.image}
            alt={user.name || "Foto de perfil"}
            width={80}
            height={80}
            className="rounded-full border-2 border-[#f5333f]"
          />
        )}
        <div>
          <p className="text-2xl font-semibold text-white">{user?.name}</p>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-[#f5333f]">Tus Datos de Sesión:</h2>
      <pre className="bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm">
        {JSON.stringify(user, null, 2)}
      </pre>

      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="mt-8 py-3 px-6 bg-[#f5333f] text-white font-bold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out w-full sm:w-auto"
      >
        Cerrar Sesión (Logout)
      </button>
    </div>
  );
}