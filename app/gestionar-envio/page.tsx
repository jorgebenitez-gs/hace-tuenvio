'use client';

import React, { useState } from 'react';
import { ServiceTypeCard } from '@/components/specific/gestionar-envio/ServiceTypeCard';
import { ServiceType } from '@/types';

  const serviceTypes: ServiceType[] = [
    {
      id: 1,
      tipo: "postal",
      titulo: "Encomienda",
      descripcion: "Hasta 50kg, con seguridad incluida, 205cm lineal y 100cm de alto y tambien envuelta en film",
      imagen: "📦",
    },
    {
      id: 2,
      tipo: "postal",
      titulo: "Sobre",
      descripcion: "Hasta 500 gr",
      imagen: "✉️",
    },
    {
      id: 3,
      tipo: "postal",
      titulo: "Bolsin corporativo",
      descripcion: "Hasta 50kg",
      imagen: "🛍️",
    },
    // {
    //   id: 4,
    //   tipo: "postal",
    //   titulo: "Encomienda",
    //   descripcion: "Hasta 50kg, con seguridad incluida, 205cm lineal y 100cm de alto y tambien envuelta en film",
    //   imagen: "📦",
    // },
    // {
    //   id: 5,
    //   tipo: "postal",
    //   titulo: "Sobre",
    //   descripcion: "Hasta 500 gr",
    //   imagen: "✉️",
    // },
    
  ];

export default function GestionarEnvioPage() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  const handleSelectService = (serviceType: ServiceType) => {
    if (selectedService?.id === serviceType.id) {
      setSelectedService(null);
      return;
    }
    setSelectedService(serviceType);
  };

  const nextStep = () => {
    alert(`Continuar con el servicio: ${selectedService?.titulo}`);
  }

  return (
    <main className="min-h-screen from-primary/5 to-white py-8"> 
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Gestioná tu envío
          </h1>
          <h2 className="text-xl text-primary/80 font-medium">
            Seleccioná el tipo de envío
          </h2>
        </div>

        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {serviceTypes.map((serviceType) => (
            <ServiceTypeCard
              key={serviceType.id}
              serviceType={serviceType}
              selected={selectedService?.id === serviceType.id}
              onSelect={handleSelectService}
            />
          ))}
        </div>

        {selectedService && (
          <div className="text-center">
            <button onClick={nextStep} className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold text-base hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Continuar 
              {/* con {selectedService.titulo} */}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}