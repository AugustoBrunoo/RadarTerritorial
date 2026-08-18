import React, { Suspense } from 'react';
import { useRoutes } from 'react-router';
import { publicRoutes } from './publicRoutes';
import { authRoutes } from './authRoutes';
import { privateRoutes } from './privateRoutes';
import AdminRoute from '../components/AdminRoute';
import { Loader2 } from 'lucide-react';

const AdminLayout = React.lazy(() => import('../pages/Admin/Layout'));
const AdminDashboard = React.lazy(() => import('../pages/Admin/Dashboard'));
const AdminModeracao = React.lazy(() => import('../pages/Admin/Moderacao'));
const AdminOrgaos = React.lazy(() => import('../pages/Admin/Orgaos'));

const adminRoutes = [
  {
    path: '/admin/*',
    element: (
      <AdminRoute>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          </div>
        }>
          <AdminLayout />
        </Suspense>
      </AdminRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'moderacao',
        element: <AdminModeracao />
      },
      {
        path: 'orgaos',
        element: <AdminOrgaos />
      },
      {
        index: true,
        element: <AdminDashboard />
      }
    ]
  }
];

export default function AppRoutes() {
  const routes = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...privateRoutes,
    ...adminRoutes,
  ]);

  return routes;
}
