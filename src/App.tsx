import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Code, Database, Server } from 'lucide-react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import HoverShip from './components/HoverShip';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat app with AI-powered responses',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
      tech: ['TypeScript', 'WebSocket', 'OpenAI', 'MongoDB'],
      github: 'https://github.com'
    }
  ];

  const skills = [
    { icon: Code, label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind'] },
    { icon: Server, label: 'Backend', items: ['Node.js', 'Python', 'Go'] },
    { icon: Database, label: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] }
  ];

  const sectionVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <HoverShip />
      <Navigation currentSection={currentSection} onNavigate={setCurrentSection} />

      <AnimatePresence mode="wait">
        {currentSection === 'home' && (
          <motion.section
            key="home"
            className="h-screen flex items-center justify-center"
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="text-center">
              <motion.h1
                className="text-6xl font-bold mb-4 text-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                John Doe
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
            key="about"
            className="h-screen flex items-center justify-center p-8"
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold mb-8 text-glow">About Me</h2>
              <p className="text-lg text-white/80 mb-8">
                Passionate about creating seamless digital experiences and drawing inspiration
                from the futuristic aesthetics of games like Wipeout. I specialize in
                building modern web applications with a focus on performance and user experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skills.map(({ icon: Icon, label, items }) => (
                  <div key={label} className="p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                    <Icon className="w-8 h-8 mb-4" />
                    <h3 className="text-xl font-bold mb-4">{label}</h3>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item} className="text-white/70">{item}</li>
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
            key="projects"
            className="h-screen flex items-center justify-center p-8"
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
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
            key="contact"
            className="h-screen flex items-center justify-center p-8"
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
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
      </AnimatePresence>
    </div>
  );
}

export default App;