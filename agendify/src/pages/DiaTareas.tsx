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

      {/* TAREAS */}
      <div className='w-[86%] h-155 transform left-1/2 -translate-x-1/2 top-57 absolute overflow-y-auto'>
        {/* Para ir trabajando */}
        <div className='w-full h-96 left-0 top-0 absolute'>
          <div className='w-full h-10 left-0 top-0 absolute justify-start text-blue-900 text-3xl font-bold'>Para finalizar</div>
          
          {/* Tarea 1*/}
          <div className='w-full h-48 left-0 top-9 absolute bg-white rounded-3xl'>
            <div className="w-60 h-10 left-5 top-4 absolute justify-start text-blue-900 text-3xl font-bold">Tarea de ejemplo</div>
            <div className="w-60 h-20 left-5 top-14 leading-none absolute justify-center text-zinc-500 text-2xl font-bold">Detalles de ejemplo Detalles de ejemplo</div>
            <div className="w-40 h-11 left-5 bottom-4 leading-none absolute justify-center text-blue-900 text-2xl font-bold">DESDE: 25/06<br/>HASTA: 01/07</div>
            <div className='w-40 h-11 right-2 bottom-4 absolute bg-zinc-500 rounded-[19px]'>
              <div className="w-40 h-11 left-0 top-2 absolute text-center justify-center text-white text-2xl">(FINALIZADO)</div>
            </div>
            <img src="/src/assets/X.svg" alt="X" className='w-9 h-9 right-5 top-4 absolute' />
          </div>

          {/* Tarea 2*/}
          <div className='w-full h-48 left-0 top-61 absolute bg-white rounded-3xl'>
            <div className="w-60 h-10 left-5 top-4 absolute justify-start text-blue-900 text-3xl font-bold">Tarea de ejemplo</div>
            <div className="w-60 h-20 left-5 top-14 leading-none absolute justify-center text-zinc-500 text-2xl font-bold">Detalles de ejemplo Detalles de ejemplo</div>
            <div className="w-40 h-11 left-5 bottom-4 leading-none absolute justify-center text-blue-900 text-2xl font-bold">DESDE: 25/06<br/>HASTA: 01/07</div>
            <div className='w-40 h-11 right-2 bottom-4 absolute bg-blue-600 rounded-[19px]'>
              <div className="w-40 h-11 left-0 top-2 absolute text-center justify-center text-white text-2xl">FINALIZAR</div>
            </div>
            <img src="/src/assets/X.svg" alt="X" className='w-9 h-9 right-5 top-4 absolute' />
          </div>

        </div>
        <div className='w-full h-56 left-0 top-115 absolute'>
          <div className='w-full h-10 left-0 top-0 absolute justify-start text-blue-900 text-3xl font-bold'>Para ir trabajando</div>
        
          {/* Tarea 3*/}
          <div className='w-full h-48 left-0 top-9 absolute bg-white rounded-3xl'>
            <div className="w-60 h-10 left-5 top-4 absolute justify-start text-blue-900 text-3xl font-bold">Tarea de ejemplo</div>
            <div className="w-60 h-20 left-5 top-14 leading-none absolute justify-center text-zinc-500 text-2xl font-bold">Detalles de ejemplo Detalles de ejemplo</div>
            <div className="w-40 h-11 left-5 bottom-4 leading-none absolute justify-center text-blue-900 text-2xl font-bold">DESDE: 25/06<br/>HASTA: 01/07</div>
            <div className='w-40 h-11 right-2 bottom-4 absolute bg-blue-600 rounded-[19px]'>
              <div className="w-40 h-11 left-0 top-2 absolute text-center justify-center text-white text-2xl">FINALIZAR</div>
            </div>
            <img src="/src/assets/X.svg" alt="X" className='w-9 h-9 right-5 top-4 absolute' />
          </div>
        </div>
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