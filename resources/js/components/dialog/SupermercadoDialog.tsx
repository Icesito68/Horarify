import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Supermercado } from '@/types/supermercado';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  confirmLabel: string;
  onConfirm: () => void;
  form: Supermercado;
  setForm: (form: Supermercado) => void;
};

export default function SupermercadoDialog({
  open,
  onOpenChange,
  title,
  confirmLabel,
  onConfirm,
  form,
  setForm,
}: Props) {
  const isDisabled = !form.Nombre || !form.Direccion || !form.NIF || !form.Icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card p-4 sm:p-6 w-[90vw] max-w-md">
        <DialogTitle>{title}</DialogTitle>
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Nombre"
            value={form.Nombre}
            onChange={(e) => setForm({ ...form, Nombre: e.target.value })}
          />
          <Input
            placeholder="Dirección"
            value={form.Direccion}
            onChange={(e) => setForm({ ...form, Direccion: e.target.value })}
          />
          <Input
            placeholder="NIF"
            value={form.NIF}
            maxLength={9}
            onChange={(e) => setForm({ ...form, NIF: e.target.value })}
          />
          <Input
            placeholder="Icono"
            value={form.Icon}
            onChange={(e) => setForm({ ...form, Icon: e.target.value })}
          />

          <Button className="w-full" disabled={isDisabled} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
