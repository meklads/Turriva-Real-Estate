
import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ beforeImage, afterImage, beforeLabel, afterLabel }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block max-w-full select-none group cursor-ew-resize rounded-xl overflow-hidden shadow-2xl border border-white/50"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Invisible image to set the height/width of the container naturally based on aspect ratio */}
      {/* We limit max-height to 70vh to prevent portrait images from being too tall for the screen */}
      <img 
        src={beforeImage} 
        alt="" 
        className="max-w-full max-h-[70vh] w-auto h-auto opacity-0 pointer-events-none block" 
      />

      {/* After Image (Bottom Layer - Absolute) */}
      <div className="absolute inset-0 w-full h-full">
        <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
            draggable="false"
        />
      </div>

      {/* Before Image (Top Layer - Absolute & Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize flex items-center justify-center pointer-events-none z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute w-12 h-12 rounded-full bg-white/90 border-2 border-white/50 backdrop-blur-sm flex items-center justify-center text-zinc-700 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 7l-5 5 5 5" />
            <path d="M10 7l5 5-5 5" />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
       <div className="absolute top-4 left-4 bg-black/50 text-white py-1 px-4 text-sm font-bold pointer-events-none z-10 rounded">{beforeLabel}</div>
       <div className="absolute top-4 right-4 bg-black/50 text-white py-1 px-4 text-sm font-bold pointer-events-none z-10 rounded">{afterLabel}</div>
    </div>
  );
};

export default ImageComparisonSlider;
