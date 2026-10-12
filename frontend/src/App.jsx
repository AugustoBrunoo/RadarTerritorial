import { useEffect, Suspense, lazy } from 'react';
import AppRoutes from './routes';

const BetaWarningModal = lazy(() => import('./components/BetaWarningModal'));

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <BetaWarningModal />
      </Suspense>
      <AppRoutes />
    </>
  );
}

export default App;
