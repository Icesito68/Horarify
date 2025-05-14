import { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // ← asegúrate que `@` esté configurado en tsconfig
import HorarioDialog from '@/components/dialog/HorarioDialog';
import { useCentro } from '@/providers/centroProvider';
import { generarHorario } from '@/components/GenerarHorario';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const headers = [
  // 'DNI', 
  'Nombre', 'Apellidos', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
  'Viernes', 'Sábado', 'Domingo',
];

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
  const centroId = Number(centro?.id ?? 1);
    const { auth } = usePage<any>().props;
    const userId = auth.user.id;
    console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [horariosRes, empleadosRes] = await Promise.all([
          axios.get(`api/supermercados/${centroId}/horarios`),
          axios.get('api/empleados'),
        ]);

        console.log(centroId)

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

    fetchData();
  }, [centroId]);

  const handleAddHorario = async () => {
    try {
      await generarHorario(centroId);
    } catch (err) {
      console.log(err)
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

      {[...agrupado.entries()].map(([inicioSemana, horarios]) => {
        const inicio = new Date(inicioSemana);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);

        return (
          <div
            key={inicioSemana}
            className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto"
          >
            <div className="border-b border-border bg-primary text-primary-foreground px-4 py-3 flex items-center">
              <div className="flex-1 text-center font-semibold text-sm sm:text-base">
                {inicio.toLocaleDateString()} - {fin.toLocaleDateString()}
              </div>
              <HorarioDialog
                semana={inicioSemana}
                inicio={inicio}
                fin={fin}
                datos={agrupado.get(inicioSemana) || []}
              />

            </div>

            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
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
                {horarios.map((horario) => (
                  <tr key={horario.id}>
                    {/* <td className="px-4 py-2 border border-border">{horario.empleado?.DNI || '-'}</td> */}
                    <td className="px-4 py-2 border border-border">{horario.empleado?.Nombre || '-'}</td>
                    <td className="px-4 py-2 border border-border">{horario.empleado?.Apellidos || '-'}</td>
                    <td className="px-4 py-2 border border-border">{horario.Lunes}</td>
                    <td className="px-4 py-2 border border-border">{horario.Martes}</td>
                    <td className="px-4 py-2 border border-border">{horario.Miercoles}</td>
                    <td className="px-4 py-2 border border-border">{horario.Jueves}</td>
                    <td className="px-4 py-2 border border-border">{horario.Viernes}</td>
                    <td className="px-4 py-2 border border-border">{horario.Sabado}</td>
                    <td className="px-4 py-2 border border-border">{horario.Domingo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
