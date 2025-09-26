import React from 'react';
import { ServiceType } from '@/types';

interface ServiceTypeCardProps {
  serviceType: ServiceType;
  selected?: boolean;
  onSelect: (serviceType: ServiceType) => void;
}

export const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({
  serviceType,
  selected = false,
  onSelect
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl p-3 cursor-pointer transition-all duration-300 
        flex flex-col items-center text-center min-h-[140px] h-full 
        border-2
        ${selected 
          ? 'border-secondary bg-primary text-white shadow-2xl transform -translate-y-2' 
          : 'border-primary/20 bg-primary/10 hover:border-secondary hover:bg-primary/5 hover:shadow-lg'
        }
      `}
      onClick={() => onSelect(serviceType)}
    >
      
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
      )}
      
      <div className="relative z-10 flex flex-col items-center h-full w-full">
        
        <div className="flex-shrink-0 mb-2"> 
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300
            ${selected 
              ? 'bg-white/20 text-white border-2 border-white/30' 
              : 'bg-primary/10 text-primary border-2 border-primary/20'
            }
          `}>
            <span className="text-2xl">{serviceType.imagen}</span>
          </div>
        </div>

        <div className="flex-shrink-0 mb-2 min-h-[40px] flex items-center justify-center w-full"> 
          <h3 className={`
            text-base font-bold transition-colors text-center w-full
            ${selected ? 'text-white' : 'text-primary'}
          `}>
            {serviceType.titulo}
          </h3>
        </div>
        
        <div className="flex-1 flex items-center justify-center w-full min-h-[30px] mb-2"> 
          {serviceType.descripcion && (
            <p className={`
              text-sm font-medium transition-colors text-center
              ${selected ? 'text-white/90' : 'text-primary/70'}
            `}>
              {serviceType.descripcion}
            </p>
          )}
        </div>

        <div className="flex-shrink-0"> 
          <div className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${selected 
              ? 'bg-secondary border-secondary shadow-md' 
              : 'bg-white border-primary/30'
            }
          `}>
            {selected && (
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </div>
  );
};