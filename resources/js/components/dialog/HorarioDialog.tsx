import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const headersModal = [
    'Acciones', 'Nombre', 'Apellidos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo',
];

type HorarioDialogProps = {
    semana: string;
    inicio: Date;
    fin: Date;
    datos: {
        id: number;
        empleado?: {
            Nombre: string;
            Apellidos: string;
        };
        Lunes: string;
        Martes: string;
        Miercoles: string;
        Jueves: string;
        Viernes: string;
        Sabado: string;
        Domingo: string;
    }[];
};

export default function HorarioDialog({ semana, inicio, fin, datos }: HorarioDialogProps) {
    const [horarios, setHorarios] = useState(datos);

    async function handleDeleteHorario(id: number) {

        try {
            const response = await fetch(`/api/horarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el horario');
            }

            setHorarios(prev => prev.filter(horario => horario.id !== id));
        } catch (error) {
            console.error(error);
            alert('Hubo un error al eliminar el horario');
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto hover:bg-primary/20"
                >
                    <Eye className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="!max-w-[90vw] !w-[90vw]">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg mb-4">
                        {inicio.toLocaleDateString()} - {fin.toLocaleDateString()}
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full table-auto border-collapse text-sm">
                        <thead>
                            <tr>
                                {headersModal.map((header) => (
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
                            {horarios.map((horario) => (
                                <tr key={horario.id}>
                                    <td className="px-4 py-2 border border-border space-x-2">
                                        <Button variant="outline" size="icon">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDeleteHorario(horario.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </td>
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
    );
}
