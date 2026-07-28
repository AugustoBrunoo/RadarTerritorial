import Home from '../pages/Home/index.jsx';
import SelectReport from '../pages/SelectReport/index.jsx';
import AnonymousReport from '../pages/AnonymousReport/index.jsx';

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/reportar", element: <SelectReport /> },
  { path: "/reportar/anonimo", element: <AnonymousReport /> },
];
