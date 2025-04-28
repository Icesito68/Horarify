import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Table from './calendar/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Suma Norte',
        href: '/dashboard',
    },
    {
        title: 'Calendario',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendario" />
            <div className="bg-card text-card-foreground shadow-md rounded-xl p-6">
                <Table />
            </div>
        </AppLayout>
    );
}
