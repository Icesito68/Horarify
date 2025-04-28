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
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-lg mb-8">La página que buscas no existe.</p>
            </div>
        </AppLayout>        
    );
}
