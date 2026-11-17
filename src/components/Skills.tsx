import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { TechSkillIcon } from './TechSkillIcon';
import { skillCategories } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState<'grid' | 'grouped'>('grid');

  const allSkills: SkillItem[] = useMemo(() => skillCategories.flatMap((cat) => cat.skills), []);

  const filteredSkills = useMemo(() => {
    let result = allSkills;
    if (selectedCategory !== 'all') {
      const activeCat = skillCategories.find((c) => c.id === selectedCategory);
      result = activeCat ? activeCat.skills : result;
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
      );
    }
    return result;
  }, [allSkills, selectedCategory, searchQuery]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      if (selectedCategory === 'all') return skillCategories;
      return skillCategories.filter((c) => c.id === selectedCategory);
    }
    const query = searchQuery.toLowerCase().trim();
    return skillCategories
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter(
          (s) => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.skills.length > 0);
  }, [searchQuery, selectedCategory]);

  const categoryTabs = [
    { id: 'all', label: 'Everything' },
    ...skillCategories.map((c) => ({ id: c.id, label: c.title })),
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <section id="skills" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          badge="Toolbox"
          title="Skills & technologies"
          subtitle="Languages, frameworks, databases and AI tooling — filtered down to what I actually reach for."
        />

        {/* Controls row */}
        <div className="mb-10 flex flex-col gap-5 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {categoryTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 text-[13px] transition-colors ${
                    isSelected ? 'text-accent' : 'text-muted hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Search as an underlined input, not a boxed field */}
            <div className="relative flex-1 lg:w-56 lg:flex-none">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
              <input
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-0 border-b border-line bg-transparent py-2 pl-6 pr-6 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-wider text-faint hover:text-ink"
                >
                  &times;
                </button>
              )}
            </div>

            {/* View switch */}
            <div className="flex shrink-0 border border-line">
              <button
                onClick={() => setViewLayout('grid')}
                aria-pressed={viewLayout === 'grid'}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  viewLayout === 'grid' ? 'bg-accent text-accent-on' : 'text-muted hover:text-ink'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewLayout('grouped')}
                aria-pressed={viewLayout === 'grouped'}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  viewLayout === 'grouped' ? 'bg-accent text-accent-on' : 'text-muted hover:text-ink'
                }`}
              >
                Grouped
              </button>
            </div>
          </div>
        </div>

        {/* Count line */}
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Showing {filteredSkills.length} of {allSkills.length}
        </p>

        {/* View 1: flat grid on hairlines */}
        {viewLayout === 'grid' && filteredSkills.length > 0 && (
          <motion.div layout className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  title={skill.isPrimary ? 'Core skill' : undefined}
                  className="group relative flex flex-col items-center gap-3 bg-bg px-3 py-6 text-center transition-colors duration-200 hover:bg-elev"
                >
                  <TechSkillIcon
                    name={skill.name}
                    imageUrl={skill.imageUrl}
                    color={skill.color}
                    className="h-10 w-10"
                  />
                  <div className="w-full">
                    <div className="truncate text-[13px] font-medium text-ink">{skill.name}</div>
                    <div className="truncate font-mono text-[10px] text-faint">{skill.category}</div>
                  </div>
                  {skill.isPrimary && (
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View 2: grouped by category */}
        {viewLayout === 'grouped' && (
          <div className="space-y-10">
            {filteredCategories.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                      {cat.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-faint">{cat.subtitle}</p>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-faint">
                    {cat.skills.length}
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group flex items-center gap-2.5 border border-line bg-bg py-1.5 pl-1.5 pr-3.5 transition-colors hover:border-line-strong"
                    >
                      <TechSkillIcon
                        name={skill.name}
                        imageUrl={skill.imageUrl}
                        color={skill.color}
                        className="h-7 w-7"
                      />
                      <span className="text-[13px] text-ink">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="border border-dashed border-line-strong px-6 py-14 text-center">
            <p className="font-display text-lg text-ink">Nothing matches &ldquo;{searchQuery}&rdquo;</p>
            <p className="mt-2 text-sm text-muted">
              Try &ldquo;React&rdquo;, &ldquo;Docker&rdquo; or &ldquo;MongoDB&rdquo; instead.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 rounded-md border border-line-strong px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-sunken"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
