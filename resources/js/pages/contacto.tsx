import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from '@inertiajs/react';


export default function Contacto() {

  const Breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Contacto',
      href: '/Contacto',
    },
  ];

  return (
    <AppLayout breadcrumbs={Breadcrumbs}>
      <Head title={`Contacto`} />
      <form action="https://fabform.io/f/xxxxx" method="post">
        <section className="pt-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-8">


              {/* <!-- Imagen + info lateral --> */}
              <div className="lg:mb-0 mb-10 max-h-[600px] h-64 sm:h-[400px] lg:h-full">
                <div className="relative rounded-b-2xl lg:rounded-l-2xl rounded-2xl h-full overflow-hidden bg-primary">
                  <img
                    src="/multimedia/foto-contacto.jpg"
                    alt="Contact section"
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  />
                  <h1 className="absolute top-11 left-11 text-white text-4xl font-bold">
                    Contacta con nosotros
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-card text-card-foreground rounded-lg p-6 shadow">
                      <a href="tel:470-601-1911" className="flex items-center mb-6">
                        📞
                        <span className="ml-4">470-601-1911</span>
                      </a>
                      <a
                        href="https://veilmail.io/irish-geoff"
                        className="flex items-center mb-6"
                      >
                        📧
                        <span className="ml-4">https://veilmail.io/irish-geoff</span>
                      </a>
                      <a href="#" className="flex items-center">
                        📍
                        <span className="ml-4">654 Sycamore Avenue, Meadowville, WA</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Formulario --> */}
              <div className="bg-card text-card-foreground p-4 sm:p-6 lg:p-11 rounded-2xl shadow mt-4 lg:mt-0">
                <h2 className="text-3xl font-semibold text-primary mb-10">Envíanos un mensaje</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="w-full h-12 rounded-md px-4 mb-6 bg-background text-foreground border border-border focus:outline-none text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-12 rounded-md px-4 mb-6 bg-background text-foreground border border-border focus:outline-none text-sm"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  className="w-full h-12 rounded-md px-4 mb-6 bg-background text-foreground border border-border focus:outline-none text-sm"
                />

                <div className="mb-6">
                  <p className="text-muted-foreground mb-2 text-sm">
                    ¿Cómo prefieres que te contactemos?
                  </p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                      <input type="radio" name="contact_method" value="email" />
                      Email
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                      <input type="radio" name="contact_method" value="phone" />
                      Teléfono
                    </label>
                  </div>
                </div>

                <textarea
                  name="message"
                  placeholder="Mensaje"
                  className="w-full rounded-md px-4 py-2 bg-background text-foreground border border-border focus:outline-none mb-6"
                ></textarea>

                <button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground rounded-md font-semibold hover:opacity-90 transition-all"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>

    </AppLayout>
  );
}
