import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Home from './pages/Home/index.jsx';
import SelectReport from './pages/SelectReport/index.jsx';
import AnonymousReport from './pages/AnonymousReport/index.jsx';
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reportar" element={<SelectReport />} />
      <Route path="/reportar/anonimo" element={<AnonymousReport />} />
      {/* Adicione mais rotas aqui conforme necessário */}
    </Routes>
  );
}

export default App;
