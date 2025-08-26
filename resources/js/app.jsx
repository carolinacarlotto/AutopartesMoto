import './bootstrap';
import '../css/app.css';

import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { NotificationProvider } from './Providers/NotificationProvider.jsx';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <NotificationProvider>
                <App {...props} />
            </NotificationProvider>
        )
    },
})
