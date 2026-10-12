import React, { useEffect, useState, Suspense, lazy } from 'react';

import Header from '../../components/Header';
import Hero from '../../components/Hero';
import ComoFunciona from '../../components/ComoFunciona';
import AppPromo from '../../components/AppPromo';
import Footer from '../../components/Footer';

const InstallModal = lazy(() => import('../../components/InstallModal'));

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });
    const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    useEffect(() => {

        const sections = document.querySelectorAll('section[id], footer[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    setActiveSection(id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        setTimeout(() => {
            const hash = window.location.hash || '#inicio';
            const id = hash.substring(1);
            setActiveSection(id);
        }, 100);

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const openInstallModal = () => setIsInstallModalOpen(true);
    const closeInstallModal = () => setIsInstallModalOpen(false);

    return (
        <div className={`min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white ${isDarkMode ? 'dark' : ''}`}>

            {/* Skip Link para Acessibilidade */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all"
            >
                Pular para o conteúdo principal
            </a>

            <Header
                activeSection={activeSection}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                openInstallModal={openInstallModal}
            />

            <main id="main-content" tabIndex="-1" className="focus:outline-none">
                <Hero />
                <ComoFunciona />
                <AppPromo openInstallModal={openInstallModal} />
                {/* <Ecossistema /> */}
            </main>

            {isInstallModalOpen && (
                <Suspense fallback={null}>
                    <InstallModal
                        isOpen={isInstallModalOpen}
                        onClose={closeInstallModal}
                    />
                </Suspense>
            )}

            <Footer />

        </div>
    );
}
