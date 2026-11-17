import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { experience } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="bg-sunken px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          badge="Experience"
          title="Where I've worked"
          subtitle="Shipping production features on a commercial full-stack team — REST endpoints, UI work and deployment."
        />

        <div className="border-t border-line">
          {experience.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid gap-6 border-b border-line py-9 lg:grid-cols-12 lg:gap-8"
            >
              {/* Rail: period + location */}
              <div className="lg:col-span-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {item.period}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {item.location}
                </div>
              </div>

              {/* Main */}
              <div className="lg:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="hang font-display text-2xl font-normal tracking-tight text-ink sm:text-[1.75rem]">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {item.type}
                  </span>
                </div>
                <div className="mt-1 text-sm font-medium text-muted">{item.company}</div>

                <ul className="mt-5 space-y-3">
                  {item.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="max-w-3xl">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] text-faint">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
