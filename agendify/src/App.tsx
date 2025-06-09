import { useState } from 'react'
import './App.css'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + 1)
      return newDate
    })
  }

  const monthNames = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ]

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

      {/* Tarjeta de anuncios */}
      <div className="w-96 h-36 absolute left-1/2 transform -translate-x-1/2 top-20 bg-white rounded-3xl overflow-hidden">
        <div className="w-60 h-10 left-33 top-5 absolute justify-start text-blue-900 text-3xl font-bold">Para hoy...</div>
        <div className="w-60 h-20 left-36 top-15 absolute justify-center text-zinc-500 text-2xl font-bold leading-tight">No hay tareas pendientes</div>
        <img className="w-48 h-48 -left-7 -top-7 absolute" src="/src/assets/bombillo.svg" />
      </div>

      {/* Fecha */}
      <div className="w-80 h-16 left-1/2 transform -translate-x-1/2 top-66 absolute">
        <div className="w-24 h-8 left-30 top-0 absolute text-center justify-start text-blue-900 text-4xl font-bold">{currentDate.getFullYear()}</div>
        <div className="w-52 h-8 left-14 top-8 absolute text-center justify-start text-blue-900 text-6xl font-bold">{monthNames[currentDate.getMonth()]}</div>
        <img 
          src="/src/assets/flecha.svg" 
          alt='flecha izquierda' 
          className="w-14 h-14 left-0 top-3 absolute rotate-180 cursor-pointer" 
          onClick={handlePreviousMonth}
        />
        <img 
          src="/src/assets/flecha.svg" 
          alt='flecha derecha' 
          className="w-14 h-14 left-68 top-3 absolute cursor-pointer" 
          onClick={handleNextMonth}
        />
      </div>

      {/* Footer */}
      <div className="w-full h-14 bg-blue-700 flex px-4 fixed bottom-0">
      </div>
    </div>
  )
}

export default App
