import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import axios from 'axios';

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

export const CentroProvider = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: number;
}) => {
  const [centro, setCentro] = useState<Centro | null>(null);
  const [centrosDisponibles, setCentrosDisponibles] = useState<Centro[]>([]);

  useEffect(() => {
    console.log("Id de usuario en el provider:", userId)
    axios
      .get<Supermercado[]>(`/api/user/${userId}/supermercados`)
      .then((res) => {
        const supermercados = res.data;
        setCentrosDisponibles(supermercados);
        if (supermercados.length > 0) {
          setCentro(supermercados[0]);
        }
      })
      .catch((err) => console.error('Error al cargar supermercados:', err));
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
  if (!context) {
    throw new Error('useCentro debe usarse dentro de un CentroProvider');
  }
  return context;
};
