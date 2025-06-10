import React from 'react';

function Agregar() {
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
      <div className="w-full h-14 bg-blue-700 flex items-center px-4 fixed top-0 z-10">
        <img src="/src/assets/menu.svg" alt="Menu" className="w-12 h-12 left-2 relative" />
      </div>

      {/* Contenido principal */}
      <div className="w-[93%] h-[calc(100vh-100px)] left-1/2 transform -translate-x-1/2 top-20 absolute bg-white rounded-3xl overflow-hidden">
        <div className="w-60 h-10 left-8 top-8 absolute justify-start text-blue-900 text-3xl font-bold">
          Agregar Nueva Tarea
        </div>
        {/* Aquí irá el formulario para agregar tareas */}
      </div>
    </div>
  );
}

export default Agregar;
