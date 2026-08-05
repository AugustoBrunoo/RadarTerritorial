import Home from '../pages/Home/index.jsx';
import SelectReport from '../pages/SelectReport/index.jsx';
import AnonymousReport from '../pages/AnonymousReport/index.jsx';

import AiAssistant from '../pages/AiAssistant/index.jsx';

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/reportar", element: <SelectReport /> },
  { path: "/reportar/anonimo", element: <AnonymousReport /> },
  { path: "/assistente-ia", element: <AiAssistant /> },
];
