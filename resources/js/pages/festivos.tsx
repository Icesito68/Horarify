import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const headers = ['Nombre', 'Fecha'];

export default function DiasFestivos() {
    const [festivos, setFestivos] = useState([
        { nombre: 'Año Nuevo', fecha: '2025-01-01' },
        { nombre: 'Navidad', fecha: '2025-12-25' },
    ]);

    const [nuevo, setNuevo] = useState({ nombre: '', fecha: '' });
    const [seleccionados, setSeleccionados] = useState<number[]>([]);

    const toggleSeleccionado = (index: number) => {
        setSeleccionados((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const eliminarSeleccionados = () => {
        setFestivos((prev) => prev.filter((_, i) => !seleccionados.includes(i)));
        setSeleccionados([]);
    };

    const agregarFestivo = () => {
        if (!nuevo.nombre || !nuevo.fecha) return;
        setFestivos([...festivos, nuevo]);
        setNuevo({ nombre: '', fecha: '' });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Días Festivos', href: '/dias-festivos' }]}>
            <Head title="Días Festivos" />
            <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto p-6">
                {/* Formulario para añadir nuevo festivo */}
                <div className="">
                    <h2 className="text-lg font-medium mb-4">Añadir nuevo día festivo</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <Input
                            placeholder="Nombre del festivo"
                            value={nuevo.nombre}
                            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                        />
                        <Input
                            type="date"
                            value={nuevo.fecha}
                            onChange={(e) => setNuevo({ ...nuevo, fecha: e.target.value })}
                        />
                    </div>
                    <Button onClick={agregarFestivo}>Añadir día festivo</Button>
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
                        {festivos.map((festivo, i) => (
                            <tr key={i}>
                                <td className="px-4 py-2 border border-border text-center">
                                    <Checkbox
                                        checked={seleccionados.includes(i)}
                                        onCheckedChange={() => toggleSeleccionado(i)}
                                    />
                                </td>
                                <td className="px-4 py-2 border border-border bg-background text-foreground">
                                    {festivo.nombre}
                                </td>
                                <td className="px-4 py-2 border border-border bg-background text-foreground">
                                    {festivo.fecha}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Botón eliminar */}
                <div className="mt-4 flex justify-between items-center">
                    <Button
                        variant="destructive"
                        disabled={seleccionados.length === 0}
                        onClick={eliminarSeleccionados}
                    >
                        Eliminar seleccionados
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
