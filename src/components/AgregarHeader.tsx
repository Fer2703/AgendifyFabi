import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AgregarHeader() {
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
      <div className="w-full h-14 bg-green-700 flex items-center px-4 fixed top-0 pointer-events-auto z-30">
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
        className="w-72 h-28 left-1/2 transform -translate-x-1/2 top-0 absolute bg-green-700 rounded-2xl pointer-events-auto z-10"
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
