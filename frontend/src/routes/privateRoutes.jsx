import PrimeiroAcesso from '../pages/PrimeiroAcesso/index.jsx';
import LoggedReport from '../pages/LoggedReport/index.jsx';
import CentralCidadao from '../pages/CentralCidadao/index.jsx';
import DemandasUsuario from '../pages/DemandasUsuario/index.jsx';
import RelatoDetalhado from '../pages/RelatoDetalhado/index.jsx';
import ProtectedRoute from '../components/ProtectedRoute/index.jsx';

export const privateRoutes = [
  { path: "/bem-vindo", element: <ProtectedRoute><PrimeiroAcesso /></ProtectedRoute> },
  { path: "/reportar-logado", element: <ProtectedRoute><LoggedReport /></ProtectedRoute> },
  { path: "/central-cidadao", element: <ProtectedRoute><CentralCidadao /></ProtectedRoute> },
  { path: "/demandas-usuario", element: <ProtectedRoute><DemandasUsuario /></ProtectedRoute> },
];
