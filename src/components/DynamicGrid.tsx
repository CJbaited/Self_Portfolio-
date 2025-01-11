import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import throttle from 'lodash/throttle';

interface GridCell {
  x: number;
  y: number;
  filled: boolean;
  timestamp: number | null;
}

const GridCell = memo(({ cell, cellSize }: { cell: GridCell; cellSize: number }) => (
  <div
    className={`absolute will-change-transform will-change-opacity transition-all duration-300 ${
      cell.filled ? 'bg-white opacity-20 scale-100' : 'opacity-0 scale-50'
    }`}
    style={{
      transform: `translate3d(${cell.x}px, ${cell.y}px, 0)`,
      width: `${cellSize}px`,
      height: `${cellSize}px`,
      backfaceVisibility: 'hidden'
    }}
  />
));

const DynamicGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<GridCell[]>([]);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const rafRef = useRef<number>();
  
  const cellSize = 20;
  const dynamicLimit = 3;
  const maxAliveTime = 1000;

  // Handle dynamic cell updates and cleanup
  useEffect(() => {
    const updateCells = () => {
      const now = Date.now();

      setCells(prevCells => {
        const newCells = [...prevCells];
        let hasChanges = false;

        // Random cell updates
        if (now % 500 < 16) {
          const randomIndices = new Set<number>();
          while (randomIndices.size < dynamicLimit) {
            randomIndices.add(Math.floor(Math.random() * newCells.length));
          }

          randomIndices.forEach(index => {
            newCells[index] = {
              ...newCells[index],
              filled: !newCells[index].filled,
              timestamp: now
            };
            hasChanges = true;
          });
        }

        // Cleanup cells
        newCells.forEach((cell, index) => {
          if (cell.filled && cell.timestamp && now - cell.timestamp > maxAliveTime) {
            newCells[index] = {
              ...cell,
              filled: false,
              timestamp: null
            };
            hasChanges = true;
          }
        });

        return hasChanges ? newCells : prevCells;
      });

      rafRef.current = requestAnimationFrame(updateCells);
    };

    rafRef.current = requestAnimationFrame(updateCells);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle viewport updates
  const updateViewport = useCallback(() => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setViewportDimensions({
        width: rect.width,
        height: rect.height
      });
    }
  }, []);

  const debouncedResize = useCallback(
    throttle(updateViewport, 250),
    []
  );

  // Initialize grid
  const initGrid = useCallback(() => {
    const { width, height } = viewportDimensions;
    const columns = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    const totalCells = columns * rows;
    
    setCells(Array.from({ length: totalCells }, (_, index) => ({
      x: (index % columns) * cellSize,
      y: Math.floor(index / columns) * cellSize,
      filled: false,
      timestamp: null
    })));
  }, [viewportDimensions]);

  // Setup and cleanup
  useEffect(() => {
    updateViewport();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      debouncedResize.cancel();
    };
  }, [debouncedResize]);

  useEffect(() => {
    if (viewportDimensions.width && viewportDimensions.height) {
      initGrid();
    }
  }, [viewportDimensions, initGrid]);

  return (
    <div 
      ref={gridRef} 
      className="fixed inset-0"
      style={{ perspective: '1000px', willChange: 'transform' }}
    >
      {cells.map((cell, index) => (
        <GridCell key={index} cell={cell} cellSize={cellSize} />
      ))}
    </div>
  );
};

export default memo(DynamicGrid);