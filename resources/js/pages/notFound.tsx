import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from '@inertiajs/react';

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Not Found',
    href: '/NotFound',
  },
];

export default function NotFound() {
  return (
    <AppLayout breadcrumbs={Breadcrumbs}>
      <Head title="Página no encontrada" />
      <section className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
        <div className="text-center max-w-md">
          <h1 className="text-[7rem] font-bold text-muted-foreground select-none">404</h1>
          <p className="text-xl font-medium mb-6">Lo sentimos, no pudimos encontrar esta página.</p>

          <a
            href="/dashboard"
            className="inline-block px-6 py-3 text-base font-semibold rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Volver al inicio
          </a>
        </div>
      </section>

    </AppLayout>
  );
}
