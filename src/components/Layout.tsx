import React from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import AgregarHeader from './AgregarHeader'
import DiaTareasHeader from './DiaTareasHeader'
import useIsIphoneSE from '../hooks/useIsIphoneSE'

interface LayoutProps {
  children: (args: {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    refreshKey: number;
    handleDeleteTask: (id: number) => void;
  }) => React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTasks = tasks.filter((t: any) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setShowModal(false);
    setSelectedTaskId(null);
    setRefreshKey(k => k + 1);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#A5D6A7', position: 'relative', overflow: 'hidden' }}>
      {showModal && (
        <div className='w-full h-full fixed top-0 left-0 bg-green-900/80 z-50'>
          <div className={`${isIphoneSE ? 'w-[95%] h-[28%]' : 'w-[86%] h-[21%]'} transform left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute bg-white rounded-3xl`}>
            <div className="w-full h-10 leading-none left-0 top-[17%] absolute text-center justify-start text-green-900 text-3xl font-bold">¿Seguro que quieres eliminar esta tarea?</div>
            <motion.div
               className='w-[42%] h-[41%] left-5 bottom-4 absolute bg-green-600 rounded-[19px] flex items-center justify-center cursor-pointer'
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
