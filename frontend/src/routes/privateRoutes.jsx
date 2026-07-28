import PrimeiroAcesso from '../pages/PrimeiroAcesso/index.jsx';
import LoggedReport from '../pages/LoggedReport/index.jsx';
import CentralCidadao from '../pages/CentralCidadao/index.jsx';

export const privateRoutes = [
  { path: "/bem-vindo", element: <PrimeiroAcesso /> },
  { path: "/reportar-logado", element: <LoggedReport /> },
  { path: "/central-cidadao", element: <CentralCidadao /> },
];
