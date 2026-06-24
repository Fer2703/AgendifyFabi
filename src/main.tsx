import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import App from './pages/App.tsx'
import Agregar from './pages/Agregar.tsx'
import DiaTareas from './pages/DiaTareas.tsx'
import Layout from './components/Layout.tsx'

// Sistema de rutas con animaciones
function AnimatedRoutes({ onShowModal, refreshKey, handleDeleteTask }: { onShowModal: (id: number) => void, refreshKey: number, handleDeleteTask: (id: number) => void }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Página principal */}
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.22 }}
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 10, background: 'transparent' }}
          >
            <App />
          </motion.div>
        } />
        
        {/* Página de agregar tarea */}
        <Route path="/agregar" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.22 }}
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 10, background: 'transparent' }}
          >
            <Agregar />
          </motion.div>
        } />
        
        {/* Página de tareas del día */}
        <Route path="/diatareas" element={
          <motion.div
            key={refreshKey}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.22 }}
            style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 10, background: 'transparent' }}
          >
            <DiaTareas onShowModal={onShowModal} onDeleteTask={handleDeleteTask} />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function LoadingScreen() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(1deg, #A5D6A7 -22.66%, #43A047 41.7%)" }}
    >
      <motion.img
        src="/logo.svg"
        alt="Agendify Logo"
        className="w-80 h-56 transform left-1/2 -translate-x-1/2 top-[33%] absolute"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
      />
    </div>
  );
}

function MainApp() {
  const [loading, setLoading] = useState(true);

  // Cargar tasks.json al inicio si no existe en localStorage
  useEffect(() => {
    if (!localStorage.getItem('tasks')) {
      fetch('/data/tasks.json')
        .then(res => res.json())
        .then((data) => {
          localStorage.setItem('tasks', JSON.stringify(data));
        });
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <StrictMode>
      <BrowserRouter>
        <Layout>
          {({ refreshKey, handleDeleteTask }) => (
            <AnimatedRoutes onShowModal={handleDeleteTask} refreshKey={refreshKey} handleDeleteTask={handleDeleteTask} />
          )}
        </Layout>
      </BrowserRouter>
    </StrictMode>
  );
}

// Renderizado principal
createRoot(document.getElementById('root')!).render(
  <MainApp />
)
