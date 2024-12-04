import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './AppTailwindCSS.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  //createHashRouter
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import CanvasDetail from './pages/CanvasDetail';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'canvases/:id',
        element: <CanvasDetail />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
