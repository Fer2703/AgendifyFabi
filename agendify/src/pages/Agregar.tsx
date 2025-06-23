import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import useIsIphoneSE from '../hooks/useIsIphoneSE';

function Agregar() {
  const [titulo, setTitulo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [intentoGuardar, setIntentoGuardar] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();
  const isIphoneSE = useIsIphoneSE();

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFechaInicio = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    
    // Solo permitir fechas de hoy en adelante
    if (nuevaFechaInicio >= today) {
      setFechaInicio(nuevaFechaInicio);
      
      // Si la fecha de fin es anterior a la nueva fecha de inicio, actualizarla
      if (fechaFin && nuevaFechaInicio > fechaFin) {
        setFechaFin(nuevaFechaInicio);
      }
    }
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFechaFin = e.target.value;
    // Solo permitir fechas posteriores a la fecha de inicio
    if (!fechaInicio || nuevaFechaFin >= fechaInicio) {
      setFechaFin(nuevaFechaFin);
    }
  };

  // Convierte YYYY-MM-DD a DD/MM/YYYY
  const formatToDDMMYYYY = (dateStr: string) => {
    const [yyyy, mm, dd] = dateStr.split('-');
    return `${dd}/${mm}/${yyyy}`;
  };

  const camposCompletos = titulo && fechaInicio && fechaFin;

  const handleGuardar = () => {
    setIntentoGuardar(true);
    if (!camposCompletos) {
      controls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.3 } });
      return;
    }
    const nuevaTarea = {
      id: Date.now(),
      title: titulo,
      details: detalles,
      from: formatToDDMMYYYY(fechaInicio),
      to: formatToDDMMYYYY(fechaFin),
      completed: false
    };
    const tareasGuardadas = JSON.parse(localStorage.getItem('tasks') || '[]');
    tareasGuardadas.push(nuevaTarea);
    localStorage.setItem('tasks', JSON.stringify(tareasGuardadas));
    // Redirigir al día de inicio
    const [yyyy, mm, dd] = fechaInicio.split('-');
    navigate(`/diatareas?day=${parseInt(dd, 10)}&month=${parseInt(mm, 10) - 1}&year=${yyyy}`);
  };

  return (
    <div style={{
      width: '100%',
      height: isIphoneSE ? '92%' : '100%',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      position: 'relative',
      background: 'transparent'
    }}>
        {/* Nombre Tarea */}
        <div className="w-[95%] h-24 left-1/2 transform -translate-x-1/2 top-34 absolute">
            <div className="w-60 h-10 left-2 top-0 absolute justify-start text-blue-900 text-3xl font-bold">Título de la tarea</div>
            <div className="w-full h-16 top-10 absolute bg-white rounded-3xl">
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Tarea sin título"
                    maxLength={20}
                    className={`w-full h-full !p-5 text-zinc-500 text-3xl font-bold bg-transparent border-none outline-none ${intentoGuardar && !titulo ? 'border-2 border-red-500' : ''}`}
                />
            </div>
        </div>

        {/* Detalles */}
        <div className="w-[95%] h-60 left-1/2 transform -translate-x-1/2 top-63 absolute">
            <div className="w-60 h-10 left-2 top-0 absolute justify-start text-blue-900 text-3xl font-bold">Detalles</div>
            <div className="w-full h-52 left-0 top-10 absolute bg-white rounded-3xl">
                <textarea
                    value={detalles}
                    onChange={(e) => setDetalles(e.target.value)}
                    placeholder="Escribe aquí"
                    maxLength={200}
                    className="w-full h-full !p-5 text-zinc-500 text-3xl font-bold bg-transparent border-none outline-none"
                />
                <div className="absolute bottom-2 right-4 text-zinc-400 text-base font-bold select-none">
                    {detalles.length} / 200
                </div>
            </div>
        </div>

        {/* Tiempo de Realizacion */}
        <div className="w-[95%] h-44 left-1/2 transform -translate-x-1/2 top-131 absolute">
            <div className="w-96 h-11 left-2 top-0 absolute justify-start text-blue-900 text-3xl font-bold">Tiempo de realización</div>
            
            {/* Desde */}
            <div className="w-[47%] h-32 left-2 top-12 absolute bg-white rounded-3xl">
                <div className="w-40 h-11 left-1/2 transform -translate-x-1/2 top-4 absolute text-center justify-start text-blue-900 text-3xl font-bold">Desde:</div>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-40 h-24 left-1/2 transform -translate-x-1/2 top-8 absolute text-center text-zinc-500 text-2xl font-bold bg-transparent border-none outline-none ${intentoGuardar && !fechaInicio ? 'border-2 border-red-500' : ''}`}
                />
            </div>

            {/* Hasta */}
            <div className="w-[47%] h-32 right-2 top-12 absolute bg-white rounded-3xl">
                <div className="w-40 h-11 left-1/2 transform -translate-x-1/2 top-4 absolute text-center justify-start text-blue-900 text-3xl font-bold">Hasta:</div>
                <input
                    type="date"
                    value={fechaFin}
                    onChange={handleFechaFinChange}
                    min={fechaInicio}
                    className={`w-40 h-24 left-1/2 transform -translate-x-1/2 top-8 absolute text-center text-zinc-500 text-2xl font-bold bg-transparent border-none outline-none ${intentoGuardar && !fechaFin ? 'border-2 border-red-500' : ''}`}
                />
            </div>
        </div>

        {/* Guardar */}
        <motion.div
          className={`w-72 h-16 left-1/2 transform -translate-x-1/2 top-186 absolute rounded-2xl ${camposCompletos ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 opacity-70 cursor-not-allowed'}`}
          whileTap={camposCompletos ? { scale: 0.95 } : undefined}
          whileHover={camposCompletos ? { scale: 1.05 } : undefined}
          animate={controls}
          onClick={handleGuardar}
        >
          <div className="w-60 h-8 left-5 top-1/2 transform -translate-y-1/2 absolute text-center justify-start text-white text-3xl font-bold">GUARDAR</div>
        </motion.div>
    </div>
  );
}

export default Agregar;

