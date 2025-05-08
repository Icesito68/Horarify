import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Table from './calendar/table';
import { useCentro } from '@/providers/centroProvider';
import { generarHorario } from '@/components/GenerarHorario';

export default function Dashboard() {
    const { centro } = useCentro();
    const centroNombre = centro?.Nombre ?? 'Centro';
    const centroId = Number(centro?.id ?? 1);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: centroNombre,
            href: '/dashboard',
        },
        {
            title: 'Calendario',
            href: '/dashboard',
        },
    ];

    const handleAddHorario = async () => {
        try {
            await generarHorario(centroId);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendario" />
            <div className="bg-card text-card-foreground shadow-md rounded-xl p-6">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={handleAddHorario}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Generar horario
                    </button>
                </div>
                <Table />
            </div>
        </AppLayout>
    );
}
