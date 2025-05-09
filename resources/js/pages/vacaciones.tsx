import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Save, X } from 'lucide-react';
import { useCentro } from '@/providers/centroProvider';

type Empleado = {
  id: number;
  Nombre: string;
  Apellidos: string;
};

type Vacacion = {
  id: number;
  empleado_id: number;
  Fecha_inicio: string;
  Fecha_fin: string;
};

export default function Vacaciones() {
  const { centro } = useCentro();
  const centroId = Number(centro?.id ?? 1);

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [vacaciones, setVacaciones] = useState<Vacacion[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [nuevo, setNuevo] = useState({ empleado_id: '', Fecha_inicio: '', Fecha_fin: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editando, setEditando] = useState({ empleado_id: '', Fecha_inicio: '', Fecha_fin: '' });

  useEffect(() => {
    axios.get(`/api/supermercados/${centroId}/empleados`).then(res => {
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setEmpleados(data);
    });

    axios.get('/api/vacaciones').then(res => {
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setVacaciones(data);
    });
  }, [centroId]);

  const empleadosIds = empleados.map(e => e.id);
  const vacacionesFiltradas = vacaciones.filter(v => empleadosIds.includes(v.empleado_id));

  const getEmpleado = (id: number) =>
    empleados.find((e) => e.id === id) || { Nombre: '—', Apellidos: '' };

  const formatearFecha = (fechaISO: string) => {
    if (!fechaISO) return '—';

    const iso = fechaISO.length === 10 ? `${fechaISO}T00:00:00` : fechaISO;
    const fecha = new Date(iso);

    return isNaN(fecha.getTime())
      ? '—'
      : fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  };

  const agregarVacacion = () => {
    if (!nuevo.empleado_id || !nuevo.Fecha_inicio || !nuevo.Fecha_fin) return;

    axios.post('/api/vacaciones', {
        empleado_id: Number(nuevo.empleado_id),
        Fecha_inicio: nuevo.Fecha_inicio,
        Fecha_fin: nuevo.Fecha_fin,
      })
      .then((res) => {
        setVacaciones((prev) => [...prev, res.data.data]);
        setNuevo({ empleado_id: '', Fecha_inicio: '', Fecha_fin: '' });
      });
  };

  const eliminarSeleccionados = () => {
    if (seleccionados.length === 0) return;

    axios.delete('/api/vacaciones', { data: { ids: seleccionados } }).then(() => {
      setVacaciones((prev) => prev.filter((v) => !seleccionados.includes(v.id)));
      setSeleccionados([]);
    });
  };

  const iniciarEdicion = (vacacion: Vacacion) => {
    setEditandoId(vacacion.id);
    setEditando({
      empleado_id: String(vacacion.empleado_id),
      Fecha_inicio: vacacion.Fecha_inicio?.slice(0, 10) || '',
      Fecha_fin: vacacion.Fecha_fin?.slice(0, 10) || '',
    });
  };
  

  const guardarEdicion = (id: number) => {
    axios
      .put(`/api/vacaciones/${id}`, {
        empleado_id: Number(editando.empleado_id),
        fecha_inicio: editando.Fecha_inicio,
        fecha_fin: editando.Fecha_fin,
      })
      .then((res) => {
        setVacaciones((prev) => prev.map((v) => (v.id === id ? res.data.data : v)));
        setEditandoId(null);
      });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: centro?.Nombre ?? 'Centro', href: '/dashboard' },
        { title: 'Vacaciones', href: '/vacaciones' },
      ]}
    >
      <Head title="Vacaciones" />
      <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto p-6">
        <h2 className="text-lg font-medium mb-4">Crear Vacación</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <select
            value={nuevo.empleado_id}
            onChange={(e) => setNuevo({ ...nuevo, empleado_id: e.target.value })}
            className="rounded-md border border-border bg-background px-2 py-2 text-sm"
          >
            <option value="">Selecciona un empleado</option>
            {empleados.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.Nombre} {emp.Apellidos}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={nuevo.Fecha_inicio}
            onChange={(e) => setNuevo({ ...nuevo, Fecha_inicio: e.target.value })}
          />
          <Input
            type="date"
            value={nuevo.Fecha_fin}
            onChange={(e) => setNuevo({ ...nuevo, Fecha_fin: e.target.value })}
          />
        </div>
        <div className="flex justify-start gap-2 mb-6">
          <Button
            onClick={agregarVacacion}
            disabled={!nuevo.empleado_id || !nuevo.Fecha_inicio || !nuevo.Fecha_fin}
          >
            Añadir Vacación
          </Button>
          <Button
            variant="destructive"
            onClick={eliminarSeleccionados}
            disabled={seleccionados.length === 0}
          >
            Eliminar seleccionados
          </Button>
        </div>

        <table className="min-w-full border-collapse text-sm rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-4 py-3 border border-border w-12" />
              <th className="px-4 py-3 border border-border text-left">Nombre</th>
              <th className="px-4 py-3 border border-border text-left">Apellidos</th>
              <th className="px-4 py-3 border border-border text-left">Inicio</th>
              <th className="px-4 py-3 border border-border text-left">Fin</th>
            </tr>
          </thead>
          <tbody>
            {vacacionesFiltradas.map((v) => {
              const empleado = getEmpleado(v.empleado_id);
              return (
                <tr key={v.id}>
                  <td className="px-4 py-2 border border-border">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={seleccionados.includes(v.id)}
                        onCheckedChange={() =>
                          setSeleccionados((prev) =>
                            prev.includes(v.id)
                              ? prev.filter((i) => i !== v.id)
                              : [...prev, v.id]
                          )
                        }
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => iniciarEdicion(v)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  {editandoId === v.id ? (
                    <>
                      <td className="px-4 py-2 border border-border" colSpan={2}>
                        <select
                          value={editando.empleado_id}
                          onChange={(e) =>
                            setEditando({ ...editando, empleado_id: e.target.value })
                          }
                          className="w-full rounded-md border border-border p-1 text-sm"
                        >
                          {empleados.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                              {emp.Nombre} {emp.Apellidos}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 border border-border">
                        <Input
                          type="date"
                          value={editando.Fecha_inicio}
                          onChange={(e) =>
                            setEditando({ ...editando, Fecha_inicio: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-4 py-2 border border-border flex gap-2 items-center">
                        <Input
                          type="date"
                          value={editando.Fecha_fin}
                          onChange={(e) =>
                            setEditando({ ...editando, Fecha_fin: e.target.value })
                          }
                        />
                        <Button size="icon" onClick={() => guardarEdicion(v.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={() => setEditandoId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border border-border">{empleado.Nombre}</td>
                      <td className="px-4 py-2 border border-border">{empleado.Apellidos}</td>
                      <td className="px-4 py-2 border border-border">
                        {formatearFecha(v.Fecha_inicio)}
                      </td>
                      <td className="px-4 py-2 border border-border">
                        {formatearFecha(v.Fecha_fin)}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
