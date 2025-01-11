import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tech,
  github,
  live,
}) => {
  return (
    <motion.div
      className="relative group bg-white/5 rounded-lg overflow-hidden flex flex-col h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow border border-white/10 border-t-0">
        <h3 className="text-lg font-bold mb-2 text-glow">{title}</h3>
        <p className="text-white/70 mb-4 text-sm line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto pt-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;