import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useCentro } from '@/providers/centroProvider';
import { BreadcrumbItem } from '@/types';

const headers = ['Nombre', 'Fecha'];

type Festivo = {
    id: number;
    Nombre: string;
    Fecha: string;
};

export default function DiasFestivos() {
      const { centro } = useCentro();
      const centroNombre = centro;
    const [festivos, setFestivos] = useState<Festivo[]>([]);
    const [nuevo, setNuevo] = useState({ nombre: '', fecha: '' });
    const [seleccionados, setSeleccionados] = useState<number[]>([]);

    const toggleSeleccionado = (index: number) => {
        setSeleccionados((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const eliminarSeleccionados = () => {
        if (seleccionados.length === 0) return;
    
        axios.delete('http://localhost:8080/api/festivos', { data: { ids: seleccionados } })
            .then(() => {
                setFestivos((prev) => prev.filter(f => !seleccionados.includes(f.id)));
                setSeleccionados([]);
            })
            .catch(err => {
                console.error('Error al eliminar festivos:', err);
                alert('No se pudo eliminar. Inténtalo de nuevo.');
            });
    };
    

    const agregarFestivo = () => {
        if (!nuevo.nombre || !nuevo.fecha) return;
    
        const festivoPayload = {
            Nombre: nuevo.nombre,
            Fecha: nuevo.fecha,
            supermercado_id: 1,
        };
    
        axios.post('http://localhost:8080/api/festivos', festivoPayload)
            .then(res => {
                const festivoCreado = res.data.data;
    
                setFestivos(prev => [...prev, festivoCreado]);
    
                setNuevo({ nombre: '', fecha: '' });
            })
            .catch(err => {
                console.error('Error al agregar festivo:', err);
                alert('No se pudo agregar el festivo. Inténtalo de nuevo.');
            });
    };
    
    function formatearFecha(fechaISO: string) {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

      const breadcrumbs: BreadcrumbItem[] = [
        { title: centroNombre, href: '/dashboard' },
        { title: 'Empleados', href: '/empleados' },
      ];
    

    useEffect(() => {
        axios.get('/api/festivos')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.data;
                setFestivos(data);
            })
            .catch(err => console.error('Error al cargar festivos:', err));
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Días Festivos" />
            <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto p-6">
                {/* Formulario para añadir nuevo festivo */}
                <div className="">
                    <h2 className="text-lg font-medium mb-4">Añadir nuevo día festivo</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <Input
                            placeholder="Nombre del festivo"
                            value={nuevo.nombre}
                            maxLength={75}
                            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                        />
                        <Input
                            type="date"
                            value={nuevo.fecha}
                            onChange={(e) => setNuevo({ ...nuevo, fecha: e.target.value })}
                        />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                    <Button onClick={agregarFestivo}>Añadir día festivo</Button>
                    {/* Botón eliminar */}
                    <Button
                        variant="destructive"
                        disabled={seleccionados.length === 0}
                        onClick={eliminarSeleccionados}
                    >
                        Eliminar seleccionados
                    </Button>
                </div>
                </div>

                <h1 className="text-2xl font-semibold mt-6 text-primary border-t border-border">Días Festivos Nacionales</h1>

                {/* Tabla de festivos */}
                <table className="min-w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="w-12 bg-primary text-primary-foreground px-4 py-3 border border-border text-center" />
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
                        {festivos.map((festivo) => (
                            <tr key={festivo.id}>
                                <td className="px-4 py-2 border border-border text-center">
                                    <Checkbox
                                        checked={seleccionados.includes(festivo.id)}
                                        onCheckedChange={() => toggleSeleccionado(festivo.id)}
                                    />
                                </td>
                                <td className="px-4 py-2 border border-border bg-background text-foreground">
                                    {festivo.Nombre}
                                </td>
                                <td className="px-4 py-2 border border-border bg-background text-foreground">
                                    {formatearFecha(festivo.Fecha)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
