import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const AuthChoice = React.lazy(() => import('../pages/AuthChoice/index.jsx'));
const Register = React.lazy(() => import('../pages/Register/index.jsx'));
const Login = React.lazy(() => import('../pages/Login/index.jsx'));
const ConfirmacaoSucesso = React.lazy(() => import('../pages/ConfirmacaoSucesso/index.jsx'));
const EsqueciSenha = React.lazy(() => import('../pages/EsqueciSenha/index.jsx'));
const RedefinicaoSenha = React.lazy(() => import('../pages/RedefinicaoSenha/index.jsx'));

const Fallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
    <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
  </div>
);

export const authRoutes = [
  { path: "/acesso", element: <Suspense fallback={<Fallback />}><AuthChoice /></Suspense> },
  { path: "/cadastro", element: <Suspense fallback={<Fallback />}><Register /></Suspense> },
  { path: "/login", element: <Suspense fallback={<Fallback />}><Login /></Suspense> },
  { path: "/confirmacao-sucesso", element: <Suspense fallback={<Fallback />}><ConfirmacaoSucesso /></Suspense> },
  { path: "/esqueci-senha", element: <Suspense fallback={<Fallback />}><EsqueciSenha /></Suspense> },
  { path: "/redefinir-senha", element: <Suspense fallback={<Fallback />}><RedefinicaoSenha /></Suspense> },
];
