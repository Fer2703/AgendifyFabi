import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import App from './pages/App.tsx'
import Agregar from './pages/Agregar.tsx'
import DiaTareas from './pages/DiaTareas.tsx'
import React, { useState, useEffect } from 'react'
import useIsIphoneSE from './hooks/useIsIphoneSE'

// Header
function Header() {
  const [showAbout, setShowAbout] = React.useState(false);
  const isIphoneSE = useIsIphoneSE();

  const handleMenuClick = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  return (
    <>
      <div className="w-full h-14 bg-blue-700 flex items-center px-4 fixed top-0 z-30">
        <motion.img 
          src="/menu.svg" 
          alt="Menu" 
          className="w-12 h-12 left-2 relative cursor-pointer" 
          onClick={handleMenuClick}
          whileTap={{ scale: 1.25 }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      
      {/* Modal Sobre Nosotros */}
      <AnimatePresence>
        {showAbout && (
          <motion.div 
            className='w-full h-full absolute top-0 left-0 bg-blue-900/80 z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/flecha.svg"
              alt="Retorno"
              className="w-12 h-12 left-2 top-1 relative invert brightness-0 rotate-180 cursor-pointer"
              onClick={handleCloseAbout}
              whileTap={{ scale: 1.25, rotate: -15 }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.div 
              className="w-[85%] h-[65%] sm:h-[40%] left-1/2 transform -translate-x-1/2 top-[69px] absolute bg-white rounded-3xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                duration: 0.5 
              }}
            >
              <div className='w-full h-10 top-6 text-center font-bold text-4xl text-blue-900 absolute'>Sobre nosotros</div>
              <div className={`w-[87%] left-1/2 transform -translate-x-1/2 leading-none top-18 text-center font-bold ${isIphoneSE ? 'text-[1.1rem]' : 'text-2xl'} text-blue-900 absolute`}>
                Este proyecto surge como una iniciativa escolar para mejorar la planificación diaria y la gestión de tiempo. Diseñamos esta página con el objetivo de facilitar el acceso a información estructurada de manera visual y práctica. <br/><br/>Creado por los estudiantes de la U.E.C.P Internacional "Río Caura" Escobar Bárbara, Henández Miguel, Molina Camila y Pérez Fabiana, esperamos que este sistema ayude a organizar tareas de manera eficiente y adaptada a las necesidades del usuario
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Footer
function Footer() {
  return (
    <div className="w-full h-14 bg-blue-700 flex px-4 fixed -bottom-1 z-30"></div>
  );
}

// Header especial para página de agregar
function AgregarHeader() {
  const navigate = useNavigate();
  const [slideOut, setSlideOut] = React.useState(false);
  const [fadeText, setFadeText] = React.useState(false);
  const [fadeArrow, setFadeArrow] = React.useState(false);

  const handleBack = () => {
    setTimeout(() => setFadeArrow(true), 100);
  };

  React.useEffect(() => {
    if (fadeArrow) {
      setFadeText(true);
    }
  }, [fadeArrow]);

  React.useEffect(() => {
    if (slideOut) {
      const timeout = setTimeout(() => navigate(-1), 350);
      return () => clearTimeout(timeout);
    }
  }, [slideOut, navigate]);

  return (
    <div className="w-full h-24 top-0 absolute z-20 pointer-events-none">
      
      {/* Barra superior con botón de retroceso */}
      <div className="w-full h-14 bg-blue-700 flex items-center px-4 fixed top-0 pointer-events-auto z-30">
        <motion.img
          src="/flecha.svg"
          alt="Retorno"
          className="w-12 h-12 left-2 relative invert brightness-0 rotate-180 cursor-pointer z-30"
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
          animate={{ opacity: fadeArrow ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 300, opacity: { duration: 0.5 } }}
          onTap={handleBack}
        />
      </div>
      
      {/* Tarjeta flotante con título */}
      <motion.div
        initial={{ y: -60, opacity: 1 }}
        animate={slideOut ? { y: -60 } : { y: 0 }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
        className="w-72 h-28 left-1/2 transform -translate-x-1/2 top-0 absolute bg-blue-700 rounded-2xl pointer-events-auto z-10"
        onAnimationComplete={() => {
          if (fadeText && !slideOut) setSlideOut(true);
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: fadeText ? 0 : 1 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="w-60 h-8 left-5 top-16 absolute text-center justify-start text-white text-3xl font-bold"
          onAnimationComplete={() => {
            if (fadeText && !slideOut) setSlideOut(true);
          }}
        >
          AÑADIR TAREA
        </motion.div>
      </motion.div>
    </div>
  );
}

// Header especial para página de tareas del día
function DiaTareasHeader() {
  const navigate = useNavigate();
  const [fadeArrow, setFadeArrow] = React.useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const month = params.get('month');
  const year = params.get('year');

  const handleBack = () => {
    setTimeout(() => setFadeArrow(true), 100);
  };

  React.useEffect(() => {
    if (fadeArrow) {
      const timeout = setTimeout(() => {
        if (month !== null && year !== null) {
          navigate(`/?month=${month}&year=${year}`);
        } else {
          navigate('/');
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [fadeArrow, navigate]);

  return (
    <div className="w-full h-14 top-0 absolute z-20">
      
      {/* Barra superior con botón de retroceso */}
      <div className="w-full h-14 bg-blue-700 flex items-center px-4 fixed top-0">
        <motion.img
          src="/flecha.svg"
          alt="Retorno"
          className="w-12 h-12 left-2 relative invert brightness-0 rotate-180 cursor-pointer"
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
          animate={{ opacity: fadeArrow ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 300, opacity: { duration: 0.5 } }}
          onTap={handleBack}
        />
      </div>
    </div>
  );
}

// Layout principal de la aplicación
function Layout({ children }: { children: (args: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>, refreshKey: number, handleDeleteTask: (id: number) => void }) => React.ReactNode }) {
  const location = useLocation();
  const isAgregar = location.pathname === '/agregar';
  const isDiaTareas = location.pathname === '/diatareas';
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState<number | null>(null);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const isIphoneSE = useIsIphoneSE();

  const handleShowModal = (id: number) => {
    setSelectedTaskId(id);
    setShowModal(true);
  };

  const handleDeleteTask = (id: number) => {
    // Eliminar la tarea del localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTasks = tasks.filter((t: any) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setShowModal(false);
    setSelectedTaskId(null);
    setRefreshKey(k => k + 1); // Forzar refresco
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#97CDFF', position: 'relative', overflow: 'hidden' }}>
      {showModal && (
        <div className='w-full h-full fixed top-0 left-0 bg-blue-900/80 z-50'>
          <div className={`${isIphoneSE ? 'w-[95%] h-[28%]' : 'w-[86%] h-[21%]'} transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute bg-white rounded-3xl`}>
            <div className="w-full h-10 leading-none left-0 top-[17%] absolute text-center justify-start text-blue-900 text-3xl font-bold">¿Seguro que quieres eliminar esta tarea?</div>
            <motion.div
               className='w-[42%] h-[41%] left-5 bottom-4 absolute bg-blue-600 rounded-[19px] flex items-center justify-center cursor-pointer'
               onClick={() => setShowModal(false)}
               whileHover={{ scale: 1.07 }}
               whileTap={{ scale: 0.95 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
             >
               <div className="text-white text-3xl font-bold">Volver</div>
             </motion.div>
            <motion.div
               className='w-[42%] h-[41%] right-5 bottom-4 absolute bg-red-600 rounded-[19px] flex items-center justify-center cursor-pointer'
               onClick={() => selectedTaskId !== null && handleDeleteTask(selectedTaskId)}
               whileHover={{ scale: 1.07 }}
               whileTap={{ scale: 0.95 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
             >
               <div className="text-white text-center text-3xl font-bold">Si, deseo eliminarla</div>
             </motion.div>
          </div>
        </div>
      )}
      {isAgregar ? <AgregarHeader /> : isDiaTareas ? <DiaTareasHeader /> : <Header />}
      <div style={{ width: '100%', height: '100%' }}>
        {children({ setShowModal, refreshKey, handleDeleteTask: handleShowModal })}
      </div>
      <Footer />
    </div>
  );
}

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
      style={{ background: "linear-gradient(1deg, #97CDFF -22.66%, #2258E2 41.7%)" }}
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

// Asegúrate de que AnimatedRoutes siempre reciba el prop onShowModal
AnimatedRoutes.defaultProps = {
  onShowModal: () => { throw new Error('onShowModal es requerido en AnimatedRoutes'); }
};

// Renderizado principal
createRoot(document.getElementById('root')!).render(
  <MainApp />
)
