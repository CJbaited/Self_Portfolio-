import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Code, Database, Server } from 'lucide-react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import HoverShip from './components/HoverShip';
import DynamicGrid from './components/DynamicGrid';

const sectionVariants = {
  enter: { 
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(10px)'
  },
  center: { 
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(10px)'
  }
};

const transition = {
  type: "spring",
  duration: 0.7,
  bounce: 0.2
};

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigate = (section: string) => {
    setIsNavigating(true);
    
    // Add a small delay before starting the transition
    setTimeout(() => {
      setCurrentSection(section);
      // Add a small delay before finishing the loading
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    }, 300);
  };

  const projects = [
    {
      title: 'Learning Platform',
      description: 'Full-stack learning platform with real-time inventory/resource management',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Wipeout-Inspired VR-Game',
      description: 'Virtual reality racing game with AI opponents. Built with Unity and C#',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
      tech: ['Unity', 'C#', 'Oculus', 'SteamVR', 'AI'],
      github: 'https://github.com',
    },
  ];

  const skills = [
    { icon: Code, label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind'] },
    { icon: Server, label: 'Backend', items: ['Node.js', 'C#', 'Go'] },
    { icon: Database, label: 'Database', items: ['PostgreSQL', 'Supabase', 'MySQL'] },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Gradient Layers */}
      <div className="gradient-container">
        <div
          className={`gradient-light ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`gradient-dark ${
            isDarkMode ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Overlay Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* HoverShip Component */}
      <HoverShip />
      <DynamicGrid />

      {/* Navigation Component */}
      <Navigation
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isNavigating={isNavigating}
      />

      {/* Main Content with improved transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSection}
          className="w-full min-h-screen relative z-10"
          initial="enter"
          animate="center"
          exit="exit"
          variants={sectionVariants}
          transition={transition}
        >
          {/* Wrap each section in motion.div for smooth transitions */}
          {currentSection === 'home' && (
            <motion.section
              className="h-screen flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <motion.h1
                  className="text-6xl font-bold mb-4 text-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Cedric Janssens
                </motion.h1>
                <motion.p
                  className="text-2xl text-white/80 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Full-Stack Developer & Game Enthusiast
                </motion.p>
              </div>
            </motion.section>
          )}

          {currentSection === 'about' && (
            <motion.section
              className="h-screen flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="max-w-4xl">
                <h2 className="text-4xl font-bold mb-8 text-glow">About Me</h2>
                <p className="text-lg text-white/80 mb-8">
                  Passionate about creating seamless digital experiences and drawing inspiration
                  from the futuristic aesthetics of games like Wipeout. I specialize in building
                  modern web applications with a focus on performance and user experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {skills.map(({ icon: Icon, label, items }) => (
                    <div key={label} className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                      <Icon className="w-8 h-8 mb-4" />
                      <h3 className="text-xl font-bold mb-4">{label}</h3>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item} className="text-white/70">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 'projects' && (
            <motion.section
              className="h-screen flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="max-w-6xl">
                <h2 className="text-4xl font-bold mb-8 text-glow">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 'contact' && (
            <motion.section
              className="h-screen flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="max-w-md w-full">
                <h2 className="text-4xl font-bold mb-8 text-glow">Contact</h2>
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[hsl(var(--accent))] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[hsl(var(--accent))] transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[hsl(var(--accent))] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/90] transition-colors text-white font-bold"
                  >
                    Send Message
                  </button>
                </form>
                <div className="flex justify-center gap-6 mt-8">
                  <a href="https://github.com" className="text-white/70 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com" className="text-white/70 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com" className="text-white/70 hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
