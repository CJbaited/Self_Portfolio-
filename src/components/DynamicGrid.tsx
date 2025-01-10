import React, { useEffect, useRef, useState } from 'react';

interface GridCell {
  x: number;
  y: number;
  filled: boolean;
}

const DynamicGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<GridCell[]>([]);
  const cellSize = 20; // Size of each grid cell

  useEffect(() => {
    // Initialize grid cells
    const initGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newCells: GridCell[] = [];

      for (let x = 0; x < width; x += cellSize) {
        for (let y = 0; y < height; y += cellSize) {
          newCells.push({
            x,
            y,
            filled: false
          });
        }
      }
      setCells(newCells);
    };

    initGrid();
    window.addEventListener('resize', initGrid);
    return () => window.removeEventListener('resize', initGrid);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = 100; // Affect radius around mouse

      setCells(prevCells => 
        prevCells.map(cell => {
          const distance = Math.sqrt(
            Math.pow(cell.x - mouseX, 2) + 
            Math.pow(cell.y - mouseY, 2)
          );

          if (distance < radius) {
            // Random chance to fill/deplete based on distance
            return {
              ...cell,
              filled: Math.random() > distance / radius
            };
          }
          return cell;
        })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={gridRef} className="fixed inset-0 pointer-events-none">
      {cells.map((cell, index) => (
        <div
          key={index}
          className={`absolute transition-opacity duration-300 ${
            cell.filled ? 'bg-white opacity-20' : 'opacity-0'
          }`}
          style={{
            left: `${cell.x}px`,
            top: `${cell.y}px`,
            width: `${cellSize}px`,
            height: `${cellSize}px`
          }}
        />
      ))}
    </div>
  );
};

export default DynamicGrid;