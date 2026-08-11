import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FluidaProvider } from '@fluida/react';
import App from './App';
import './styles/global.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('#root element not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <FluidaProvider>
      <App />
    </FluidaProvider>
  </StrictMode>,
);
