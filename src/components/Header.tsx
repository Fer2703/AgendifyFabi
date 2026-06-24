import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useIsIphoneSE from '../hooks/useIsIphoneSE'

export default function Header() {
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
      <div className="w-full h-14 bg-green-700 flex items-center px-4 fixed top-0 z-30">
        <motion.img 
          src="/about-us.svg" 
          alt="Sobre Nosotros" 
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
            className='w-full h-full absolute top-0 left-0 bg-green-900/80 z-40'
            onClick={handleCloseAbout}
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
              className="w-[85%] h-[65%] sm:h-[70%] left-1/2 transform -translate-x-1/2 top-[69px] absolute bg-white rounded-3xl"
              onClick={(e) => e.stopPropagation()}
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
              <div className='w-full h-10 top-6 text-center font-bold text-4xl text-green-900 absolute'>Sobre nosotros</div>
              <div className={`w-[87%] left-1/2 transform -translate-x-1/2 top-20 text-center font-bold ${isIphoneSE ? 'text-[1.1rem]' : 'text-2xl'} text-green-900 absolute max-h-[75%] overflow-y-auto leading-tight`}>
                Este proyecto surge como una iniciativa escolar para mejorar la planificación diaria y la gestión de tiempo. Diseñamos esta página con el objetivo de facilitar el acceso a información estructurada de manera visual y práctica. <br/><br/>Creado por los estudiantes de la U. E. C. Integral Guayana II:<br/>Martin Figueroa<br/>Joseph baladi<br/>Jhonny López
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
