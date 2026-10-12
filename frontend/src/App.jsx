import { useState, useEffect, Suspense, lazy } from 'react';
import AppRoutes from './routes';

const BetaWarningModal = lazy(() => import('./components/BetaWarningModal'));

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem('hasSeenBetaModal') : 'true';
    if (!hasSeen) {
      const timer = setTimeout(() => setShowModal(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {showModal && (
        <Suspense fallback={null}>
          <BetaWarningModal />
        </Suspense>
      )}
      <AppRoutes />
    </>
  );
}

export default App;
