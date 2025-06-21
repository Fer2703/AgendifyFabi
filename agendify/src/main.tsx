import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import App from './pages/App.tsx'
import Agregar from './pages/Agregar.tsx'
import React from 'react'

function Header() {
  return (
    <div className="w-full h-14 bg-blue-700 flex items-center px-4 fixed top-0 z-30">
      <img src="/src/assets/menu.svg" alt="Menu" className="w-12 h-12 left-2 relative" />
    </div>
  );
}

function Footer() {
  return (
    <div className="w-full h-14 bg-blue-700 flex px-4 fixed -bottom-1 z-30"></div>
  );
}

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
      <div className="w-full h-14 bg-blue-600 flex items-center px-4 fixed top-0 pointer-events-auto">
        <motion.img
          src="/src/assets/flecha.svg"
          alt="Retorno"
          className="w-12 h-12 left-2 relative invert brightness-0 rotate-180 cursor-pointer"
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
          animate={{ opacity: fadeArrow ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 300, opacity: { duration: 0.5 } }}
          onTap={handleBack}
        />
      </div>
      <motion.div
        initial={{ y: -60, opacity: 1 }}
        animate={slideOut ? { y: -60 } : { y: 0 }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
        className="w-72 h-28 left-1/2 transform -translate-x-1/2 top-0 absolute bg-blue-600 rounded-2xl pointer-events-auto"
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

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAgregar = location.pathname === '/agregar';
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#97CDFF', position: 'relative', overflow: 'hidden' }}>
      {isAgregar ? <AgregarHeader /> : <Header />}
      <div style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
