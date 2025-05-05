import { useEffect, useState } from 'react';
import axios from 'axios';

const headers = [
  'DNI', 'Nombre', 'Apellidos', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
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

export default function Table() {
  const [agrupado, setAgrupado] = useState<[string, Horario[]][]>([]);
  const [empleados, setEmpleados] = useState<Map<number, Empleado>>(new Map());

  useEffect(() => {
    axios.get('api/horarios')
      .then(res => {
        const data: Horario[] = res.data.data;

        // Agrupar por Inicio_Semana
        const map = new Map<string, Horario[]>();
        data.forEach((item) => {
          const key = item.Inicio_Semana;
          if (!map.has(key)) map.set(key, []);
          map.get(key)!.push(item);
        });

        const ordenado = Array.from(map.entries()).sort(
          ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
        );
        setAgrupado(ordenado);

      })
      .catch(err => console.error('Error cargando horarios:', err));
  }, []);

  useEffect(() => {
    axios.get('api/empleados')
      .then(res => {
        const lista = res.data.data as Empleado[];
        const mapa = new Map(lista.map(emp => [emp.id, emp]));
        setEmpleados(mapa);
      })
      .catch(err => console.error('Error cargando empleados:', err));
  }, []);


  return (
    <div className="space-y-10">
      {agrupado.map(([inicioSemana, horarios]) => {
        const inicio = new Date(inicioSemana);
        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);

        return (
          <div
            key={inicioSemana}
            className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto"
          >
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th
                    colSpan={headers.length}
                    className="bg-primary text-primary-foreground px-4 py-3 border border-border text-center"
                  >
                    {inicio.toLocaleDateString()} - {fin.toLocaleDateString()}
                  </th>
                </tr>
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
                {horarios.map((horario) => {
                  const empleado = empleados.get((horario.empleado_id));
                  return (
                    <tr key={`${horario.empleado_id}-${inicioSemana}`}>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{empleado?.DNI}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{empleado?.Nombre}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{empleado?.Apellidos}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Lunes}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Martes}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Miercoles}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Jueves}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Viernes}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Sabado}</td>
                      <td className="px-4 py-2 border border-border bg-background text-foreground">{horario.Domingo}</td>
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
