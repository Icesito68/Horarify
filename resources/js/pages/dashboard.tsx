import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Table from './calendar/table';
import { CentroProvider, useCentro } from '@/providers/centroProvider';

function DashboardContent() {
  const { centro } = useCentro();
  const centroNombre = centro?.Nombre ?? 'Centro';

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: centroNombre,
      href: '/dashboard',
    },
    {
      title: 'Horarios',
      href: '/dashboard',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Horarios" />
      <div className="bg-card text-card-foreground shadow-md rounded-xl p-6">
        <Table />
      </div>
    </AppLayout>
  );
}

export default function Dashboard() {
  const { props } = usePage();
  const userId = props.auth?.user?.id;

  return (
    <CentroProvider userId={userId}>
      <DashboardContent />
    </CentroProvider>
  );
}
