import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ChevronRight, 
  X,
  Terminal,
  Cpu,
  Globe
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom visual theme based on project id
  const getThemeColors = (id: string) => {
    switch (id) {
      case 'syntra-ai':
        return {
          gradient: 'from-cyan-500/20 via-sky-500/10 to-indigo-500/20',
          badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
          accentColor: '#38bdf8',
          icon: <Cpu className="w-5 h-5 text-cyan-400" />
        };
      case 'gen-ui':
        return {
          gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
          badgeBg: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
          accentColor: '#a855f7',
          icon: <Sparkles className="w-5 h-5 text-violet-400" />
        };
      case 'travel-den':
      default:
        return {
          gradient: 'from-emerald-500/20 via-teal-500/10 to-blue-500/20',
          badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          accentColor: '#34d399',
          icon: <Globe className="w-5 h-5 text-emerald-400" />
        };
    }
  };

  const theme = getThemeColors(project.id);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="glass-card rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-cyan-500/10"
      >
        {/* Top Header & Visual Banner */}
        <div className={`p-6 bg-gradient-to-br ${theme.gradient} border-b border-white/5 relative overflow-hidden`}>
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-200/90 border border-white/10 flex items-center justify-center shadow-inner">
                {theme.icon}
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${theme.badgeBg}`}>
                  {project.badge || 'Full-Stack'}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="w-8 h-8 rounded-lg bg-surface-100/90 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live deployment`}
                className="w-8 h-8 rounded-lg bg-surface-100/90 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-cyan-400/90 mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {project.description}
            </p>

            {/* Key highlights preview (first 2) */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-6 space-y-2">
                {project.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Tech Stack Badges */}
            <div className="pt-4 border-t border-white/5 mb-6">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                Technologies &amp; Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-surface-100/90 border border-white/10 text-slate-300 group-hover:border-white/15 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-medium text-slate-300 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <span>Architecture breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Deep-Dive Architecture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-surface-100 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{project.title}</h4>
                    <span className="text-xs font-mono text-cyan-400">{project.tagline}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Architectural Highlights */}
              <div className="mb-6">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Key Architecture &amp; Engineering Highlights</span>
                </h5>
                <div className="space-y-2.5">
                  {project.highlights?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-200/60 border border-white/5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Tech Stack */}
              <div className="mb-8">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Full Technology Stack
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-surface-200 hover:bg-surface-50 border border-white/10 text-white flex items-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
