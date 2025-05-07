import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Empleado } from '@/types';
import { useState } from 'react';

interface Props {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  empleados: Empleado[];
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

export default function DialogDeleteEmpleados({
  selected,
  setSelected,
  empleados,
  setEmpleados,
}: Props) {

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch('/api/empleados', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected }),
      });
  
      setEmpleados(empleados.filter(emp => !selected.includes(emp.id)));
      setSelected([]);
      setOpen(false); // ✅ Cierra el diálogo
    } catch (err) {
      console.error('Error eliminando empleados:', err);
    }
  };  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={selected.length === 0}>
          Borrar empleado
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <p className="mb-4 text-sm text-muted-foreground">
          Vas a eliminar <strong>{selected.length}</strong> empleado
          {selected.length !== 1 ? 's' : ''}. Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
