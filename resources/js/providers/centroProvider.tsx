import { createContext, useContext, useState, ReactNode } from 'react';

export type Centro = 'Suma Playa' | 'Suma Norte' | 'Suma Sur';

interface CentroContextType {
  centro: Centro;
  setCentro: (centro: Centro) => void;
}

const CentroContext = createContext<CentroContextType | undefined>(undefined);

export const CentroProvider = ({ children }: { children: ReactNode }) => {
  const [centro, setCentro] = useState<Centro>('Suma Norte');

  return (
    <CentroContext.Provider value={{ centro, setCentro }}>
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
