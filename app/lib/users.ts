// lib/users.ts

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string | null;
  role: string;
  telefono: string;
  direccion: string;
  localidad: string;
}

// 🔹 Mock de usuarios (solo para pruebas)
export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Nahuel Benitez",
    email: "nahuel@example.com",
    password: "password123",
    image: "",
    role: "admin",
    telefono: "1122334455",
    direccion: "Av. Siempre Viva 123",
    localidad: "Buenos Aires",
  },
  {
    id: "2",
    name: "Cliente Demo",
    email: "demo@example.com",
    password: "demo1234",
    image: "",
    role: "user",
    telefono: "221334455",
    direccion: "Calle Falsa 456",
    localidad: "Córdoba",
  },
];
