import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Agregar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFechaInicio = e.target.value;
    setFechaInicio(nuevaFechaInicio);
    
    // Si la fecha de fin es anterior a la nueva fecha de inicio, actualizarla
    if (fechaFin && nuevaFechaInicio > fechaFin) {
      setFechaFin(nuevaFechaInicio);
    }
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFechaFin = e.target.value;
    // Solo permitir fechas posteriores a la fecha de inicio
    if (!fechaInicio || nuevaFechaFin >= fechaInicio) {
      setFechaFin(nuevaFechaFin);
    }
  };

  return (
    <div style={{
      backgroundColor: '#97CDFF',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
        {/* Header con menú */}
        <div className="w-full h-24 top-0 absolute z-10">
            <div className="w-full h-14 bg-blue-600 flex items-center px-4 fixed top-0">
                <img 
                  src="/src/assets/flecha.svg" 
                  alt="Retorno" 
                  className="w-12 h-12 left-2 relative invert brightness-0 rotate-180 cursor-pointer" 
                  onClick={() => navigate(-1)}
                />
            </div>
            <div className="w-72 h-16 left-1/2 transform -translate-x-1/2 top-10 absolute bg-blue-600 rounded-2xl">
                <div className="w-60 h-8 left-5 top-5 absolute text-center justify-start text-white text-3xl font-bold">AÑADIR TAREA</div>
            </div>
        </div>

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
                    className="w-full h-full !p-5 text-zinc-500 text-3xl font-bold bg-transparent border-none outline-none"
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
                    className="w-full h-full !p-5 text-zinc-500 text-3xl font-bold bg-transparent border-none outline-none"
                />
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
                    className="w-40 h-24 left-1/2 transform -translate-x-1/2 top-8 absolute text-center text-zinc-500 text-2xl font-bold bg-transparent border-none outline-none"
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
                    className="w-40 h-24 left-1/2 transform -translate-x-1/2 top-8 absolute text-center text-zinc-500 text-2xl font-bold bg-transparent border-none outline-none"
                />
            </div>
        </div>

        {/* Guardar */}
        <div className="w-72 h-16 left-1/2 transform -translate-x-1/2 top-186 absolute bg-blue-600 rounded-2xl">
            <div className="w-60 h-8 left-5 top-1/2 transform -translate-y-1/2 absolute text-center justify-start text-white text-3xl font-bold">GUARDAR</div>
        </div>

        {/* Footer */}
        <div className="w-full h-14 bg-blue-700 flex px-4 fixed -bottom-1 z-10">
        </div>
    </div>
  );
}

export default Agregar;

