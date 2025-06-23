import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import PalomaIcon from '../assets/PalomaIcon'
import useIsIphoneSE from '../hooks/useIsIphoneSE'

// Definir el tipo de tarea
interface Task {
  id: number;
  title: string;
  details: string;
  from: string;
  to: string;
  completed: boolean;
}

export type DiaTareasProps = { onShowModal?: (id: number) => void; onDeleteTask?: (id: number) => void };

function DiaTareas({ onShowModal }: DiaTareasProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFading, setIsFading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);
  const isIphoneSE = useIsIphoneSE();
  
  // Estado para manejar el estado de las tareas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Cargar tareas desde localStorage o JSON
  useEffect(() => {
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    } else {
      fetch('/data/tasks.json')
        .then(res => res.json())
        .then((data: Task[]) => {
          setTasks(data);
          localStorage.setItem('tasks', JSON.stringify(data));
        });
    }
  }, []);

  // Actualizar localStorage cada vez que cambian las tareas
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Función para convertir 'DD/MM/YYYY' a Date
  const parseToDate = (ddmmYYYY: string) => {
    const [day, month, year] = ddmmYYYY.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

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

  const toggleTaskStatus = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Filtrar tareas para cada sección
  const tareasParaFinalizar = tasks
    .filter((task) => {
      const taskToDate = parseToDate(task.to);
      const taskFromDate = parseToDate(task.from);
      return (
        taskToDate.getDate() === currentDate.getDate() &&
        taskToDate.getMonth() === currentDate.getMonth() &&
        taskToDate.getFullYear() === currentDate.getFullYear() &&
        taskFromDate <= currentDate
      );
    })
    .filter((task) => !showCompleted || !task.completed);

  const tareasParaTrabajar = tasks
    .filter((task) => {
      const taskToDate = parseToDate(task.to);
      const taskFromDate = parseToDate(task.from);
      return (
        taskToDate.getFullYear() === currentDate.getFullYear() &&
        taskToDate > currentDate &&
        taskFromDate <= currentDate
      );
    })
    .filter((task) => (!showCompleted || !task.completed));

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
          src="/flecha.svg" 
          alt="flecha izq" 
          className='w-14 h-14 left-0 top-4 rotate-180 absolute cursor-pointer'
          onClick={handlePreviousDay}
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.img 
          src="/flecha.svg" 
          alt="flecha der" 
          className='w-14 h-14 right-0 top-4 absolute cursor-pointer'
          onClick={handleNextDay}
          whileTap={{ scale: 1.25, rotate: 15 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Ver tareas Finalizadas */}
      <div className='w-44 h-12 left-7 top-42 absolute flex items-center cursor-pointer' onClick={() => setShowCompleted(v => !v)}>
        <motion.div
          animate={{ color: showCompleted ? '#71717a' : '#2563eb' }}
          transition={{ duration: 0.3 }}
          className='flex items-center'
        >
          <motion.div
            animate={{ color: showCompleted ? '#71717a' : '#2563eb' }}
            transition={{ duration: 0.3 }}
            className='mr-2'
          >
            <PalomaIcon color={showCompleted ? '#71717a' : '#2258E2'} size={48} />
          </motion.div>
          <span className='text-2xl leading-none left-14 font-bold select-none absolute'>Ver tareas finalizadas</span>
        </motion.div>
      </div>

      {/* TAREAS */}
      <div className={`w-[86%] ${isIphoneSE ? 'h-90' : 'h-155'} transform left-1/2 -translate-x-1/2 top-57 absolute overflow-y-auto`}>
        <div className="flex flex-col gap-y-6">
          {/* Para finalizar */}
          {tareasParaFinalizar.length > 0 && (
            <div className='w-full'>
              <div className='w-full h-10 text-blue-900 text-3xl font-bold py-6'>Para finalizar</div>
              <div className='flex flex-col gap-y-6'>
                {tareasParaFinalizar.map((task) => (
                  <div key={task.id} className='w-full h-48 bg-white rounded-3xl relative'>
                    <div className="w-60 h-10 left-5 top-4 absolute justify-start text-blue-900 text-3xl font-bold">{task.title}</div>
                    <div className="w-60 h-20 left-5 top-14 leading-none absolute justify-center text-zinc-500 text-2xl font-bold">{task.details}</div>
                    <div className="w-40 h-11 left-5 bottom-4 leading-none absolute justify-center text-blue-900 text-2xl font-bold">DESDE: {task.from.slice(0,5)}<br/>HASTA: {task.to.slice(0,5)}</div>
                    <motion.div 
                      className={`w-40 h-11 right-2 bottom-4 absolute rounded-[19px] cursor-pointer ${task.completed ? 'bg-zinc-500' : 'bg-blue-600'}`}
                      onClick={() => toggleTaskStatus(task.id)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="w-40 h-11 left-0 top-2 absolute text-center justify-center text-white text-2xl"
                        key={task.completed ? 'completed' : 'pending'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {task.completed ? '(FINALIZADO)' : 'FINALIZAR'}
                      </motion.div>
                    </motion.div>
                    <motion.img 
                      src="/X.svg" 
                      alt="X" 
                      className='w-9 h-9 right-5 top-4 absolute cursor-pointer' 
                      onClick={() => onShowModal && onShowModal(task.id)}
                      whileTap={{ scale: 1.25, rotate: 15 }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Para ir trabajando */}
          {tareasParaTrabajar.length > 0 && (
            <div className='w-full'>
              <div className='w-full h-10 text-blue-900 text-3xl font-bold py-6'>Para ir trabajando</div>
              <div className='flex flex-col gap-y-6'>
                {tareasParaTrabajar.map((task) => (
                  <div key={task.id} className='w-full h-48 bg-white rounded-3xl relative'>
                    <div className="w-60 h-10 left-5 top-4 absolute justify-start text-blue-900 text-3xl font-bold">{task.title}</div>
                    <div className="w-60 h-20 left-5 top-14 leading-none absolute justify-center text-zinc-500 text-2xl font-bold">{task.details}</div>
                    <div className="w-40 h-11 left-5 bottom-4 leading-none absolute justify-center text-blue-900 text-2xl font-bold">DESDE: {task.from.slice(0,5)}<br/>HASTA: {task.to.slice(0,5)}</div>
                    <motion.div 
                      className={`w-40 h-11 right-2 bottom-4 absolute rounded-[19px] cursor-pointer ${task.completed ? 'bg-zinc-500' : 'bg-blue-600'}`}
                      onClick={() => toggleTaskStatus(task.id)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div 
                        className="w-40 h-11 left-0 top-2 absolute text-center justify-center text-white text-2xl"
                        key={task.completed ? 'completed' : 'pending'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {task.completed ? '(FINALIZADO)' : 'FINALIZAR'}
                      </motion.div>
                    </motion.div>
                    <motion.img 
                      src="/X.svg" 
                      alt="X" 
                      className='w-9 h-9 right-5 top-4 absolute cursor-pointer' 
                      onClick={() => onShowModal && onShowModal(task.id)}
                      whileTap={{ scale: 1.25, rotate: 15 }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

export default DiaTareas