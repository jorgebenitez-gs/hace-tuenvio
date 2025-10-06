// types/next-auth.d.ts

import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// 1. Extender la interfaz User (lo que devuelve el authorize del Credentials Provider)
declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    telefono: string;
    direccion: string;
    localidad: string;
  }

  // 2. Extender la interfaz Session (lo que se obtiene con useSession())
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: string;
      telefono: string;
      direccion: string;
      localidad: string;
    } & DefaultSession['user'];
  }
}

// 3. Extender la interfaz Token (el JWT interno)
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    telefono: string;
    direccion: string;
    localidad: string;
  }
}