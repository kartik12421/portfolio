import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { projects } from '../data/portfolioData';
import { ProjectCategory } from '../types/portfolio';

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');

  const tabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-saas', label: 'AI SaaS & Agents' },
    { id: 'full-stack', label: 'Full-Stack Systems' },
    { id: 'web-apps', label: 'Web Applications' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'all') return true;
    return project.category.includes(activeTab);
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Featured Engineering"
          title="Production-Ready Projects"
          subtitle="Explore scalable full-stack applications, AI microservices, and interactive developer platforms built with modern architectures."
          accent="cyan"
        />

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-surface-100/80 border border-white/10 backdrop-blur-md">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 rounded-xl shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom GitHub Prompt */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Looking for more code? Check out all repositories on{' '}
            <a
              href="https://github.com/kartik12421"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              github.com/kartik12421 &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
