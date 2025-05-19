import { useEffect } from 'react';
import AppLogoIcon from './app-logo-icon';
import { useCentro } from '../providers/centroProvider';
import { useSidebar } from "@/components/ui/sidebar";

export default function AppLogo() {
  const { centro, setCentro, centrosDisponibles } = useCentro();
  const { state } = useSidebar();

  // Efecto para verificar si no hay centros disponibles y recargar la página
  useEffect(() => {
    // Solo recargar si la lista de centros existe pero está vacía
    if (centrosDisponibles && centrosDisponibles.length === 0) {
      window.location.reload();
    }
  }, [centrosDisponibles]); // Dependencia del efecto

  return (
    <>
      <div className="flex items-center gap-2 p-2 rounded-md text-sidebar-primary-foreground shadow-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-md text-primary-foreground">
          <AppLogoIcon className="w-5 h-5" />
        </div>

        {state !== "collapsed" && centrosDisponibles && centrosDisponibles.length > 0 && (
          <select
            value={centro?.id ?? ''}
            onChange={(e) => {
              const selected = centrosDisponibles.find((s) => s.id === Number(e.target.value));
              if (selected) setCentro(selected);
            }}
            className="ml-1 flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm font-medium text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {centrosDisponibles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.Nombre}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}