import { useRoutes } from 'react-router';
import { publicRoutes } from './publicRoutes';
import { authRoutes } from './authRoutes';
import { privateRoutes } from './privateRoutes';

export default function AppRoutes() {
  const routes = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...privateRoutes,
  ]);

  return routes;
}
