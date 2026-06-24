import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DiaTareasHeader() {
  const navigate = useNavigate();
  const [fadeArrow, setFadeArrow] = React.useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const month = params.get('month');
  const year = params.get('year');

  const handleBack = () => {
    setTimeout(() => setFadeArrow(true), 100);
  };

  React.useEffect(() => {
    if (fadeArrow) {
      const timeout = setTimeout(() => {
        if (month !== null && year !== null) {
          navigate(`/?month=${month}&year=${year}`);
        } else {
          navigate('/');
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [fadeArrow, navigate]);

  return (
    <div className="w-full h-14 top-0 absolute z-20">
      
      {/* Barra superior con botón de retroceso */}
      <div className="w-full h-14 bg-green-700 flex items-center px-4 fixed top-0">
        <motion.img
          src="/flecha.svg"
          alt="Retorno"
          className="w-12 h-12 left-2 relative invert brightness-0 rotate-180 cursor-pointer"
          whileTap={{ scale: 1.25, rotate: -15 }}
          whileHover={{ scale: 1.1 }}
          animate={{ opacity: fadeArrow ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 300, opacity: { duration: 0.5 } }}
          onTap={handleBack}
        />
      </div>
    </div>
  );
}
