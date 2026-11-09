import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Brain, 
  Cloud, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Code,
  Check
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { personalInfo, aboutHighlights } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
  Brain: <Brain className="w-6 h-6 text-violet-400" />,
  Cloud: <Cloud className="w-6 h-6 text-sky-400" />,
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Engineering Philosophy"
          title={personalInfo.aboutHeading}
          subtitle={personalInfo.aboutIntro}
          accent="cyan"
        />

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {aboutHighlights.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              {/* Card top decorative accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent group-hover:via-cyan-400/60 transition-all" />

              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center mb-6 group-hover:border-cyan-500/40 group-hover:scale-105 transition-all shadow-inner">
                  {iconMap[card.icon] || <Sparkles className="w-6 h-6 text-cyan-400" />}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                {/* Subtitle / Tech Tags */}
                <div className="text-xs font-mono text-cyan-400/90 mb-4 tracking-wide">
                  {card.subtitle}
                </div>

                {/* Card Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom detail pill */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production proven patterns</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-card border border-white/10 p-6 sm:p-10 shadow-xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {personalInfo.stats.map((stat, idx) => (
              <div 
                key={stat.label} 
                className={`flex flex-col items-center ${idx > 0 && idx % 2 === 0 ? 'pt-6 lg:pt-0' : ''} ${idx % 2 === 1 ? 'pt-6 sm:pt-0' : ''}`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-cyan mb-2 tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 max-w-[180px] leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Values Micro-banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-surface-100/50 border border-white/5 text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>COER University, Roorkee &bull; Bachelor of Computer Applications (BCA)</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-violet-400" />
            <span>Bachelor of Computer Applications &bull; <strong className="text-cyan-300">Software Engineering Focus</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
