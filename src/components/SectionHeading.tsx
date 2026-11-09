import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accent?: 'cyan' | 'violet';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  accent = 'cyan',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-3 ${
          accent === 'cyan'
            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
            : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${accent === 'cyan' ? 'bg-cyan-400' : 'bg-violet-400'} animate-pulse`} />
          {badge}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className={`mt-4 h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full ${isCenter ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};
