import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HoverShip: React.FC = () => {
  const shipRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice(('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0) || 
      ((navigator as any).msMaxTouchPoints > 0));

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!shipRef.current) return;

      gsap.to(shipRef.current, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div ref={shipRef} className="hover-ship">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent">
        <path
          fill="currentColor"
          d="M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z"
        />
      </svg>
    </div>
  );
};

export default HoverShip;