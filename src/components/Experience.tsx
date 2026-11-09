import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Terminal, 
  GitBranch, 
  Sparkles 
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { experience } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Work History"
          title="Professional Experience"
          subtitle="Real-world software engineering internship delivering production features, REST API endpoints, and full-stack solutions."
          accent="cyan"
        />

        <div className="max-w-4xl mx-auto">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10 border-l-2 border-cyan-500/30 ml-2 sm:ml-4"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#07090e] border-2 border-cyan-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyan-500/40 transition-all shadow-xl mb-8 group">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider mb-2">
                      {item.type}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-base font-semibold text-slate-200 mt-1">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 gap-1.5">
                    <div className="flex items-center gap-1.5 bg-surface-100 px-3 py-1.5 rounded-lg border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Deliverables Bullet Points */}
                <div className="mb-6 space-y-3">
                  {item.description.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                    Technologies Applied
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface-100 border border-white/10 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
