import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { GestorRoute } from '../components/GestorRoute';

const DashboardOrgao = React.lazy(() => import('../pages/DashboardOrgao/index.jsx'));
const FilaOperacional = React.lazy(() => import('../pages/FilaOperacional/index.jsx'));
const GestaoRelatoDetalhado = React.lazy(() => import('../pages/GestaoRelatoDetalhado/index.jsx'));

const Fallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
    <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
  </div>
);

export const gestorRoutes = [
  {
    path: '/gestao',
    element: <GestorRoute />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Fallback />}><DashboardOrgao /></Suspense>
      },
      {
        path: 'operacional',
        element: <Suspense fallback={<Fallback />}><FilaOperacional /></Suspense>
      },
      {
        path: 'relato/:id',
        element: <Suspense fallback={<Fallback />}><GestaoRelatoDetalhado /></Suspense>
      }
    ]
  }
];
