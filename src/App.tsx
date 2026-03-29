import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Products from './components/Products';
import WebArtifacts from './components/WebArtifacts';
import CaseStudies from './components/CaseStudies';
import Recommendations from './components/Recommendations';
import AdminPanel from './components/AdminPanel';
import ProjectPage from './components/ProjectPage';
import { AlgoArtAccent } from './components/AlgoArt';

function AdminToggle() {
  const { isAdmin, toggleAdmin } = useAdmin();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); toggleAdmin(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleAdmin]);

  return (
    <button onClick={toggleAdmin} title="Toggle Admin Mode (Ctrl+Shift+A)"
      className={`fixed bottom-6 right-6 z-[150] w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-lg group
        ${isAdmin ? 'bg-indigo-500 border-indigo-400 shadow-indigo-500/30' : 'bg-zinc-900 border-zinc-700 hover:border-indigo-500/50 hover:bg-zinc-800 shadow-black/30'}`}>
      <span className={`text-lg transition-transform group-hover:scale-110 ${isAdmin ? 'text-white' : 'text-zinc-400'}`}>
        {isAdmin ? '✕' : '⚙'}
      </span>
    </button>
  );
}

function PortfolioHome() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="relative w-full bg-zinc-950 min-h-screen text-slate-200 selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden flex flex-col">
        <Hero />
        <div className="h-48 relative overflow-hidden">
          <AlgoArtAccent variant="web" />
        </div>
        <Experience />
        <Certifications />
        <div className="h-40 relative overflow-hidden">
          <AlgoArtAccent variant="pulse" />
        </div>
        <Products />
        <WebArtifacts />
        <CaseStudies />
        <Recommendations />
      </main>
      <AdminToggle />
      <AdminPanel />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/projects/:id" element={
              <div className="bg-zinc-950 min-h-screen text-slate-200 selection:bg-indigo-500/30">
                <ProjectPage />
                <AdminToggle />
                <AdminPanel />
              </div>
            } />
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
