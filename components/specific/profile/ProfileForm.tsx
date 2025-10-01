"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';

// 1. Esquema de Validación con Zod
const profileSchema = z.object({
  // Campos de Google (Editables)
  name: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"), // Nuevo campo
  
  // Campos Adicionales (Nuevos)
  email: z.string().email("Email inválido").optional(), // Lo hacemos opcional/readonly, pero lo mantenemos
  phoneNumber: z.string().min(10, "Mínimo 10 dígitos para el teléfono").max(15).optional(),
  address: z.string().min(5, "La dirección es obligatoria").optional(),
  city: z.string().min(3, "La localidad es obligatoria").optional(),
});

// Tipo inferido del esquema
type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { data: session, status, update } = useSession();
  
  // 2. Valores por defecto (precargando datos de Google)
  const defaultValues: ProfileFormValues = {
    name: session?.user?.name || "",
    lastName: "", // No viene de Google, se deja vacío para que el usuario lo complete
    email: session?.user?.email || "",
    phoneNumber: "",
    address: "",
    city: "",
  };
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Datos del perfil a guardar:", data);
    
    // Aquí iría la lógica para enviar los datos a tu API/Base de Datos.
    // Simulación de guardado:
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // Opcional: Si actualizas el nombre, puedes actualizar la sesión localmente
    // para que se vea reflejado inmediatamente en el Dashboard, usando NextAuth `update`.
    if (session?.user?.name !== data.name) {
        await update({ name: data.name });
    }

    alert('Perfil actualizado con éxito!');
  };

  if (status === 'loading') {
    return <div className="text-center text-white mt-20">Cargando perfil...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="text-center text-red-400 mt-20">Debes iniciar sesión para ver tu perfil.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 border-[#f5333f]">
      <h1 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-4">
        Editar Mi Perfil
      </h1>
      
      {/* Información de Sesión y Foto */}
      <div className="flex items-center space-x-6 mb-8 p-4 bg-gray-700 rounded-lg">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "Foto de perfil"}
            width={70}
            height={70}
            className="rounded-full border-2 border-[#f5333f]"
          />
        )}
        <div>
          <p className="text-xl font-semibold text-white">{session?.user?.name || "Usuario"}</p>
          <p className="text-gray-400 text-sm">Sesión activa con Google</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Nombre y Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">Nombre</label>
            <input
              id="name"
              {...register('name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">Apellido</label>
            <input
              id="lastName"
              {...register('lastName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email (Solo lectura) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email (Google)</label>
          <input
            id="email"
            type="email"
            value={session?.user?.email || ''}
            readOnly // El email de Google no debería ser editable
            className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-gray-400 rounded-md cursor-not-allowed"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200">Teléfono</label>
          <input
            id="phoneNumber"
            type="tel"
            {...register('phoneNumber')}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
        </div>

        {/* Dirección y Localidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200">Dirección</label>
            <input
              id="address"
              {...register('address')}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
            />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-200">Localidad</label>
            <input
              id="city"
              {...register('city')}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
            />
            {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
          </div>
        </div>

        {/* Botón de Guardar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out ${
            isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#f5333f] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5333f]'
          }`}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}