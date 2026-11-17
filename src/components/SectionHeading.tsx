import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  /** Section number shown in the left rail, e.g. "01" */
  index?: string;
  /** Small caps kicker above the title */
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
}

/**
 * Editorial section header: a hairline rule, a numbered rail on the left,
 * and the serif headline on the right. Every section uses this so the page
 * reads like a single printed document rather than a stack of widgets.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  badge,
  title,
  subtitle,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rule mb-12 pt-5 md:mb-16"
    >
      <div className="grid gap-5 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 lg:col-span-2">
          <div className="flex items-baseline gap-3 md:block">
            {index && (
              <span className="font-mono text-xs tabular-nums text-accent">{index}</span>
            )}
            {badge && (
              <span className="kicker md:mt-2 md:block">{badge}</span>
            )}
          </div>
        </div>

        <div className="md:col-span-9 lg:col-span-10">
          <h2 className="hang text-balance font-display text-display-sm font-normal tracking-tight text-ink md:text-display">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:mt-5 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.header>
  );
};
