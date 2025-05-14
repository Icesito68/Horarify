import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { CentroProvider } from './providers/centroProvider';
import { AuthProvider } from './providers/AuthContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

  createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
      const root = createRoot(el);

      root.render(
        <AuthProvider>
          <CentroProvider>
            <App {...props} />
          </CentroProvider>
        </AuthProvider>
      );
    },
    progress: {
      color: '#4B5563',
    },
  });

  // Set light / dark mode on load
  initializeTheme();
