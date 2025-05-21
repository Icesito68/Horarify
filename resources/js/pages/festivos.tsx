import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useCentro } from '@/providers/centroProvider';
import { BreadcrumbItem } from '@/types';
import { Pencil, Save, X } from 'lucide-react';
import {axiosGet, axiosPost, axiosPut } from '@/lib/axios';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bugfender } from '@bugfender/sdk';


const headers = ['Nombre', 'Fecha'];

type Festivo = {
    id: number;
    Nombre: string;
    Fecha: string;
};

export default function DiasFestivos() {
    const { centro } = useCentro();
    const centroNombre = centro?.Nombre ?? 'Centro';
    const [festivos, setFestivos] = useState<Festivo[]>([]);
    const [nuevo, setNuevo] = useState({ nombre: '', fecha: '' });
    const [seleccionados, setSeleccionados] = useState<number[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [editandoDatos, setEditandoDatos] = useState({ nombre: '', fecha: '' });
    const centroId = Number(centro?.id ?? 1);
    const token = localStorage.getItem('token');


    const toggleSeleccionado = (index: number) => {
        setSeleccionados((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const eliminarSeleccionados = () => {
        if (seleccionados.length === 0) return;
            axios.delete('/api/festivos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: { ids: seleccionados },
            })
            .then(() => {
                setFestivos((prev) => prev.filter(f => !seleccionados.includes(f.id)));
                setSeleccionados([]);
                Swal.fire({
                  icon: 'success',
                  title: 'Festivo eliminado',
                  text: `Festivos eliminados exitosamente.`,
                });
                Bugfender.log('Festivo creado con exito');
            })
            .catch(err => {
                console.error('Error al eliminar festivos:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'error',
                  text: `Ha ocurrido un error eliminando los festivos.`,
                });
                Bugfender.error('Ha ocurrido un error con los festivos', err);
            });
    };

    const empezarEdicion = (festivo: Festivo) => {
        setEditandoId(festivo.id);
        setEditandoDatos({ nombre: festivo.Nombre, fecha: festivo.Fecha.split('T')[0] }); // solo yyyy-mm-dd
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setEditandoDatos({ nombre: '', fecha: '' });
    };

    const agregarFestivo = () => {
        if (!nuevo.nombre || !nuevo.fecha) return;

        const festivoPayload = {
            Nombre: nuevo.nombre,
            Fecha: nuevo.fecha,
            supermercado_id: centroId,
        };

        axiosPost('/api/festivos', festivoPayload)
            .then(res => {
                const festivoCreado = res.data.data;

                setFestivos(prev => [...prev, festivoCreado]);

                setNuevo({ nombre: '', fecha: '' });

                Swal.fire({
                  icon: 'success',
                  title: 'festivo creado',
                  text: `Fesivo creado exitosamente.`,
                });
                Bugfender.log('Festivo creado con exito');
            })
            .catch(err => {
                console.error('Error al agregar festivo:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'error',
                  text: `Error al crear el nuevo festivo.`,
                });
                Bugfender.error('Ha ocurrido un error con los empleados de un supermercado', err);
            });
    };

    const guardarEdicion = (id: number) => {
        const payload = {
            Nombre: editandoDatos.nombre,
            Fecha: editandoDatos.fecha,
            supermercado_id: 1,
        };

        axiosPut(`/api/festivos/${id}`, payload)
            .then(res => {
                const actualizado = res.data.data;
                setFestivos(prev =>
                    prev.map(f => (f.id === id ? actualizado : f))
                );
                Swal.fire({
                  icon: 'success',
                  title: 'festivo actualizado',
                  text: `Fesivo actualizado exitosamente.`,
                });
                Bugfender.log('Festivo creado con exito');
                cancelarEdicion();
            })
            .catch(err => {
                console.error('Error al actualizar festivo:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'error',
                  text: `Ha ocurrido un problema al actualizar el festivo.`,
                });
                Bugfender.error('Ha ocurrido un error con los festivos', err);
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
        { title: 'Festivos', href: '/empleados' },
    ];


    useEffect(() => {
        axiosGet(`/api/supermercados/${centroId}/festivos`)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.data;
                setFestivos(data);
                Bugfender.log('Festivo creado con exito');
            })
            .catch(err => {
                console.error('Error al cargar festivos:', err)
                Bugfender.error('Ha ocurrido un error con los festivos', err);
            });
    }, [centroId]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Días Festivos" />
            <div className="bg-card text-card-foreground shadow-md rounded-xl overflow-auto p-6">
                {/* Formulario para añadir nuevo festivo */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-4">Añadir nuevo día festivo</h2>

                    <div className="grid md:grid-cols-2 gap-4">
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

                    <div className="mt-4 flex flex-wrap gap-2 items-center justify-start">
                        <Button
                            onClick={agregarFestivo}
                            disabled={!nuevo.nombre || !nuevo.fecha}
                        >
                            Añadir día festivo
                        </Button>

                        <Button
                            variant="destructive"
                            disabled={seleccionados.length === 0}
                            onClick={eliminarSeleccionados}
                        >
                            Eliminar seleccionados
                        </Button>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold mt-6 text-primary border-t border-border text-center">Días Festivos Nacionales</h1>

                <div className="overflow-x-auto rounded-lg mt-2 border border-border max-w-screen-lg mx-auto">
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr>
                                <th className="w-16 bg-primary text-primary-foreground px-4 py-3 text-center rounded-tl-lg">
                                    {/* Encabezado vacío para acciones */}
                                </th>
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        className="bg-primary text-primary-foreground px-4 py-3 text-left"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {festivos.map((festivo) => (
                                <tr key={festivo.id} className="even:bg-muted/50">
                                    <td className="px-3 py-2 text-center align-middle">
                                        <div className="flex items-center justify-center gap-2">
                                            <Checkbox
                                                checked={seleccionados.includes(festivo.id)}
                                                onCheckedChange={() => toggleSeleccionado(festivo.id)}
                                            />
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6"
                                                onClick={() => empezarEdicion(festivo)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>

                                    {editandoId === festivo.id ? (
                                        <>
                                            <td className="px-4 py-2">
                                                <Input
                                                    value={editandoDatos.nombre}
                                                    maxLength={75}
                                                    onChange={(e) =>
                                                        setEditandoDatos({ ...editandoDatos, nombre: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="date"
                                                        value={editandoDatos.fecha}
                                                        onChange={(e) =>
                                                            setEditandoDatos({ ...editandoDatos, fecha: e.target.value })
                                                        }
                                                    />
                                                    <Button size="sm" onClick={() => guardarEdicion(festivo.id)}>
                                                        <Save className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="secondary" onClick={cancelarEdicion}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-2">{festivo.Nombre}</td>
                                            <td className="px-4 py-2">{formatearFecha(festivo.Fecha)}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
