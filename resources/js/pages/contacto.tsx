import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from '@inertiajs/react';
import { useCentro } from "@/providers/centroProvider";


export default function Contacto() {
  const { centro } = useCentro();
  const centroNombre = centro;

  const Breadcrumbs: BreadcrumbItem[] = [
    {
      title: centroNombre,
      href: '/dashboard',
    },
    {
      title: 'Contacto',
      href: '/Contacto',
    },
  ];

  return (
    <AppLayout breadcrumbs={Breadcrumbs}>
      <Head title={`Contacto - ${centroNombre}`} />
      <div>
        <p>Contacto</p>
      </div>
    </AppLayout>
  );
}
