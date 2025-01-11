import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingBarProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const duration = 600; // Faster loading time
      const increment = 100 / (duration / 16);
      
      const timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(timer);
            return 100;
          }
          return next;
        });
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="h-full bg-[hsl(var(--accent))]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default LoadingBar;