import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { CentroProvider } from './providers/centroProvider';
import { Bugfender } from '@bugfender/sdk';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    Bugfender.init({
    appKey: import.meta.env.VITE_BUGFENDER,
    overrideConsoleMethods: false,
    printToConsole: true,
    registerErrorHandler: true,
    logBrowserEvents: false,
    logUIEvents: false,
    // version: '',
    // build: '',
});

    const userId = props.initialPage.props.auth?.user?.id; // userId

    root.render(
      <CentroProvider userId={userId}>
        <App {...props} />
      </CentroProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});

// Set light / dark mode on load
initializeTheme();
