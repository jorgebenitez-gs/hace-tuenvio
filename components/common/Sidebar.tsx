// components/common/Sidebar.tsx

'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';

// Define el ancho del Sidebar
const drawerWidth = 240;

export default function Sidebar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);

  // Muestra el Sidebar solo si el usuario está autenticado
  const isAuthenticated = status === 'authenticated';

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    { name: 'Inicio', href: '/', icon: HomeIcon },
  ];
  
  // Agregamos Dashboard y Perfil solo si el usuario está autenticado
  if (isAuthenticated) {
      navItems.push({ name: 'Dashboard', href: '/dashboard', icon: DashboardIcon });
      navItems.push({ name: 'Mi Perfil', href: '/profile', icon: AccountCircleIcon });
  }

  // 🌟 LÓGICA CLAVE: Si no está autenticado O está cargando, no mostramos el botón del Sidebar.
  if (!isAuthenticated) { 
      return null; 
  }

  return (
    <Box sx={{ flexShrink: 0 }}>
      {/* Botón para abrir el Drawer (SOLO APARECE si isAuthenticated es true) */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ 
            mr: 2, 
            display: { sm: 'block' },
            color: 'white',
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Componente Drawer */}
      <Drawer
        anchor="left" 
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1f2937', 
            color: 'white',
          },
        }}
      >
        <Box 
            role="presentation" 
            onClick={toggleDrawer(false)} 
            onKeyDown={toggleDrawer(false)}
        >
          {/* Header del Drawer: Info del usuario */}
          <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#374151' }}>
            {user ? (
              <Box>
                {/* Avatar */}
                {user.image && (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={60}
                    height={60}
                    className="rounded-full mx-auto mb-2 border-2 border-[#f5333f]"
                  />
                )}
                <Typography variant="subtitle1" noWrap sx={{ color: 'white' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray.400' }}>
                  {user.email}
                </Typography>
              </Box>
            ) : (
              // Este bloque ya no debería ejecutarse si el componente retorna null antes.
              <Box> 
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Bienvenido
                </Typography>
                <Link href="/login" passHref>
                  <Button 
                    variant="contained" 
                    sx={{ 
                        mt: 1, 
                        backgroundColor: '#f5333f', 
                        '&:hover': { backgroundColor: '#cc1120' } 
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ borderColor: '#4b5563' }} />

          {/* Lista de Navegación */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <Link href={item.href} passHref style={{ width: '100%', textDecoration: 'none' }}>
                  <ListItemButton sx={{ '&:hover': { backgroundColor: '#374151' } }}>
                    <ListItemIcon>
                      <item.icon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={{ color: 'white' }}>{item.name}</Typography>} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          
          {/* Opción de Cerrar Sesión (Solo si está logueado) */}
          {isAuthenticated && (
            <Box>
              <Divider sx={{ borderColor: '#4b5563', mt: 1 }} />
              <List>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    sx={{ '&:hover': { backgroundColor: '#374151' } }}
                  >
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: '#f5333f' }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={{ color: 'white' }}>Cerrar Sesión</Typography>} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          )}

        </Box>
      </Drawer>
    </Box>
  );
}