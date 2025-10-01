// app/profile/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import ProfileForm from '@/components/specific/profile/ProfileForm';

export default async function ProfilePage() {
  // 1. Protección de la ruta en el Servidor
  const session = await getServerSession();

  // Si no hay sesión, redirigir al login
  if (!session) {
    redirect('/login');
  }

  // Si hay sesión, renderizar el componente de formulario (Client Component)
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <ProfileForm />
    </div>
  );
}