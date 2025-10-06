"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Loader from "@/components/common/Loader";

// ✅ Esquema de validación
const profileSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().optional(), // algunos usuarios del mock no lo tendrán
  email: z.string().email("Email inválido").optional(),
  telefono: z.string().min(6, "Teléfono demasiado corto").optional(),
  direccion: z.string().min(3, "Dirección obligatoria").optional(),
  localidad: z.string().min(2, "Localidad obligatoria").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { data: session, status, update } = useSession();

  // ⚙️ Precargar valores según la sesión (mock o Google)
  const defaultValues: ProfileFormValues = {
    name: session?.user?.name || "",
    lastName: "",
    email: session?.user?.email || "",
    telefono: (session?.user as any)?.telefono || "",
    direccion: (session?.user as any)?.direccion || "",
    localidad: (session?.user as any)?.localidad || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Datos de perfil guardados:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Si el nombre cambió, actualizamos la sesión local (solo visual)
    if (session?.user?.name !== data.name) {
      await update({ name: data.name });
    }

    alert("Perfil actualizado correctamente ✅");
  };

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return (
      <div className="text-center text-red-400 mt-20">
        Debes iniciar sesión para ver tu perfil.
      </div>
    );

  const isGoogleUser = (session?.user?.image && !("role" in session.user)) || false;

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 border-[#f5333f]">
      <h1 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-4">
        Mi Perfil
      </h1>

      {/* Datos del usuario */}
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
          <p className="text-xl font-semibold text-white">
            {session?.user?.name || "Usuario"}
          </p>
          <p className="text-gray-400 text-sm">
            {isGoogleUser
              ? "Sesión activa con Google"
              : `Rol: ${(session?.user as any)?.role || "Sin rol"}`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200">
            Nombre
          </label>
          <input
            id="name"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Apellido (solo si no viene de Google) */}
        {!isGoogleUser && (
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">
              Apellido
            </label>
            <input
              id="lastName"
              {...register("lastName")}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-gray-400 rounded-md cursor-not-allowed"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-200">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            {...register("telefono")}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.telefono && (
            <p className="mt-1 text-xs text-red-500">{errors.telefono.message}</p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label htmlFor="direccion" className="block text-sm font-medium text-gray-200">
            Dirección
          </label>
          <input
            id="direccion"
            {...register("direccion")}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.direccion && (
            <p className="mt-1 text-xs text-red-500">{errors.direccion.message}</p>
          )}
        </div>

        {/* Localidad */}
        <div>
          <label htmlFor="localidad" className="block text-sm font-medium text-gray-200">
            Localidad
          </label>
          <input
            id="localidad"
            {...register("localidad")}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.localidad && (
            <p className="mt-1 text-xs text-red-500">{errors.localidad.message}</p>
          )}
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#f5333f] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5333f]"
          }`}
        >
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>

       
      </form>
    </div>
  );
}
