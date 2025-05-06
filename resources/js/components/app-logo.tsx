import AppLogoIcon from './app-logo-icon';
import { useCentro } from '../providers/centroProvider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function AppLogo() {
  const { centro, setCentro, centrosDisponibles } = useCentro();

  return (
    <>
      <div className="flex items-center gap-2 p-2 rounded-md text-sidebar-primary-foreground shadow-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-md text-primary-foreground">
          <AppLogoIcon className="w-5 h-5" />
        </div>

        <Select onValueChange={setCentro} defaultValue={centro}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {centrosDisponibles.map((nombre) => (
              <SelectItem key={nombre} value={nombre}>
                {nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </>
  );
}
