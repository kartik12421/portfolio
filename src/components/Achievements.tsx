import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  GitPullRequest, 
  Sparkles, 
  Code, 
  CheckCircle2 
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { achievements } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  GitPullRequest: <GitPullRequest className="w-6 h-6 text-emerald-400" />,
  Trophy: <Trophy className="w-6 h-6 text-amber-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-cyan-400" />,
  Code: <Code className="w-6 h-6 text-violet-400" />,
};

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Honors &amp; Milestones"
          title="Key Achievements"
          subtitle="Recognition across national hackathons, open-source initiatives, and academic competitions."
          accent="cyan"
        />

        {/* Grid of Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg hover:shadow-cyan-500/10"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    {iconMap[item.iconName] || <Trophy className="w-6 h-6 text-cyan-400" />}
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <div className="text-xs font-mono text-cyan-400/90 mb-4">
                  {item.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.highlight}
                </p>
              </div>

              {/* Bottom indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Achievement</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
