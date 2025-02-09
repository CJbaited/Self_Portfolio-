import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Code, Database, Server } from 'lucide-react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import HoverShip from './components/HoverShip';
import DynamicGrid from './components/DynamicGrid';
import LoadingScreen from './components/LoadingScreen';
import emailjs from '@emailjs/browser';

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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });

  useEffect(() => {
    // Initialize dark mode from localStorage or system preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    // Simulate resource loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      document.documentElement.classList.toggle('dark', newValue);
      localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
  
    // Format message to include sender's email
    const formattedMessage = `
  From: ${formData.email}
  Name: ${formData.name}
  
  Message:
  ${formData.message}
  `;
  
    try {
      await emailjs.send(
        'service_1x44vv5',
        'template_w948rja',
        {
          from_name: formData.name,
          message: formattedMessage,
        },
        'UGSYfmYRfNTsnFpr2'
      );
  
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: 'Failed to send message. Please try again.'
      });
    }
  };

  const projects = [
    {
      title: 'Learning Platform',
      description: 'Full-stack learning platform with real-time inventory/resource management',
      image: '/Candric-Learning.jpeg',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind', 'framer-motion'],
      github: 'https://github.com/CJbaited/Candice',
    },
    {
      title: 'Wipeout-Inspired VR-Game',
      description: 'Virtual reality racing game with AI opponents. Built with Unity and C#',
      image: '/black-unity_2pyg.600.webp',
      tech: ['Unity', 'C#', 'Oculus', 'SteamVR', 'AI'],
      github: 'Provided upon request',
    },
    {
      title: 'My portfolio',
      description: 'My personal portfolio website built with React, Vite and Tailwind CSS. Showcasing my projects and skills.',
      image: '/My-Portfolio.jpeg',
      tech: ['react', 'vite', 'tailwind', 'framer-motion', 'lucide'],
      github: 'https://github.com/CJbaited/Self_Portfolio-',
      live: 'https://cedricsweb.site',
    },
  ];

  const skills = [
    { icon: Code, label: 'Frontend', items: ['React','React-Native','TypeScript', 'Tailwind', 'JavaScript', 'Lucide', 'Expo Go'] },
    { icon: Server, label: 'Backend', items: ['Node.js', 'C#', '.NET', 'Go', 'Render', 'Fly.io'] },
    { icon: Database, label: 'Database', items: ['PostgreSQL', 'Supabase', 'Firebase'] },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <LoadingScreen isLoading={isInitialLoading} />
      
      {/* Main content */}
      {!isInitialLoading && (
        <>
          <div className="gradient-container" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <HoverShip />
          <DynamicGrid />
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
              {/* Wrapped each section in motion.div for smooth transitions */}
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
                      Cedric's Web
                    </motion.h1>
                    <motion.p
                      className="text-2xl text-white/80 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Full-Stack & Mobile Developer
                    </motion.p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleNavigate('about')}
                        className="py-2 px-4 rounded-lg bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/90] transition-colors text-white font-bold"
                      >
                       About Me
                      </button>
                      <button
                        onClick={() => handleNavigate('contact')}
                        className="py-2 px-4 rounded-lg bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/90] transition-colors text-white font-bold"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}

              {currentSection === 'about' && (
                <motion.section
                  className="min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="max-w-4xl w-full my-20 sm:my-0">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-glow">About Me</h2>
                    
                    {/* text container */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      {/* Image container */}
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm">
                          <motion.img
                            src="/CedricJanssens.JPEG" 
                            alt="Cedric Janssens"
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          {/* gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <p className="text-base sm:text-lg text-white/80 mb-6">
                        <br/>
                          My name is Cedric Janssens but most people call me CJ. 
                          <br/> 
                          <br/> I'm a full-stack and game developer with a passion for creating interactive experiences. 
                          <br/> <br/> I'm currently working as a freelance developer. You can find me on GitHub, Instagram or you can leave me a message here.
                        </p>
                      </div>
                    </div>

                    {/* Skills grid */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-8">
                      {skills.map(({ icon: Icon, label, items }) => (
                        <div 
                          key={label} 
                          className="p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                          <div className="flex items-center gap-4 w-full sm:w-1/3">
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                            <h3 className="text-lg sm:text-xl font-bold">{label}</h3>
                          </div>
                          <ul className="flex flex-wrap gap-2 w-full sm:w-2/3">
                            {items.map((item) => (
                              <li 
                                key={item} 
                                className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm"
                              >
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
                  className="min-h-screen flex items-center justify-center p-8 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="max-w-7xl w-full">
                    <h2 className="text-4xl font-bold mb-8 text-glow">Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min overflow-y-auto max-h-[70vh] px-2">
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
                    {formStatus.isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-8 rounded-lg bg-white/5 backdrop-blur-sm"
                      >
                        <h3 className="text-xl font-bold mb-4 text-[hsl(var(--accent))]">Message Sent!</h3>
                        <p className="text-white/80 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                        <button
                          onClick={() => setFormStatus({ isSubmitting: false, isSubmitted: false, error: null })}
                          className="py-2 px-4 rounded-lg bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))/90] transition-colors"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[hsl(var(--accent))] transition-colors"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[hsl(var(--accent))] transition-colors"
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="Message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[hsl(var(--accent))] transition-colors"
                          />
                        </div>
                        {formStatus.error && (
                          <div className="text-red-500 text-sm">{formStatus.error}</div>
                        )}
                        <button
                          type="submit"
                          disabled={formStatus.isSubmitting}
                          className={`w-full py-3 px-6 rounded-lg bg-[hsl(var(--accent))] 
                            hover:bg-[hsl(var(--accent))/90] transition-colors text-white font-bold
                            ${formStatus.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </form>
                    )}
                    <div className="flex justify-center gap-6 mt-8">
                      <a href="https://github.com/CJbaited" className="text-white/70 hover:text-white transition-colors">
                        <Github className="w-6 h-6" />
                      </a>
                      <a href="https://www.instagram.com/cedricjwoods/?__pwa=1" className="text-white/70 hover:text-white transition-colors">
                        <Instagram className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </motion.section>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
