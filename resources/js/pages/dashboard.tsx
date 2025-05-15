import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Table from './calendar/table';
import { CentroProvider } from '@/providers/centroProvider'; // Asegúrate de exportarlo

export default function Dashboard() {
    const { props } = usePage();
    const userId = props.auth?.user?.id;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: props.auth?.user?.name ?? 'Usuario',
            href: '/dashboard',
        },
        {
            title: 'Horarios',
            href: '/dashboard',
        },
    ];

    return (
        <CentroProvider userId={userId}> {/* ✅ pasar el ID aquí */}
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Horarios" />
                <div className="bg-card text-card-foreground shadow-md rounded-xl p-6">
                    <Table />
                </div>
            </AppLayout>
        </CentroProvider>
    );
}
