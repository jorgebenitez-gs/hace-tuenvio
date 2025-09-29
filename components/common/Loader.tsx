'use client';

import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import clsx from 'clsx';

const CustomCircularProgress = styled(CircularProgress)(() => ({
  color: '#f5333f', // color secundario
  animationDuration: '1.5s',
}));

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#323e48] text-white space-y-6">
      {/* Animación de fondo pulsante */}
      <div className="relative w-32 h-32">
        <div
          className={clsx(
            'absolute inset-0 rounded-full',
            'bg-[#f5333f]',
            'animate-ping opacity-30'
          )}
        ></div>

        <div className="relative flex items-center justify-center w-full h-full">
          <CustomCircularProgress size={80} thickness={5} />
        </div>

        <div className="absolute top-1/2 left-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md" />
      </div>

      {/* Texto "Cargando..." */}
      <h2 className="text-xl font-semibold tracking-wide animate-pulse text-white">
        Cargando...
      </h2>
    </div>
  );
}
