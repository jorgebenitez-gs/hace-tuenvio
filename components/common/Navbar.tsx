'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from './Sidebar';
import Loader from './Loader';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === 'loading') {
    return (
     <Loader />
    );
  }

  return (
    <nav className="bg-primary shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo y navegación izquierda */}
          <div className="flex items-center space-x-8">
            <Sidebar />
            <Link href="/" className="text-xl font-bold text-white">
                <Image
                src="/logo.svg" // Cambia esto por la ruta de tu logo
                alt="Logo QX"
                width={220}
                height={64}
              />

            </Link>
            
            {/* Menú de navegación (solo mostrar si está logueado) */}
            {user && (
              <div className="hidden md:flex space-x-6">
                {/* <Link href="/gestionar-envio" className="text-white hover:text-secondary transition-colors">
                  Nuevo Envío
                </Link> */}
                {/* <Link href="/envios" className="text-white hover:text-secondary transition-colors">
                  Mis Envíos
                </Link> */}
                {/* <Link href="/sucursales" className="text-white hover:text-secondary transition-colors">
                  Sucursales
                </Link> */}
              </div>
            )}
          </div>

          {/* Lado derecho - Usuario o botones de login */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                </div>
                
                {/* Avatar del usuario */}
                <div className="relative group">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-secondary">
                    {user.image ? (
                      <Image 
                        src={user.image} 
                        alt={user.name || 'Usuario'} 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      href="/profile" // Enlace a la nueva página de perfil
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <Link 
                      href="/configuracion" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Configuración
                    </Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Botones de login/registro cuando no está logueado */
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="text-white hover:text-secondary font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/registro" 
                  className="bg-secondary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};