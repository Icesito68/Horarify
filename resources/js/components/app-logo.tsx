import AppLogoIcon from './app-logo-icon';
import { useCentro } from '../providers/centroProvider';

export default function AppLogo() {
  const { centro, setCentro, centrosDisponibles } = useCentro();

  return (
    <>
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
        <AppLogoIcon className="fill-current text-white dark:text-black" />
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

    </>
  );
}
