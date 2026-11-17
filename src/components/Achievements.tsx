import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, GitPullRequest, Sparkles, Code } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { achievements } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  GitPullRequest: <GitPullRequest className="h-5 w-5" strokeWidth={1.5} />,
  Trophy: <Trophy className="h-5 w-5" strokeWidth={1.5} />,
  Sparkles: <Sparkles className="h-5 w-5" strokeWidth={1.5} />,
  Code: <Code className="h-5 w-5" strokeWidth={1.5} />,
};

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="bg-sunken px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          badge="Achievements"
          title="Recognition"
          subtitle="Hackathons, open source and academic competitions."
        />

        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {achievements.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-sunken p-7 transition-colors duration-300 hover:bg-bg lg:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-accent">
                  {iconMap[item.iconName] || <Trophy className="h-5 w-5" strokeWidth={1.5} />}
                </span>
                <span className="shrink-0 border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {item.badge}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] text-accent">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.highlight}</p>

              <span className="mt-6 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                {String(index + 1).padStart(2, '0')} &mdash; verified
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
