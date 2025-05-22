import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { axiosGet } from '@/lib/axios';

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
  setUserId: (id: number) => void;
}

const CentroContext = createContext<CentroContextType | undefined>(undefined);

interface CentroProviderProps {
  children: ReactNode;
}

export const CentroProvider = ({ children }: CentroProviderProps) => {
  const [centro, setCentroState] = useState<Centro | null>(null);
  const [centrosDisponibles, setCentrosDisponibles] = useState<Centro[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchCentros = async () => {
      try {
        const res = await axiosGet(`/api/user/${userId}/supermercados`);
        const supermercados = res.data;

        setCentrosDisponibles(supermercados);

        const savedId = localStorage.getItem('centroId');
        const defaultCentro =
          supermercados.find((c: Centro) => c.id === Number(savedId)) || supermercados[0];

        setCentroState(defaultCentro);
      } catch (err) {
        console.error('Error cargando supermercados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, [userId]);

  const setCentro = (centro: Centro) => {
    setCentroState(centro);
    localStorage.setItem('centroId', centro.id.toString());
  };

  if (loading && userId !== null) return null;

  return (
    <CentroContext.Provider value={{ centro, setCentro, centrosDisponibles, setCentrosDisponibles, setUserId }}>
      {children}
    </CentroContext.Provider>
  );
};

export const useCentro = () => {
  const context = useContext(CentroContext);
  if (!context) throw new Error('useCentro debe usarse dentro de CentroProvider');
  return context;
};
