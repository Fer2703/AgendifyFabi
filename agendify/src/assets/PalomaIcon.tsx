import React from 'react';
import { motion } from 'framer-motion';

interface PalomaIconProps {
  color?: string;
  size?: number;
}

const PalomaIcon: React.FC<PalomaIconProps> = ({ color = '#2258E2', size = 44 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="mask0_5_131" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <path d="M22 42C24.6269 42.0033 27.2286 41.4874 29.6555 40.4821C32.0824 39.4768 34.2868 38.0019 36.142 36.142C38.0018 34.2868 39.4768 32.0825 40.4821 29.6555C41.4874 27.2286 42.0032 24.6269 42 22C42.0032 19.3731 41.4874 16.7714 40.4821 14.3445C39.4768 11.9176 38.0018 9.71319 36.142 7.85802C34.2868 5.99818 32.0824 4.52323 29.6555 3.51793C27.2286 2.51263 24.6269 1.99678 22 2.00002C19.3731 1.99678 16.7714 2.51263 14.3445 3.51793C11.9176 4.52323 9.71317 5.99818 7.858 7.85802C5.99816 9.71319 4.52322 11.9176 3.51792 14.3445C2.51261 16.7714 1.99676 19.3731 2 22C1.99676 24.6269 2.51261 27.2286 3.51792 29.6555C4.52322 32.0825 5.99816 34.2868 7.858 36.142C9.71317 38.0019 11.9176 39.4768 14.3445 40.4821C16.7714 41.4874 19.3731 42.0033 22 42Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M14 22L20 28L32 16" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </mask>
    <g mask="url(#mask0_5_131)">
      <motion.rect
        x="-2"
        y="-2"
        width="48"
        height="48"
        animate={{ fill: color }}
        transition={{ duration: 0.3 }}
      />
    </g>
  </motion.svg>
);

export default PalomaIcon; 