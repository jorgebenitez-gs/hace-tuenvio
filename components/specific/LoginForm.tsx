// components/specific/LoginForm.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from "next-auth/react"; // Importamos el hook de signIn


// Esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

// Tipo inferido del esquema para TypeScript
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Datos del formulario válidos:", data);
    // Aquí iría la lógica para enviar los datos a la API
  };

    const handleGoogleLogin = () => {
    // Llama a la función signIn con el nombre del proveedor
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="bg-black p-8 rounded-lg shadow-xl w-full max-w-sm border-2 border-[#f5333f]">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Iniciar Sesión
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            {...register('email')}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-200"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>
        
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="font-medium text-[#f5333f] hover:text-red-500">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#f5333f] text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5333f] transition duration-300 ease-in-out"
        >
          Entrar
        </button>
      </form>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-black px-2 text-gray-400">o</span>
        </div>
      </div>

       <button
        type="button" // Cambia a type="button" para que no envíe el formulario
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        Iniciar sesión con Google
      </button>
    </div>
  );
}