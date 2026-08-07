import { useEffect } from 'react';
import AppRoutes from './routes';
import BetaWarningModal from './components/BetaWarningModal';
import './App.css';

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
      <BetaWarningModal />
      <AppRoutes />
    </>
  );
}

export default App;
