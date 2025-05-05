import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  const [horarios, setHorarios] = useState<HorarioConEmpleado[]>([]);
  const [agrupado, setAgrupado] = useState<Map<string, HorarioConEmpleado[]>>(new Map());
  const [selectedSemana, setSelectedSemana] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [horariosRes, empleadosRes] = await Promise.all([
          axios.get('api/horarios'),
          axios.get('api/empleados'),
        ]);

        const empleadosMap = new Map<number, Empleado>(
          empleadosRes.data.data.map((emp: Empleado) => [emp.id, emp])
        );

        const enriched: HorarioConEmpleado[] = horariosRes.data.data.map((horario: Horario) => ({
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
  }, []);

  return (
    <div className="space-y-10">
      {[...agrupado.entries()].map(([inicioSemana, horarios]) => {
        const inicio = new Date(inicioSemana);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);

        return (
          <div
            key={inicioSemana}
            className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto"
          >
            <div className="relative border-b border-border bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
              <div className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-center">
                {inicio.toLocaleDateString()} - {fin.toLocaleDateString()}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto hover:bg-primary/20"
                    onClick={() => setSelectedSemana(inicioSemana)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen max-h-screen">
                  <DialogHeader>
                    <DialogTitle className="text-lg mb-4">
                      Horario: {inicio.toLocaleDateString()} - {fin.toLocaleDateString()}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full table-auto border-collapse text-sm">
                      <thead>
                        <tr>
                          {headers.map((header) => (
                            <th
                              key={header}
                              className="bg-primary text-primary-foreground px-4 py-2 border border-border text-left"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(agrupado.get(selectedSemana || '') || []).map((horario) => (
                          <tr key={horario.id}>
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
                </DialogContent>
              </Dialog>
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
