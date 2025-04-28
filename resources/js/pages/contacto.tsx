import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from '@inertiajs/react';

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Suma Norte',
    href: '/dashboard',
  },
  {
    title: 'Contacto',
    href: '/Contacto',
  },
];

export default function contacto(){
      return (
        <AppLayout breadcrumbs={Breadcrumbs}>
            <Head title="Contacto">
            </Head>
            <div>
                <p>Contacto</p>
            </div>
        </AppLayout>
      )
}