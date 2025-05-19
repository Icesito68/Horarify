import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Table from './calendar/table';
import { useCentro } from '@/providers/centroProvider';

export default function Dashboard() {
  const { centro } = useCentro();
  const centroNombre = centro?.Nombre ?? 'Centro';
  const { token } = usePage().props as { token?: string };

  console.log("Este es el token",token)
  if (token !== null) {
    localStorage.setItem("token", token);
  } else{
    console.log("El token o ya existe o no se ha recogido")
  }

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
