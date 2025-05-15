import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';

export interface Supermercado {
  id: number;
  Nombre: string;
  Direccion: string;
  NIF: string;
  user_id: number;
}

export type Centro = Supermercado;

interface CentroContextType {
  centro: Centro | null;
  setCentro: (centro: Centro) => void;
  centrosDisponibles: Centro[];
  setCentrosDisponibles: (centros: Centro[]) => void;
}

const CentroContext = createContext<CentroContextType | undefined>(undefined);

interface CentroProviderProps {
  children: ReactNode;
  userId: number | null;
}

export const CentroProvider = ({ children, userId }: CentroProviderProps) => {
  const [centro, setCentro] = useState<Centro | null>(null);
  const [centrosDisponibles, setCentrosDisponibles] = useState<Centro[]>([]);

  useEffect(() => {
    if (!userId) return;

    axios.get(`/api/user/${userId}/supermercados`)
      .then((res) => {
        const supermercados = res.data;
        setCentrosDisponibles(supermercados);
        if (supermercados.length > 0) {
          setCentro(supermercados[0]);
        }
      });
  }, [userId]);

  return (
    <CentroContext.Provider
      value={{ centro, setCentro, centrosDisponibles, setCentrosDisponibles }}
    >
      {children}
    </CentroContext.Provider>
  );
};


export const useCentro = () => {
  const context = useContext(CentroContext);
  if (!context) throw new Error('useCentro debe usarse dentro de CentroProvider');
  return context;
};
