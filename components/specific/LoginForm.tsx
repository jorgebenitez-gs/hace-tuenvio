// components/specific/LoginForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// 🔹 Validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // 🔹 Handler de login normal (email + contraseña)
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setAuthError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (!res) {
      setAuthError("Error desconocido al intentar iniciar sesión.");
      return;
    }

    if (res.error) {
      setAuthError("Email o contraseña incorrectos.");
      return;
    }

    // Éxito -> redirige al dashboard o ruta deseada
    router.push("/gestionar-envio");
  };

  // 🔹 Login con Google
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/gestionar-envio" });
  };

  return (
    <div className="bg-black p-8 rounded-lg shadow-xl w-full max-w-sm border-2 border-[#f5333f]">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-[#f5333f] focus:border-[#f5333f]"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Error de autenticación */}
        {authError && <div className="text-center text-sm text-red-400">{authError}</div>}

        {/* Link olvidar contraseña */}
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="font-medium text-[#f5333f] hover:text-red-500">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#f5333f] text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f5333f] transition duration-300 ease-in-out"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* Separador */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-black px-2 text-gray-400">o</span>
        </div>
      </div>

      {/* Botón de Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        Iniciar sesión con Google
      </button>
    </div>
  );
}
