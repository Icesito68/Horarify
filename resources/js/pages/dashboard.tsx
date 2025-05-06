import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Table from './calendar/table';
import { useCentro } from '@/providers/centroProvider';

export default function Dashboard() {
      const { centro } = useCentro();
      const centroNombre = centro?.Nombre ?? 'Centro';
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
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendario" />
            <div className="bg-card text-card-foreground shadow-md rounded-xl p-6">
                <Table />
            </div>
        </AppLayout>
    );
}
