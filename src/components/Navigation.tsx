import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';
import LoadingBar from './LoadingBar';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  isNavigating: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentSection, 
  onNavigate, 
  isDarkMode, 
  toggleDarkMode, 
  isNavigating 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 48px) 48px)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 48px) 48px)',
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <LoadingBar isLoading={isNavigating} onLoadingComplete={() => {}} />
      
      {/* Dark Mode Toggle Button */}
      <motion.button
        className="fixed top-8 right-24 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-colors"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <motion.div
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isDarkMode ? (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
              />
            </motion.svg>
          ) : (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
              />
            </motion.svg>
          )}
        </motion.div>
      </motion.button>

      {/* Menu Toggle Button */}
      <motion.button
        className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 h-full w-80 bg-gradient-to-bl from-black/80 via-black/60 to-transparent backdrop-blur-xl z-40"
          >
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  animate={{
                    x: [
                      Math.random() * 320,
                      Math.random() * 320
                    ],
                    y: [
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight
                    ]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>

            <div className="relative flex flex-col gap-4 mt-32 p-8">
              {navItems.map(({ id, label, icon: Icon }, index) => (
                <motion.button
                  key={id}
                  variants={itemVariants}
                  onClick={() => handleNavigation(id)}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all group
                    ${currentSection === id 
                      ? 'bg-white/20 text-white neon-border' 
                      : 'text-white/50 hover:text-white'
                    }`}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  style={{
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-lg relative overflow-hidden">
                    {label}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;