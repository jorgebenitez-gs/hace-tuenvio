// app/login/page.tsx

import React from 'react';
import LoginForm from '@/components/specific/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://bootcamp.latam.express.dhl.com/hubfs/La%20log%C3%ADstica%20multiplica%20los%20efectos%20en%20una%20cadena%20de%20suministro.%20(1).png')` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> 
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}