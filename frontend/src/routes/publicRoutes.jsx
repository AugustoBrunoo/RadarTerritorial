import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const Home = React.lazy(() => import('../pages/Home/index.jsx'));
const SelectReport = React.lazy(() => import('../pages/SelectReport/index.jsx'));
const AnonymousReport = React.lazy(() => import('../pages/AnonymousReport/index.jsx'));
const Feed = React.lazy(() => import('../pages/Feed/index.jsx'));
const AiAssistant = React.lazy(() => import('../pages/AiAssistant/index.jsx'));
const EmConstrucao = React.lazy(() => import('../pages/EmConstrucao/index.jsx'));
const RelatoDetalhado = React.lazy(() => import('../pages/RelatoDetalhado/index.jsx'));
const TermosDeUso = React.lazy(() => import('../pages/TermosDeUso/index.jsx'));
const Dashboard = React.lazy(() => import('../pages/Dashboard/index.jsx'));
const DashboardOrgao = React.lazy(() => import('../pages/DashboardOrgao/index.jsx'));

const Fallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
    <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
  </div>
);

export const publicRoutes = [
  { path: "/", element: <Suspense fallback={<Fallback />}><Home /></Suspense> },
  { path: "/reportar", element: <Suspense fallback={<Fallback />}><SelectReport /></Suspense> },
  { path: "/reportar/anonimo", element: <Suspense fallback={<Fallback />}><AnonymousReport /></Suspense> },
  { path: "/termos", element: <Suspense fallback={<Fallback />}><TermosDeUso /></Suspense> },
  { path: "/feed", element: <Suspense fallback={<Fallback />}><Feed /></Suspense> },
  { path: "/assistente-ia", element: <Suspense fallback={<Fallback />}><AiAssistant /></Suspense> },
  { path: "/dashboard", element: <Suspense fallback={<Fallback />}><Dashboard /></Suspense> },
  { path: "/dashboard-orgao", element: <Suspense fallback={<Fallback />}><DashboardOrgao /></Suspense> },
  { path: "/painel-orgao", element: <Suspense fallback={<Fallback />}><DashboardOrgao /></Suspense> },
  { path: "/gestao", element: <Suspense fallback={<Fallback />}><DashboardOrgao /></Suspense> },
  { path: "/em-construcao", element: <Suspense fallback={<Fallback />}><EmConstrucao /></Suspense> },
  { path: "/relato/:id", element: <Suspense fallback={<Fallback />}><RelatoDetalhado /></Suspense> },
  { path: "*", element: <Suspense fallback={<Fallback />}><EmConstrucao /></Suspense> },
];
