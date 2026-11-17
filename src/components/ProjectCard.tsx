import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col border border-line bg-bg transition-colors duration-300 hover:border-line-strong"
      >
        {/* Header: number, badge, links — all plain type */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
          <span className="font-mono text-[11px] tabular-nums text-faint">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            {project.badge || 'Full-stack'}
          </span>

          <div className="flex items-center gap-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="grid h-8 w-8 place-items-center rounded-md text-faint transition-colors hover:bg-sunken hover:text-ink"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="grid h-8 w-8 place-items-center rounded-md text-faint transition-colors hover:bg-sunken hover:text-ink"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-6 py-6">
          <h3 className="hang font-display text-2xl font-normal tracking-tight text-ink transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-faint">
            {project.tagline}
          </p>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {project.highlights.slice(0, 2).map((h, i) => (
                <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Stack as a comma-set mono line */}
          <p className="mt-5 font-mono text-[11px] leading-relaxed text-faint">
            {project.techStack.join(', ')}
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group/btn inline-flex items-center gap-1 text-[13px] text-muted transition-colors hover:text-accent"
            >
              Case notes
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" strokeWidth={2} />
            </button>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent underline-offset-4 transition-colors hover:underline"
            >
              Live
              <ExternalLink className="h-3 w-3" strokeWidth={2} />
            </a>
          </div>
        </div>
      </motion.article>

      {/* Case notes modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className="relative my-auto w-full max-w-2xl border border-line bg-elev shadow-pop"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {project.tagline}
                  </span>
                  <h4 className="hang mt-1.5 font-display text-2xl font-normal tracking-tight text-ink">
                    {project.title}
                  </h4>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-6 py-6 sm:px-8">
                <p className="text-sm leading-relaxed text-muted">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-6">
                    <h5 className="kicker">Highlights</h5>
                    <ul className="mt-3 space-y-2.5">
                      {project.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 border-l-2 border-accent/40 py-0.5 pl-4 text-sm leading-relaxed text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  <h5 className="kicker">Stack</h5>
                  <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted">
                    {project.techStack.join(' · ')}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-line pt-5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-sunken"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    Repository
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-on transition-colors hover:bg-accent-strong"
                  >
                    Open live site
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
