import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import { ProjectCategory } from '../types/portfolio';

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');

  const tabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'ai-saas', label: 'AI & SaaS' },
    { id: 'full-stack', label: 'Full-stack' },
    { id: 'web-apps', label: 'Web apps' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'all') return true;
    return project.category.includes(activeTab);
  });

  return (
    <section id="projects" className="bg-sunken px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          badge="Selected work"
          title="Things I've shipped"
          subtitle="Full-stack systems, AI microservices and developer platforms — each one built end to end and deployed."
        />

        {/* Filter as plain text tabs with an underline, matching the navbar */}
        <div className="mb-10 flex flex-wrap items-center gap-x-1 gap-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-2 text-sm transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="project-underline"
                    className="absolute inset-x-3 bottom-1 h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}

          <span className="ml-auto font-mono text-[11px] tabular-nums text-faint">
            {filteredProjects.length} / {projects.length}
          </span>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 border-t border-line pt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            More on{' '}
            <a
              href="https://github.com/kartik12421"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 transition-colors hover:underline"
            >
              github.com/kartik12421
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
