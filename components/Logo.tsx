
import React from 'react';

interface LogoDisplayProps {
  variant?: 'header' | 'footer';
  className?: string;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ variant = 'header', className = '' }) => {
  const isHeader = variant === 'header';

  return (
    <div 
      className={`font-bold tracking-[0.2em] text-black ${isHeader ? 'text-2xl' : 'text-xl'} ${className}`} 
      dir="ltr"
    >
      TURRIVA
    </div>
  );
};

export default LogoDisplay;
