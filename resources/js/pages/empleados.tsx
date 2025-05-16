import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useCentro } from '@/providers/centroProvider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

import DialogAddEmpleado from '@/components/dialog/DialogAddEmpleado';
import DialogEditEmpleado from '@/components/dialog/DialogEditEmpleado';
import DialogDeleteEmpleados from '@/components/dialog/DialogDeleteEmpleado';

const headers = ['DNI', 'Nombre', 'Apellidos', 'Turno', 'Email', 'Número'];

type Empleado = {
  id: number;
  DNI: string;
  Nombre: string;
  Apellidos: string;
  Email: string;
  Telefono: string;
  Dia_Libre: string;
  Turno: string;
  Especial: boolean;
  Rotativo: boolean;
  Turno_Rotativo: string;
};

export default function Empleados() {
  const { centro } = useCentro();
  const centroNombre = centro?.Nombre ?? 'Centro';
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmpleadoId, setEditingEmpleadoId] = useState<number | null>(null);

  useEffect(() => {
    if (!centro?.id) return;

    axios
      .get(`/api/supermercados/${centro.id}/empleados`)
      .then((res) => setEmpleados(res.data))
      .catch((err) => console.error('Error cargando empleados:', err));
  }, [centro]);


  const toggleRow = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const openEditEmpleado = (empleadoId: number) => {
    const empleado = empleados.find((e) => e.id === empleadoId);
    if (!empleado) return;

    setEditingEmpleadoId(empleadoId);
    setEditFormData(empleado);
    setShowEditModal(true);
  };

  const [editFormData, setEditFormData] = useState<Empleado>({
    id: 0,
    DNI: '',
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    Dia_Libre: '',
    Turno: '',
    Especial: false,
    Rotativo: false,
    Turno_Rotativo: '',
  });

  const handleChange = (key: string, value: string | boolean) => {
    setEditFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateEmpleado = async () => {
    try {
      const response = await axios.put(`/api/empleados/${editFormData.id}`, editFormData);
      const updatedEmpleado = response.data.data;

      setEmpleados((prev) =>
        prev.map((emp) => (emp.id === updatedEmpleado.id ? updatedEmpleado : emp))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error('Error actualizando empleado:', error);
    }
  };

  const [formData, setFormData] = useState({
    DNI: '',
    Nombre: '',
    Apellidos: '',
    Turno: '',
    Rotativo: false,
    Turno_Rotativo: '',
    supermercado_id: centro?.id ?? 1,
    Telefono: '',
    Horas_Semanales: 40,
    Dia_Libre: '',
    Especial: false,
    Email: '',
  });


  const [isRotativo, setIsRotativo] = useState(false);

  const [horaInicio, setHoraInicio] = useState('');
  const [minutoInicio, setMinutoInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [minutoFin, setMinutoFin] = useState('');

  const [horaInicioRot, setHoraInicioRot] = useState('');
  const [minutoInicioRot, setMinutoInicioRot] = useState('');
  const [horaFinRot, setHoraFinRot] = useState('');
  const [minutoFinRot, setMinutoFinRot] = useState('');

  const handleCreateEmpleado = async () => {
    try {
      const response = await axios.post('/api/empleados', formData);
      const nuevoEmpleado = response.data.data;
      setEmpleados((prev) => [...prev, nuevoEmpleado]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creando empleado:', error);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: centroNombre, href: '/dashboard' }, { title: 'Empleados', href: '/empleados' }]}>
      <Head title="Empleados" />

      <div className="bg-background text-foreground p-6">
        <div className="mb-4 flex flex-wrap gap-2 items-center justify-start">
          <Button onClick={() => setShowAddModal(true)}>Añadir empleado</Button>

          <DialogDeleteEmpleados
            selected={selected}
            setSelected={setSelected}
            empleados={empleados}
            setEmpleados={setEmpleados}
          />

          <DialogAddEmpleado
            open={showAddModal}
            onOpenChange={setShowAddModal}
            formData={formData}
            setFormData={setFormData}
            handleCreateEmpleado={handleCreateEmpleado}
            isRotativo={isRotativo}
            setIsRotativo={setIsRotativo}
            horaInicio={horaInicio}
            minutoInicio={minutoInicio}
            horaFin={horaFin}
            minutoFin={minutoFin}
            setHoraInicio={setHoraInicio}
            setMinutoInicio={setMinutoInicio}
            setHoraFin={setHoraFin}
            setMinutoFin={setMinutoFin}
            horaInicioRot={horaInicioRot}
            minutoInicioRot={minutoInicioRot}
            horaFinRot={horaFinRot}
            minutoFinRot={minutoFinRot}
            setHoraInicioRot={setHoraInicioRot}
            setMinutoInicioRot={setMinutoInicioRot}
            setHoraFinRot={setHoraFinRot}
            setMinutoFinRot={setMinutoFinRot}
          />
        </div>

        <DialogEditEmpleado
          open={showEditModal}
          onOpenChange={setShowEditModal}
          empleadoId={editingEmpleadoId}
          setEmpleados={setEmpleados}
          empleados={empleados}
          data={editFormData}
          onChange={handleChange}
          onSave={handleUpdateEmpleado}
        />

        <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground px-4 py-3 border border-border w-10" />
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
              {empleados.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-4 py-2 border border-border flex items-center gap-2">
                    <Checkbox
                      checked={selected.includes(emp.id)}
                      onCheckedChange={() => toggleRow(emp.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => openEditEmpleado(emp.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </td>
                  <td className="px-4 py-2 border border-border bg-background text-foreground">{emp.DNI}</td>
                  <td className="px-4 py-2 border border-border bg-background text-foreground">{emp.Nombre}</td>
                  <td className="px-4 py-2 border border-border bg-background text-foreground">{emp.Apellidos}</td>
                  <td className="px-4 py-2 border border-border bg-background text-foreground">{emp.Turno}</td>
                  <td className="px-4 py-2 border border-border bg-background text-foreground">{emp.Email}</td>
                  <td className="px-4 py-2 border border-border bg-background text-foreground">{emp.Telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}