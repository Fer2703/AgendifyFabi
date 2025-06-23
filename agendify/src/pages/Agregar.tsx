import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

function Agregar() {
  const [titulo, setTitulo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [showBordeRojo, setShowBordeRojo] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();
  const bordeTimeout = useRef<any>(null);

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFechaInicio = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (nuevaFechaInicio >= today) {
      setFechaInicio(nuevaFechaInicio);
      if (fechaFin && nuevaFechaInicio > fechaFin) {
        setFechaFin(nuevaFechaInicio);
      }
    }
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFechaFin = e.target.value;
    if (!fechaInicio || nuevaFechaFin >= fechaInicio) {
      setFechaFin(nuevaFechaFin);
    }
  };

  // Convierte YYYY-MM-DD a DD/MM/YYYY
  const formatToDDMMYYYY = (dateStr: string) => {
    const [yyyy, mm, dd] = dateStr.split('-');
    return `${dd}/${mm}/${yyyy}`;
  };

  // Obtener la fecha local de hoy en formato YYYY-MM-DD
  const getLocalToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const camposCompletos = titulo && detalles && fechaInicio && fechaFin;

  const handleGuardar = () => {
    if (!camposCompletos) {
      setShowBordeRojo(true);
      controls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.25 } });
      if (bordeTimeout.current) clearTimeout(bordeTimeout.current);
      bordeTimeout.current = setTimeout(() => setShowBordeRojo(false), 300);
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
    const [yyyy, mm, dd] = fechaInicio.split('-');
    navigate(`/diatareas?day=${parseInt(dd, 10)}&month=${parseInt(mm, 10) - 1}&year=${yyyy}`);
  };

  // Clases para borde rojo animado por color
  const bordeBase = 'border-4';
  const bordeVisible = 'border-red-500/60 transition-none';
  const bordeOculto = 'border-transparent transition-colors duration-300';

  return (
    <div style={{
      width: '100%',
      height: '100%',
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
            <div className={`w-full h-16 top-10 absolute bg-white rounded-3xl ${bordeBase} ${(showBordeRojo && !titulo) ? bordeVisible : bordeOculto}`}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Tarea sin título"
                    maxLength={20}
                    className="w-full h-full !p-5 text-zinc-500 text-3xl font-bold bg-transparent border-none outline-none"
                />
            </div>
        </div>

        {/* Detalles */}
        <div className="w-[95%] h-60 left-1/2 transform -translate-x-1/2 top-63 absolute">
            <div className="w-60 h-10 left-2 top-0 absolute justify-start text-blue-900 text-3xl font-bold">Detalles</div>
            <div className={`w-full h-52 left-0 top-10 absolute bg-white rounded-3xl ${bordeBase} ${(showBordeRojo && !detalles) ? bordeVisible : bordeOculto}`}>
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
            <div className={`w-[47%] h-32 left-2 top-12 absolute bg-white rounded-3xl ${bordeBase} ${(showBordeRojo && !fechaInicio) ? bordeVisible : bordeOculto}`}>
                <div className="w-40 h-11 left-1/2 transform -translate-x-1/2 top-4 absolute text-center justify-start text-blue-900 text-3xl font-bold">Desde:</div>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                    min={getLocalToday()}
                    className="w-40 h-24 left-1/2 transform -translate-x-1/2 top-8 absolute text-center text-zinc-500 text-2xl font-bold bg-transparent border-none outline-none"
                />
            </div>
            {/* Hasta */}
            <div className={`w-[47%] h-32 right-2 top-12 absolute bg-white rounded-3xl ${bordeBase} ${(showBordeRojo && !fechaFin) ? bordeVisible : bordeOculto}`}>
                <div className="w-40 h-11 left-1/2 transform -translate-x-1/2 top-4 absolute text-center justify-start text-blue-900 text-3xl font-bold">Hasta:</div>
                <input
                    type="date"
                    value={fechaFin}
                    onChange={handleFechaFinChange}
                    min={fechaInicio}
                    className="w-40 h-24 left-1/2 transform -translate-x-1/2 top-8 absolute text-center text-zinc-500 text-2xl font-bold bg-transparent border-none outline-none"
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

