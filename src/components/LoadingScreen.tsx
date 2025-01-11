import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                times: [0, 1]
              }}
              className="mb-8 origin-center"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-16 h-16 text-[hsl(var(--accent))]"
              >
                <path
                  fill="currentColor"
                  d="M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z"
                />
              </svg>
            </motion.div>
            <motion.p
              animate={{ 
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-white/70 text-lg"
            >
              The wait is worth it!
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;