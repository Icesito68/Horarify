import AppLogoIcon from './app-logo-icon';
import { useCentro } from '../providers/centroProvider';

export default function AppLogo() {
  const { centro, setCentro, centrosDisponibles } = useCentro();

  return (
    <>
      <div className="flex items-center gap-2 p-2 rounded-md text-sidebar-primary-foreground shadow-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-md text-primary-foreground">
          <AppLogoIcon className="w-5 h-5" />
        </div>

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
      </div>
    </>
  );
}
