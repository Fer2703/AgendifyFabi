import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function DiaTareas() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFading, setIsFading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState(0);

  // Leer parámetros de URL y establecer fecha inicial
  useEffect(() => {
    const day = searchParams.get('day');
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    
    if (day && month && year) {
      const initialDate = new Date(parseInt(year), parseInt(month), parseInt(day));
      setCurrentDate(initialDate);
    }
  }, [searchParams]);

  const handlePreviousDay = () => {
    setSlideDirection(-1);
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSlideDirection(1);
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  return (
    <div className="w-full h-full">
      
      {/* Fecha */}
      <div className='w-80 h-16 transform left-1/2 -translate-x-1/2 top-20 absolute'>
        <motion.div 
          className='w-full h-8 top-0 absolute text-center text-blue-900 text-3xl font-bold'
          key={currentDate.getFullYear()}
          initial={{ x: slideDirection * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -slideDirection * 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {currentDate.getFullYear()}
        </motion.div>
        <motion.div 
          className='w-full h-8 top-7 absolute text-center text-blue-900 text-6xl font-bold'
          key={currentDate.getTime()}
          initial={{ x: slideDirection * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -slideDirection * 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {formatDate(currentDate)}
        </motion.div>
        <motion.img 
          src="/src/assets/flecha.svg" 
          alt="flecha izq" 
          className='w-14 h-14 left-0 top-4 rotate-180 absolute cursor-pointer'
          onClick={handlePreviousDay}
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.img 
          src="/src/assets/flecha.svg" 
          alt="flecha der" 
          className='w-14 h-14 right-0 top-4 absolute cursor-pointer'
          onClick={handleNextDay}
          whileTap={{ scale: 1.25, rotate: 15 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>
      
      {/* Agregar Tarea */}
      <div className="w-24 h-24 right-4 bottom-15 absolute z-10">
        <motion.img
          src="/src/assets/agregar.svg"
          alt="agregar tarea"
          className="w-24 h-24 left-0 top-0 absolute cursor-pointer"
          whileTap={{ scale: 1.25, rotate: 15 }}
          whileHover={{ scale: 1.1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 300, opacity: { duration: 0.5 } }}
          onTap={() => {
            setIsFading(true);
            setTimeout(() => navigate('/agregar'), 500);
          }}
        />
      </div>
    </div>
  )
}

export default DiaTareas