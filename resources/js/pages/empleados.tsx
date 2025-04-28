import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'; // usa shadcn/ui o similar
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const headers = ['DNI', 'Nombre', 'Turno', 'Rotativo'];

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Empleados',
    href: '/empleados',
  },
];

export default function Empleados() {
  const [selected, setSelected] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isRotativo, setIsRotativo] = useState(false);

  const toggleRow = (index: number) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Empleados" />
      <div className="bg-background text-foreground min-h-screen p-6">
        <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground px-4 py-3 border border-border w-10">
                  {/* Empty for checkboxes */}
                </th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="bg-primary text-primary-foreground px-4 py-3 border border-border text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(9)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 border border-border">
                    <Checkbox
                      checked={selected.includes(i)}
                      onCheckedChange={() => toggleRow(i)}
                    />
                  </td>
                  {headers.map((_, j) => (
                    <td
                      key={j}
                      className="px-4 py-2 border border-border bg-background text-foreground"
                    >
                      {/* Vacío por ahora */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTONES */}
        <div className="mt-4 flex justify-between">
          <Button
            variant="destructive"
            disabled={selected.length === 0}
            onClick={() => alert('Eliminar empleados seleccionados')}
          >
            Borrar empleado
          </Button>

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowModal(true)}>Añadir empleado</Button>
            </DialogTrigger>
            <DialogContent className="bg-card p-6 max-w-lg">
              <DialogTitle className="mb-4">Nuevo Empleado</DialogTitle>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1">DNI</label>
                  <Input placeholder="Ej. 12345678X" />
                </div>

                <div>
                  <label className="block mb-1">Nombre</label>
                  <Input placeholder="Ej. Juan Pérez" />
                </div>

                <div>
                  <label className="block mb-1">Turno</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mañana">Mañana</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="noche">Noche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-1">¿Turno rotativo?</label>
                  <Select onValueChange={(value) => setIsRotativo(value === 'si')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sí o No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isRotativo && (
                  <div>
                    <label className="block mb-1">Turno rotativo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Turno de rotación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mañana">Mañana</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noche">Noche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
}
