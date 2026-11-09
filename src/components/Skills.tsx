import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Terminal, 
  Wrench, 
  Search,
  Sparkles,
  Grid,
  Layers
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { TechSkillIcon } from './TechSkillIcon';
import { skillCategories } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';

const categoryIconMap: Record<string, React.ReactNode> = {
  all: <Sparkles className="w-4 h-4 text-cyan-400" />,
  languages: <Code2 className="w-4 h-4 text-amber-400" />,
  frontend: <Layout className="w-4 h-4 text-sky-400" />,
  backend: <Server className="w-4 h-4 text-emerald-400" />,
  databases: <Database className="w-4 h-4 text-green-400" />,
  ai: <Cpu className="w-4 h-4 text-violet-400" />,
  'cloud-devops': <Terminal className="w-4 h-4 text-blue-400" />,
  tools: <Wrench className="w-4 h-4 text-pink-400" />,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState<'grid' | 'grouped'>('grid');

  // Flatten all skills with category info
  const allSkills: SkillItem[] = useMemo(() => {
    return skillCategories.flatMap((cat) => cat.skills);
  }, []);

  // Filter skills based on selected category and search input
  const filteredSkills = useMemo(() => {
    let result = allSkills;

    if (selectedCategory !== 'all') {
      const activeCat = skillCategories.find((c) => c.id === selectedCategory);
      result = activeCat ? activeCat.skills : result;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [allSkills, selectedCategory, searchQuery]);

  // Categories with matching items for Grouped view
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      if (selectedCategory === 'all') return skillCategories;
      return skillCategories.filter((c) => c.id === selectedCategory);
    }

    const query = searchQuery.toLowerCase().trim();
    return skillCategories
      .map((cat) => {
        const matches = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.category.toLowerCase().includes(query)
        );
        return {
          ...cat,
          skills: matches,
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [searchQuery, selectedCategory]);

  const categoryTabs = [
    { id: 'all', label: 'All Stack' },
    ...skillCategories.map((c) => ({ id: c.id, label: c.title })),
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Technical Stack"
          title="Skills &amp; Technology Stack"
          subtitle="A comprehensive showcase of programming languages, frontend and backend frameworks, databases, and AI tooling with production expertise."
          accent="violet"
        />

        {/* Controls: Search, View Mode Toggle, and Category Pills */}
        <div className="flex flex-col items-center gap-6 mb-12 max-w-4xl mx-auto">
          
          {/* Top Search & View Toggle Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. React, Docker, MongoDB, LangChain)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-surface-100/90 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-cyan-400 hover:text-white px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Layout Toggle: Grid vs Grouped */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-100 border border-white/10 shrink-0">
              <button
                onClick={() => setViewLayout('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewLayout === 'grid'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Unified Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => setViewLayout('grouped')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewLayout === 'grouped'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grouped Category View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Category View</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 text-white border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                      : 'bg-surface-100/80 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {categoryIconMap[tab.id] || <Sparkles className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* View Mode 1: Unified Grid View */}
        {viewLayout === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  className="glass-card rounded-2xl p-4 border border-white/10 hover:border-cyan-500/40 flex flex-col items-center text-center justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm"
                  style={{
                    ['--brand-color' as any]: skill.color || '#38bdf8',
                  }}
                >
                  {/* Skill Official Logo Image */}
                  <div className="mb-3 w-12 h-12 flex items-center justify-center">
                    <TechSkillIcon
                      name={skill.name}
                      imageUrl={skill.imageUrl}
                      color={skill.color}
                      className="w-12 h-12"
                    />
                  </div>

                  {/* Skill Name */}
                  <div className="w-full">
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5 truncate">
                      {skill.category}
                    </span>
                  </div>

                  {/* Top-right Primary Dot if core */}
                  {skill.isPrimary && (
                    <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-cyan-400" title="Core Production Skill" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode 2: Categorized Grouped View */}
        {viewLayout === 'grouped' && (
          <div className="space-y-8">
            {filteredCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-cyan-400">
                    {categoryIconMap[cat.id] || <Sparkles className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                    <p className="text-xs font-mono text-slate-400">{cat.subtitle}</p>
                  </div>
                </div>

                {/* Skills Grid within Category */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-surface-100/80 border border-white/5 hover:border-cyan-500/40 flex items-center gap-3 group transition-all"
                    >
                      <TechSkillIcon
                        name={skill.name}
                        imageUrl={skill.imageUrl}
                        color={skill.color}
                        className="w-9 h-9 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors block truncate">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State when Search Yields No Match */}
        {filteredSkills.length === 0 && (
          <div className="py-16 text-center rounded-2xl bg-surface-100/40 border border-white/5 max-w-md mx-auto">
            <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-300 font-semibold mb-1">
              No matching technologies found
            </p>
            <p className="text-xs text-slate-500 font-mono mb-4">
              Try searching for &quot;React&quot;, &quot;Docker&quot;, &quot;MongoDB&quot;, or clear the search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
