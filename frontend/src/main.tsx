import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

// Suppress service worker errors in webview/sandboxed environments
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister();
    });
  }).catch(() => {
    // Silently fail if service worker API is not available
  });
}

// Global error handler for service worker registration errors
window.addEventListener('error', (event) => {
  if (event.message?.includes('ServiceWorker') || event.message?.includes('service worker')) {
    event.preventDefault();
  }
}, true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster position="bottom-right" />
    </ThemeProvider>
  </StrictMode>,
)
