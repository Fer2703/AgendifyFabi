import { useState, useEffect } from 'react';

export default function useIsIphoneSE() {
  const [isIphoneSE, setIsIphoneSE] = useState(() => {
    return window.innerWidth <= 375 && window.innerHeight <= 667;
  });
  useEffect(() => {
    const onResize = () => setIsIphoneSE(window.innerWidth <= 375 && window.innerHeight <= 667);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isIphoneSE;
} 