import React, { Suspense } from 'react';
import ProtectedRoute from '../components/ProtectedRoute/index.jsx';
import { Loader2 } from 'lucide-react';

const PrimeiroAcesso = React.lazy(() => import('../pages/PrimeiroAcesso/index.jsx'));
const LoggedReport = React.lazy(() => import('../pages/LoggedReport/index.jsx'));
const CentralCidadao = React.lazy(() => import('../pages/CentralCidadao/index.jsx'));
const DemandasUsuario = React.lazy(() => import('../pages/DemandasUsuario/index.jsx'));
const Settings = React.lazy(() => import('../pages/Settings/index.jsx'));

const Fallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
    <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
  </div>
);

export const privateRoutes = [
  { path: "/bem-vindo", element: <ProtectedRoute><Suspense fallback={<Fallback />}><PrimeiroAcesso /></Suspense></ProtectedRoute> },
  { path: "/reportar-logado", element: <ProtectedRoute><Suspense fallback={<Fallback />}><LoggedReport /></Suspense></ProtectedRoute> },
  { path: "/central-cidadao", element: <ProtectedRoute><Suspense fallback={<Fallback />}><CentralCidadao /></Suspense></ProtectedRoute> },
  { path: "/demandas-usuario", element: <ProtectedRoute><Suspense fallback={<Fallback />}><DemandasUsuario /></Suspense></ProtectedRoute> },
  { path: "/configuracoes", element: <ProtectedRoute><Suspense fallback={<Fallback />}><Settings /></Suspense></ProtectedRoute> },
];
