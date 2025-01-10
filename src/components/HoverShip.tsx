import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HoverShip: React.FC = () => {
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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