import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import DashboardContent from '@/components/specific/DashboardContent';

export default async function DashboardPage() {
  const session = await getServerSession();

  // Si no hay sesión, redirigir al login
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <DashboardContent />
   
    </div>
  );
}