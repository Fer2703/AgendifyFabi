import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import '/src/css/App.css'
import PalomaIcon from '../assets/PalomaIcon'

// Definir el tipo de tarea
interface Task {
  id: number;
  title: string;
  details: string;
  from: string;
  to: string;
  completed: boolean;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isFading, setIsFading] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Si hay parámetros month y year en la URL, inicializa el mes y año
    const params = new URLSearchParams(location.search);
    const month = params.get('month');
    const year = params.get('year');
    if (month !== null && year !== null) {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(Number(month));
        newDate.setFullYear(Number(year));
        return newDate;
      });
    }
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    }
  }, [location.search]);

  const handlePreviousMonth = () => {
    setSlideDirection(-1);
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setSlideDirection(1);
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + 1)
      return newDate
    })
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const monthNames = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ]

  // Generate array of days for the current month
  const daysInMonth = getDaysInMonth(currentDate)
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Función para convertir 'DD/MM/YYYY' a Date
  const parseToDate = (ddmmYYYY: string) => {
    const [day, month, year] = ddmmYYYY.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Obtener la fecha de hoy
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Tareas activas para hoy
  let tareasHoy = tasks.filter(task => {
    const fromDate = parseToDate(task.from);
    const toDate = parseToDate(task.to);
    return fromDate <= today && today <= toDate;
  });
  if (showCompleted) {
    tareasHoy = tareasHoy.filter(task => !task.completed);
  }

  return (
    <div>
      {/* Tarjeta de anuncios */}
      <motion.div
        className="w-[93%] h-36 absolute left-1/2 transform -translate-x-1/2 top-20 bg-white rounded-3xl overflow-hidden cursor-pointer"
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate(`/diatareas?day=${todayDay}&month=${todayMonth}&year=${todayYear}`)}
      >
        <div className="w-60 h-10 left-33 top-5 absolute justify-start text-blue-900 text-4xl font-bold">Para hoy...</div>
        <div className="w-60 h-20 left-36 top-15 absolute justify-center text-zinc-500 text-3xl font-bold leading-none">
          {tareasHoy.length > 0 ? `Ver ${tareasHoy.length} tareas` : 'No hay tareas pendientes'}
        </div>
        <img className="w-48 h-48 -left-7 -top-7 absolute" src="/bombillo.svg" />
      </motion.div>

      {/* Fecha */}
      <div className="w-80 h-16 left-1/2 transform -translate-x-1/2 top-66 absolute">
        <motion.div 
          className="w-24 h-8 left-1/2 transform -translate-x-1/2 top-0 absolute text-center justify-start text-blue-900 text-4xl font-bold font-['League_Spartan']"
          key={currentDate.getFullYear()}
          initial={{ x: slideDirection * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -slideDirection * 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {currentDate.getFullYear()}
        </motion.div>
        <motion.div 
          className="w-52 h-8 left-1/2 transform -translate-x-1/2 top-8 absolute text-center justify-start text-blue-900 text-7xl font-bold font-['League_Spartan']"
          key={currentDate.getMonth()}
          initial={{ x: slideDirection * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -slideDirection * 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {monthNames[currentDate.getMonth()]}
        </motion.div>
        <motion.img 
          src="/flecha.svg" 
          alt='flecha izquierda' 
          className="w-14 h-14 left-0 top-3 absolute rotate-180 cursor-pointer" 
          onClick={handlePreviousMonth}
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.img 
          src="/flecha.svg" 
          alt='flecha derecha' 
          className="w-14 h-14 left-68 top-3 absolute cursor-pointer" 
          onClick={handleNextMonth}
          whileTap={{ scale: 1.25, rotate: 15 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Tareas Finalizadas */}
      <div className="w-44 h-12 left-5 top-91 absolute flex items-center cursor-pointer" onClick={() => setShowCompleted(v => !v)}>
        <div className="flex items-center">
          <div className="mr-2">
            <PalomaIcon color={showCompleted ? '#71717a' : '#2258E2'} size={48} />
          </div>
          <span className={`text-2xl leading-none left-14 font-bold select-none absolute ${showCompleted ? 'text-zinc-500' : 'text-blue-600'}`}>Ver tareas finalizadas</span>
        </div>
      </div>

      {/* Dias del Mes */}
      <div className="w-[93%] h-[calc(100vh-500px)] left-1/2 transform -translate-x-1/2 top-108 absolute overflow-y-auto">
        {daysArray.map((day, index) => {
          // Filtrar tareas para este día
          let tareasDelDia = tasks.filter(task => {
            const fromDate = parseToDate(task.from);
            const toDate = parseToDate(task.to);
            const thisDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            return fromDate <= thisDay && thisDay <= toDate;
          });
          if (showCompleted) {
            tareasDelDia = tareasDelDia.filter(task => !task.completed);
          }
          return (
            <div key={day}>
              <motion.div 
                className={`w-full h-28 ${tareasDelDia.length > 0 ? 'bg-blue-600' : 'bg-white'} rounded-3xl overflow-hidden flex items-center cursor-pointer`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/diatareas?day=${day}&month=${currentDate.getMonth()}&year=${currentDate.getFullYear()}`)}
              >
                <div className={`w-20 h-14 left-1 absolute text-center justify-start ${tareasDelDia.length > 0 ? 'text-white' : 'text-blue-900'} text-6xl font-bold`}>
                  {day.toString().padStart(2, '0')}
                </div>
                <div className={`w-64 h-20 left-23 absolute flex items-center ${tareasDelDia.length > 0 ? 'text-white' : 'text-zinc-500'} text-3xl font-bold`}>
                  {tareasDelDia.length > 0
                    ? `Ver ${tareasDelDia.length} tareas`
                    : 'No hay tareas pendientes'}
                </div>
              </motion.div>
              {index < daysArray.length - 1 && (
                <div className="h-3"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Agregar Tarea */}
      <div className="w-24 h-24 right-4 bottom-15 absolute z-10">
        <motion.img
          src="/agregar.svg"
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

export default App
