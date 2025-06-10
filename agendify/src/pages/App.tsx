import { useState } from 'react'
import '/src/css/App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
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
      <div className="w-[93%] h-36 absolute left-1/2 transform -translate-x-1/2 top-20 bg-white rounded-3xl overflow-hidden">
        <div className="w-60 h-10 left-33 top-5 absolute justify-start text-blue-900 text-3xl font-bold">Para hoy...</div>
        <div className="w-60 h-20 left-36 top-15 absolute justify-center text-zinc-500 text-2xl font-bold leading-none">No hay tareas pendientes</div>
        <img className="w-48 h-48 -left-7 -top-7 absolute" src="/src/assets/bombillo.svg" />
      </div>

      {/* Fecha */}
      <div className="w-80 h-16 left-1/2 transform -translate-x-1/2 top-66 absolute">
        <div className="w-24 h-8 left-1/2 transform -translate-x-1/2 top-0 absolute text-center justify-start text-blue-900 text-4xl font-bold font-['League_Spartan']">{currentDate.getFullYear()}</div>
        <div className="w-52 h-8 left-1/2 transform -translate-x-1/2 top-8 absolute text-center justify-start text-blue-900 text-7xl font-bold font-['League_Spartan']">{monthNames[currentDate.getMonth()]}</div>
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

      {/* Tareas Finalizadas */}
      <div className="w-44 h-12 left-8 top-89 absolute">
        <div className="w-28 h-6 left-14 top-3 absolute justify-center text-blue-600 text-2xl leading-none font-bold">Ver tareas finalizadas</div>
        <img src="/src/assets/paloma.svg" alt="paloma" className="w-12 h-12 -left-2 top-2 absolute" />
      </div>

      {/* Dias del Mes */}
      <div className="w-[93%] h-[calc(100vh-500px)] left-1/2 transform -translate-x-1/2 top-108 absolute overflow-y-auto">
        {daysArray.map((day, index) => (
          <div key={day}>
            <div 
              className={`w-full h-28 ${index === 0 ? 'bg-blue-600' : 'bg-white'} rounded-3xl overflow-hidden flex items-center`}
            >
              <div className={`w-20 h-14 left-1 absolute text-center justify-start ${index === 0 ? 'text-white' : 'text-blue-900'} text-6xl font-bold`}>
                {day.toString().padStart(2, '0')}
              </div>
              <div className={`w-64 h-20 left-23 absolute flex items-center ${index === 0 ? 'text-white' : 'text-zinc-500'} text-3xl font-bold`}>
                {index === 0 ? 'Ver 3 tareas' : 'No hay tareas pendientes'}
              </div>
            </div>
            {index < daysArray.length - 1 && (
              <div className="h-3"></div>
            )}
          </div>
        ))}
      </div>

      {/* Agregar Tarea */}
      <div className="w-24 h-24 right-4 bottom-15 absolute z-10">
        <img 
          src="/src/assets/agregar.svg" 
          alt="agregar tarea" 
          className="w-24 h-24 left-0 top-0 absolute cursor-pointer"
          onClick={() => navigate('/agregar')}
        />
      </div>

      {/* Footer */}
      <div className="w-full h-14 bg-blue-700 flex px-4 fixed -bottom-1 z-10">
      </div>
    </div>
  )
}

export default App
