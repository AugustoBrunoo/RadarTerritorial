import Home from '../pages/Home/index.jsx';
import SelectReport from '../pages/SelectReport/index.jsx';
import AnonymousReport from '../pages/AnonymousReport/index.jsx';
import Feed from '../pages/Feed/index.jsx';
import AiAssistant from '../pages/AiAssistant/index.jsx';
import EmConstrucao from '../pages/EmConstrucao/index.jsx';
import RelatoDetalhado from '../pages/RelatoDetalhado/index.jsx';
import TermosDeUso from '../pages/TermosDeUso/index.jsx';

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/reportar", element: <SelectReport /> },
  { path: "/reportar/anonimo", element: <AnonymousReport /> },
  { path: "/termos", element: <TermosDeUso /> },
  { path: "/feed", element: <Feed /> },
  { path: "/assistente-ia", element: <AiAssistant /> },
  { path: "/em-construcao", element: <EmConstrucao /> },
  { path: "/relato/:id", element: <RelatoDetalhado /> },
  { path: "*", element: <EmConstrucao /> },
];
