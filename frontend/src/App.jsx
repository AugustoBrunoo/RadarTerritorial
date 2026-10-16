import { useState, useEffect, Suspense, lazy } from 'react';
import AppRoutes from './routes';
import ScrollToTop from './components/ScrollToTop';

const BetaWarningModal = lazy(() => import('./components/BetaWarningModal'));

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let hasSeen = 'true';
    try {
      hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem('hasSeenBetaModal') : 'true';
    } catch {
      hasSeen = 'true';
    }

    if (!hasSeen) {
      // 1.5s garante que o carregamento inicial (FCP/LCP) conclua totalmente antes de solicitar o modal
      const timer = setTimeout(() => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => setShowModal(true));
        } else {
          setShowModal(true);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      {showModal && (
        <Suspense fallback={null}>
          <BetaWarningModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
      <AppRoutes />
    </>
  );
}

export default App;
