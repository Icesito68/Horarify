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
        value={centro}
        onChange={(e) => setCentro(e.target.value)}
        className="ml-1 flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm font-medium text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        {centrosDisponibles.map((nombre) => (
          <option key={nombre} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>
    </>
  );
}
