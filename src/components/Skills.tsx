import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Terminal, 
  Wrench, 
  Search,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { skillCategories } from '../data/portfolioData';

const categoryIconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
  Layout: <Layout className="w-5 h-5 text-sky-400" />,
  Server: <Server className="w-5 h-5 text-indigo-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-violet-400" />,
  Terminal: <Terminal className="w-5 h-5 text-amber-400" />,
  Wrench: <Wrench className="w-5 h-5 text-pink-400" />,
};

export const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = skillCategories.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const query = searchQuery.toLowerCase();
    const matchedSkills = cat.skills.filter((s) => s.name.toLowerCase().includes(query));
    return {
      ...cat,
      skills: matchedSkills,
      hasMatch: matchedSkills.length > 0 || cat.title.toLowerCase().includes(query),
    };
  }).filter((cat) => !searchQuery.trim() || cat.skills.length > 0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Technical Competencies"
          title="Skills &amp; Technology Stack"
          subtitle="Comprehensive overview of tools, frameworks, and architectural paradigms I utilize in production-grade software."
          accent="violet"
        />

        {/* Quick Search Filter */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills (e.g. React, Docker, LangChain, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100/90 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {categoryIconMap[category.iconName] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        skill.isPrimary
                          ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-medium hover:border-cyan-400 hover:bg-cyan-500/15'
                          : 'bg-surface-100/90 border border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {skill.isPrimary && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Indicator */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{category.skills.length} competencies</span>
                <span className="text-cyan-400/80">Active In Projects</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-surface-100/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            <span>Cyan badges highlight core production skills with intensive project deployment.</span>
          </div>
          <div className="text-slate-300">
            MERN Architecture &bull; RAG &bull; Cloud CI/CD
          </div>
        </div>

      </div>
    </section>
  );
};
