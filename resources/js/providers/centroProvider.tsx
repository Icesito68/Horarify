import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export type Centro = string;

interface Supermercado {
  Nombre: string;
  Direccion: string;
  NIF: string;
  user_id: number;
}

interface CentroContextType {
  centro: Centro;
  setCentro: (centro: Centro) => void;
  centrosDisponibles: Centro[];
}

const CentroContext = createContext<CentroContextType | undefined>(undefined);

export const CentroProvider = ({ children }: { children: ReactNode }) => {
  const [centro, setCentro] = useState<Centro>(''); // inicialmente vacío
  const [centrosDisponibles, setCentrosDisponibles] = useState<Centro[]>([]);

  useEffect(() => {
    axios
      .get<Supermercado[]>('/api/user/1/supermercados')
      .then((res) => {
        const supermercados = res.data;
        const nombres = supermercados.map((s) => s.Nombre);
        setCentrosDisponibles(nombres);
        if (nombres.length > 0) {
          setCentro(nombres[0]);
        }
      })
      .catch((err) => console.error('Error al cargar supermercados:', err));
  }, []);

  return (
    <CentroContext.Provider value={{ centro, setCentro, centrosDisponibles }}>
      {children}
    </CentroContext.Provider>
  );
};

export const useCentro = () => {
  const context = useContext(CentroContext);
  if (!context) {
    throw new Error('useCentro debe usarse dentro de un CentroProvider');
  }
  return context;
};
