import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate, isDarkMode, toggleDarkMode }) => {
  const navItems = [
    { id: 'home', icon: Home },
    { id: 'about', icon: User },
    { id: 'projects', icon: Briefcase },
    { id: 'contact', icon: Mail },
  ];

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
    tap: { scale: 0.9, rotate: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6">
        {navItems.map(({ id, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => onNavigate(id)}
            className={`p-3 rounded-lg transition-all duration-300 ${
              currentSection === id
                ? 'bg-white/10 text-white neon-border'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Icon className="w-6 h-6" />
          </motion.button>
        ))}
        <motion.button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg transition-all duration-300 text-white/50 hover:text-white hover:bg-white/5"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navigation;