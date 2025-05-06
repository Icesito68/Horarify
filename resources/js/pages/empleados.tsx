import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCentro } from '@/providers/centroProvider';
import { Pencil } from 'lucide-react';

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
  const centroNombre = centro;
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isRotativo, setIsRotativo] = useState(false);
  const [horaInicio, setHoraInicio] = useState('');
  const [minutoInicio, setMinutoInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [minutoFin, setMinutoFin] = useState('');
  const [horaInicioRot, setHoraInicioRot] = useState('');
  const [minutoInicioRot, setMinutoInicioRot] = useState('');
  const [horaFinRot, setHoraFinRot] = useState('');
  const [minutoFinRot, setMinutoFinRot] = useState('');
  const [editingEmpleadoId, setEditingEmpleadoId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (horaInicio && minutoInicio && horaFin && minutoFin) {
      const inicio = `${horaInicio.padStart(2, '0')}:${minutoInicio.padStart(2, '0')}`;
      const fin = `${horaFin.padStart(2, '0')}:${minutoFin.padStart(2, '0')}`;
      setFormData((prev) => ({ ...prev, Turno: `${inicio} - ${fin}` }));
    }
  }, [horaInicio, minutoInicio, horaFin, minutoFin]);

  useEffect(() => {
    if (horaInicioRot && minutoInicioRot && horaFinRot && minutoFinRot) {
      const inicio = `${horaInicioRot.padStart(2, '0')}:${minutoInicioRot.padStart(2, '0')}`;
      const fin = `${horaFinRot.padStart(2, '0')}:${minutoFinRot.padStart(2, '0')}`;
      setFormData((prev) => ({ ...prev, Turno_Rotativo: `${inicio} - ${fin}` }));
    }
  }, [horaInicioRot, minutoInicioRot, horaFinRot, minutoFinRot]);


  const [formData, setFormData] = useState({
    DNI: '', 
    Nombre: '', 
    Apellidos: '', 
    Turno: '',
    Rotativo: true, 
    Turno_Rotativo: '', 
    supermercado_id: 1,
    Telefono: '', 
    Horas_Semanales: 40,
    Dia_Libre: '', 
    Especial: true,
    Email: '',
  });
  
  const handleCreateEmpleado = async () => {
    try {
      const response = await axios.post('/api/empleados', formData);
      const nuevoEmpleado = response.data.data;
  
      setEmpleados((prev) => [...prev, nuevoEmpleado]);
      setShowModal(false);
    } catch (error) {
      console.error('Error creando empleado:', error);
    }
  };

  const handleUpdateEmpleado = async () => {
    if (editingEmpleadoId === null) {
      console.error('No employee ID specified for update.');
      return;
    }
  
    try {
      const empleadoId = editingEmpleadoId;
  
      const response = await axios.put(`/api/empleados/${empleadoId}`, editFormData);
      const updatedEmpleado = response.data.data;
  
      setEmpleados((prev) =>
        prev.map((emp) => (emp.id === empleadoId ? updatedEmpleado : emp))
      );
      setShowEditModal(false);
      setEditingEmpleadoId(null); 
    } catch (error) {
      console.error('Error actualizando empleado:', error);
    }
  };
  
  
  const handleDeleteEmpleados = async () => {
    if (selected.length === 0) return;
  
    try {
      await axios.delete('/api/empleados', {
        data: { ids: selected },
      });
  
      setEmpleados((prev) => prev.filter((emp) => !selected.includes(emp.id)));
      setSelected([]);
    } catch (error) {
      console.error('Error eliminando empleados:', error);
    }
  };

  const openEditEmpleado = (empleadoId: number) => {
    const empleado = empleados.find((emp) => emp.id === empleadoId);
    if (!empleado) return;
  
    setEditingEmpleadoId(empleadoId);
    setEditFormData({
      ...formData,
      DNI: empleado.DNI,
      Nombre: empleado.Nombre,
      Apellidos: empleado.Apellidos,
      Email: empleado.Email,
      Telefono: empleado.Telefono,
      Turno: empleado.Turno,
      Dia_Libre: empleado.Dia_Libre,
      Rotativo: empleado.Rotativo, 
      // Turno_Rotativo: empleado.Turno_Rotativo, 
      supermercado_id: 1,
      Horas_Semanales: 40,
      Especial: empleado.Especial,
    });
  
    setShowEditModal(true);
  };
  
  const [editFormData, setEditFormData] = useState<typeof formData>(formData);
  

  const breadcrumbs: BreadcrumbItem[] = [
    { title: centroNombre, href: '/dashboard' },
    { title: 'Empleados', href: '/empleados' },
  ];

  const toggleRow = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    axios.get('api/supermercados/1/empleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.error('Error cargando empleados:', err));
  }, []);

  console.log(empleados)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Empleados" />
      
      <div className="bg-background text-foreground p-6">

        {/* BOTONES */}
        <div className="mb-4 flex justify-between flex-wrap gap-2">
          <div className="flex gap-2">
          <Button
            variant="destructive"
            disabled={selected.length === 0}
            onClick={handleDeleteEmpleados}
          >
            Borrar empleado
          </Button>
          </div>

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowModal(true)}>Añadir empleado</Button>
            </DialogTrigger>
            <DialogContent className="bg-card p-6 max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogTitle className="mb-4">Nuevo Empleado</DialogTitle>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1">DNI</label>
                  <Input 
                  value={formData.DNI}
                  onChange={(e) => setFormData({ ...formData, DNI: e.target.value })}
                  placeholder="Ej. 12345678X" />
                </div>

                <div>
                  <label className="block mb-1">Nombre</label>
                  <Input
                  value={formData.Nombre}
                  onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                  placeholder="Ej. Juan" />
                </div>

                <div>
                  <label className="block mb-1">Apellidos</label>
                  <Input 
                  value={formData.Apellidos}
                  onChange={(e) => setFormData({ ...formData, Apellidos: e.target.value })}
                  placeholder="Ej. Pérez Gómez" />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <Input 
                  value={formData.Email}
                  onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                  placeholder="Ej. Pérez Gómez" />
                </div>

                <div>
                  <label className="block mb-1">Telefono</label>
                  <Input 
                  value={formData.Telefono}
                  onChange={(e) => setFormData({ ...formData, Telefono: e.target.value })}
                  placeholder="Ej. Pérez Gómez" />
                </div>

                <div>
                  <label className="block mb-1">Día libre</label>
                  <Select onValueChange={(value) => setFormData({ ...formData, Dia_Libre: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un Dia libre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lunes">Lunes</SelectItem>
                      <SelectItem value="Martes">Martes</SelectItem>
                      <SelectItem value="Miercoles">Miercoles</SelectItem>
                      <SelectItem value="Jueves">Jueves</SelectItem>
                      <SelectItem value="Viernes">Viernes</SelectItem>
                      <SelectItem value="Sabado">Sabado</SelectItem>
                      <SelectItem value="Domingo">Domingo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-1">Turno</label>
                    <div>
                    <div className="flex gap-2">
                      {/* Hora Inicio */}
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoInicio}
                        onChange={(e) => setMinutoInicio(e.target.value)}
                      />
                      <span className="self-center">-</span>
                      {/* Hora Fin */}
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoFin}
                        onChange={(e) => setMinutoFin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">¿Es un empleado especial?</label>
                  <Select onValueChange={(value) => {
                    const rotativoValue = value === 'si';
                    setIsRotativo(rotativoValue);
                    setFormData((prev) => ({ ...prev, Especial: rotativoValue }));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sí o No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-1">¿Turno rotativo?</label>
                  <Select onValueChange={(value) => {
                    const rotativoValue = value === 'si';
                    setIsRotativo(rotativoValue);
                    setFormData((prev) => ({ ...prev, Rotativo: rotativoValue }));
                  }}>
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
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaInicioRot}
                        onChange={(e) => setHoraInicioRot(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoInicioRot}
                        onChange={(e) => setMinutoInicioRot(e.target.value)}
                      />
                      <span className="self-center">-</span>
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaFinRot}
                        onChange={(e) => setHoraFinRot(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoFinRot}
                        onChange={(e) => setMinutoFinRot(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              <Button
                onClick={handleCreateEmpleado}
                className="mt-4 w-full"
                disabled={
                  !formData.DNI ||
                  !formData.Nombre ||
                  !formData.Apellidos ||
                  !formData.Turno ||
                  !formData.Email ||
                  !formData.Telefono ||
                  !formData.Dia_Libre ||
                  !formData.Especial ||
                  !formData.Rotativo

                }
              >
                Crear empleado
              </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showEditModal}
            onOpenChange={(isOpen) => {
              setShowEditModal(isOpen);
              if (!isOpen) {
                setEditingEmpleadoId(null);
              }
            }}
          >
            <DialogContent className="bg-card p-6 max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogTitle className="mb-4">Editar Empleado</DialogTitle>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1">DNI</label>
                  <Input 
                    value={editFormData.DNI}
                    onChange={(e) => setEditFormData({ ...editFormData, DNI: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1">Nombre</label>
                  <Input 
                    value={editFormData.Nombre}
                    onChange={(e) => setEditFormData({ ...editFormData, Nombre: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1">Apellidos</label>
                  <Input 
                    value={editFormData.Apellidos}
                    onChange={(e) => setEditFormData({ ...editFormData, Apellidos: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <Input 
                    value={editFormData.Email}
                    onChange={(e) => setEditFormData({ ...editFormData, Email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1">Teléfono</label>
                  <Input 
                    value={editFormData.Telefono}
                    onChange={(e) => setEditFormData({ ...editFormData, Telefono: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1">Día libre</label>
                  <Select value={editFormData.Dia_Libre} onValueChange={(value) => setEditFormData({ ...editFormData, Dia_Libre: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un Día libre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lunes">Lunes</SelectItem>
                      <SelectItem value="Martes">Martes</SelectItem>
                      <SelectItem value="Miercoles">Miercoles</SelectItem>
                      <SelectItem value="Jueves">Jueves</SelectItem>
                      <SelectItem value="Viernes">Viernes</SelectItem>
                      <SelectItem value="Sabado">Sabado</SelectItem>
                      <SelectItem value="Domingo">Domingo</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => {
                    const rotativoValue = value === 'si';
                    setIsRotativo(rotativoValue);
                    setEditFormData((prev) => ({ ...prev, Rotativo: rotativoValue }));
                    }}>
                  </Select>

                  <div>
                  <label className="block mb-1">Turno</label>
                    <div>
                    <div className="flex gap-2">
                      {/* Hora Inicio */}
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoInicio}
                        onChange={(e) => setMinutoInicio(e.target.value)}
                      />
                      <span className="self-center">-</span>
                      {/* Hora Fin */}
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoFin}
                        onChange={(e) => setMinutoFin(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                  <label className="block mb-1">¿Es un empleado especial?</label>
                  <Select onValueChange={(value) => {
                    const rotativoValue = value === 'si';
                    setIsRotativo(rotativoValue);
                    setEditFormData((prev) => ({ ...prev, Especial: rotativoValue }));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sí o No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1">¿Turno rotativo?</label>
                  <Select onValueChange={(value) => {
                    const rotativoValue = value === 'si';
                    setIsRotativo(rotativoValue);
                    setEditFormData((prev) => ({ ...prev, Rotativo: rotativoValue }));
                  }}>
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
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaInicioRot}
                        onChange={(e) => setHoraInicioRot(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoInicioRot}
                        onChange={(e) => setMinutoInicioRot(e.target.value)}
                      />
                      <span className="self-center">-</span>
                      <Input
                        type="number"
                        placeholder="HH"
                        min="0"
                        max="23"
                        className="w-16"
                        value={horaFinRot}
                        onChange={(e) => setHoraFinRot(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="MM"
                        min="0"
                        max="59"
                        className="w-16"
                        value={minutoFinRot}
                        onChange={(e) => setMinutoFinRot(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                </div>


                </div>

                  <Button
                    onClick={handleUpdateEmpleado}
                    className="mt-4 w-full"
                    disabled={
                      !editFormData.DNI ||
                      !editFormData.Nombre ||
                      !editFormData.Apellidos ||
                      !editFormData.Email ||
                      !editFormData.Telefono ||
                      !editFormData.Dia_Libre
                    }
                  >
                    Guardar cambios
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

        </div>
        {/* FIN BOTONES */}


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
                  <td className="px-4 py-2 border border-border">
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
