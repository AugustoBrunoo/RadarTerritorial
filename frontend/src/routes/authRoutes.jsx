import AuthChoice from '../pages/AuthChoice/index.jsx';
import Register from '../pages/Register/index.jsx';
import Login from '../pages/Login/index.jsx';
import ConfirmacaoSucesso from '../pages/ConfirmacaoSucesso/index.jsx';

export const authRoutes = [
  { path: "/acesso", element: <AuthChoice /> },
  { path: "/cadastro", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/confirmacao-sucesso", element: <ConfirmacaoSucesso /> },
];
