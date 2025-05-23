import { useEffect, useState } from 'react';
import { useCentro } from '@/providers/centroProvider';
import { generarHorario } from '@/components/GenerarHorario';
import { Button } from '@/components/ui/button';
import { CalendarClock, Pencil, Trash2, Save, X } from 'lucide-react';
import { axiosGet, axiosPut } from '@/lib/axios';
import { Input } from '@/components/ui/input';

const headers = ['Nombre', 'Apellidos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

type Horario = {
  id: number;
  empleado_id: number;
  supermercado_id: number;
  Inicio_Semana: string;
  Lunes: string;
  Martes: string;
  Miercoles: string;
  Jueves: string;
  Viernes: string;
  Sabado: string;
  Domingo: string;
};

type Empleado = {
  id: number;
  DNI: string;
  Nombre: string;
  Apellidos: string;
  Turno: string;
};

type HorarioConEmpleado = Horario & {
  empleado: Empleado | undefined;
};

export default function Table() {
  const { centro } = useCentro();
  const [horarios, setHorarios] = useState<HorarioConEmpleado[]>([]);
  const [agrupado, setAgrupado] = useState<Map<string, HorarioConEmpleado[]>>(new Map());
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Horario>>({});
  const centroId = Number(centro?.id ?? 1);

  const fetchData = async () => {
    try {
      const [horariosRes, empleadosRes] = await Promise.all([
        axiosGet(`api/supermercados/${centroId}/horarios`),
        axiosGet('api/empleados'),
      ]);

      const empleadosMap = new Map<number, Empleado>(
        empleadosRes.data.data.map((emp: Empleado) => [emp.id, emp])
      );

      const enriched: HorarioConEmpleado[] = horariosRes.data.map((horario: Horario) => ({
        ...horario,
        empleado: empleadosMap.get(horario.empleado_id),
      }));

      setHorarios(enriched);

      const grouped = new Map<string, HorarioConEmpleado[]>();
      enriched.forEach((h) => {
        if (!grouped.has(h.Inicio_Semana)) grouped.set(h.Inicio_Semana, []);
        grouped.get(h.Inicio_Semana)!.push(h);
      });

      setAgrupado(
        new Map(
          [...grouped.entries()].sort(
            ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
          )
        )
      );
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [centroId]);

  const handleAddHorario = async () => {
    try {
      await generarHorario(centroId);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (id: number) => {
    try {
      await axiosPut(`/api/horarios/${id}`, editData);
      setEditandoId(null);
      setEditData({});
      await fetchData();
    } catch (error) {
      console.error('Error actualizando horario:', error);
    }
  };

  return (
    <div className="space-y-10">
      <div className="mb-6 flex items-center justify-start">
        <Button onClick={handleAddHorario} className="font-semibold">
          <CalendarClock className="mr-2 h-4 w-4" />
          Generar horario
        </Button>
      </div>

      {[...agrupado.entries()].map(([inicioSemana, horariosSemana]) => {
        const inicio = new Date(inicioSemana);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);

        return (
          <div key={inicioSemana} className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto">
            <div className="border-b border-border bg-primary text-primary-foreground px-4 py-3 flex justify-center">
              <div className="text-sm sm:text-base font-semibold text-center">
                {inicio.toLocaleDateString()} - {fin.toLocaleDateString()}
              </div>
            </div>

            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="bg-primary text-primary-foreground px-4 py-3 border border-border text-left">
                      {header}
                    </th>
                  ))}
                  <th className="bg-primary text-primary-foreground px-4 py-3 border border-border text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {horariosSemana.map((horario) => {
                  const isEditing = editandoId === horario.id;
                  const updateField = (field: keyof Horario, value: string) =>
                    setEditData((prev) => ({ ...prev, [field]: value }));

                  return (
                    <tr key={horario.id}>
                      <td className="px-4 py-2 border border-border">{horario.empleado?.Nombre || '-'}</td>
                      <td className="px-4 py-2 border border-border">{horario.empleado?.Apellidos || '-'}</td>

                      {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map((dia) => (
                        <td key={dia} className="px-2 py-2 border border-border">
                          {isEditing ? (
                            <Input
                              value={(editData as any)[dia] ?? (horario as any)[dia]}
                              onChange={(e) => updateField(dia as keyof Horario, e.target.value)}
                              className="h-8"
                            />
                          ) : (
                            (horario as any)[dia]
                          )}
                        </td>
                      ))}

                      <td className="px-2 py-2 border border-border">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Button size="icon" onClick={() => handleSave(horario.id)}>
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="secondary" onClick={() => setEditandoId(null)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" onClick={() => {
                              setEditandoId(horario.id);
                              setEditData(horario);
                            }}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="destructive" disabled>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
