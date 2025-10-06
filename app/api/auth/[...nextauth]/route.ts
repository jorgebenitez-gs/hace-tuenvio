// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/app/lib/users";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "usuario@ejemplo.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = mockUsers.find(
          (u) =>
            u.email.toLowerCase() === credentials.email.toLowerCase() &&
            u.password === credentials.password
        );

        if (user) {
          // 🔹 Forzamos a coincidir con el tipo `User` de NextAuth
           const authUser: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image || null,
            role: user.role,
            telefono: user.telefono,
            direccion: user.direccion,
            localidad: user.localidad,
          };
          return authUser;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // 👈 evita el error de tipo “string no asignable”
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: User | null }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.user) session.user = token.user as User;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
