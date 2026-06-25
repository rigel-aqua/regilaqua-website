import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const root = createRoot(document.getElementById('root')!);

const isAdminDomain = window.location.hostname.startsWith('admin');
const isAdminPath = window.location.pathname.startsWith('/manage');

if (isAdminDomain || isAdminPath) {
  import('./AdminApp').then(({ default: AdminApp }) => {
    root.render(
      <StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <AdminApp />
          </BrowserRouter>
        </HelmetProvider>
      </StrictMode>
    );
  });
} else {
  import('./WebsiteApp').then(({ default: WebsiteApp }) => {
    root.render(
      <StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <WebsiteApp />
          </BrowserRouter>
        </HelmetProvider>
      </StrictMode>
    );
  });
}
