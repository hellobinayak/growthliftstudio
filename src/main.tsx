import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// When react-snap has prerendered static markup into #root, hydrate it
// instead of throwing it away with a fresh client render.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
