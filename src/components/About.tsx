import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Brain, Cloud, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { personalInfo, aboutHighlights } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="h-5 w-5" strokeWidth={1.5} />,
  Brain: <Brain className="h-5 w-5" strokeWidth={1.5} />,
  Cloud: <Cloud className="h-5 w-5" strokeWidth={1.5} />,
};

export const About: React.FC = () => {
  return (
    <section id="about" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          badge="About"
          title={personalInfo.aboutHeading}
          subtitle={personalInfo.aboutIntro}
        />

        {/* Three columns divided by hairlines — no card borders, no fills */}
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {aboutHighlights.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-bg p-7 transition-colors duration-300 hover:bg-elev lg:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="text-accent">{iconMap[card.icon] || <Layers className="h-5 w-5" strokeWidth={1.5} />}</span>
                <span className="font-mono text-[11px] tabular-nums text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-accent">
                {card.subtitle}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {card.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-1 border-t border-line pt-4 text-[11px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent">
                Detail
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </span>
            </motion.article>
          ))}
        </div>

        {/* Stats — big serif numerals on a ruled strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4"
        >
          {personalInfo.stats.map((stat) => (
            <div key={stat.label}>
              <div className="hang font-display text-4xl font-normal tabular-nums tracking-tight text-ink sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-ink">{stat.label}</div>
              <div className="mt-1 text-[13px] leading-snug text-faint">{stat.detail}</div>
            </div>
          ))}
        </motion.div>

        {/* Education footnote */}
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>COER University, Roorkee &mdash; Bachelor of Computer Applications</span>
          <span>Software Engineering focus</span>
        </div>
      </div>
    </section>
  );
};
