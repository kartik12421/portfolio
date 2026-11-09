import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileDown, 
  Sparkles, 
  MapPin, 
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Badge: Open to Internships */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-100/90 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-sm shadow-emerald-500/10 mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.heroBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Full-Stack Developer Building{' '}
              <span className="text-gradient-cyan relative">
                Scalable Web
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-cyan-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>{' '}
              &amp; <span className="text-gradient-violet">AI Products</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              {personalInfo.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 transition-all group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenCV}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-surface-100/90 hover:bg-surface-50 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-all shadow-sm active:scale-95"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="text-xs sm:text-sm text-slate-400 hover:text-cyan-300 underline-offset-4 hover:underline transition-colors px-2 py-1"
              >
                Let&apos;s talk &rarr;
              </a>
            </div>

            {/* Quick Meta Location & Academic Details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-8 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalInfo.location}</span>
              </div>
              <span className="text-white/20">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>COER University, Roorkee</span>
              </div>
              <span className="text-white/20">&bull;</span>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Available Immediately</span>
              </div>
            </div>

            {/* Tech Badges Container */}
            <div className="w-full">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Core Production Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {personalInfo.heroTechBadges.map((badge, idx) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-100/80 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all shadow-sm cursor-default"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: High-Craft Profile & Developer Interactive Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Ambient Glow behind the photo */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-subtle" />

            {/* Profile Presentation Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Outer Glassmorphic Frame */}
              <div className="relative p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 border border-white/15 backdrop-blur-xl shadow-2xl shadow-cyan-950/40">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group">
                  <img
                    src={personalInfo.profileImage}
                    alt="Kartik Joshi - Full-Stack & AI Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-[1.02] contrast-[1.03]"
                    loading="eager"
                  />
                  {/* Subtle bottom gradient on image for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
                  
                  {/* Name overlay on bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-surface-200/90 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-sm sm:text-base tracking-tight">
                          Kartik Joshi
                        </div>
                        <div className="text-[11px] text-cyan-400 font-mono">
                          BCA &bull; COER University, Roorkee
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Badge 1: MERN + LangChain */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-3 sm:-right-5 px-3 py-1.5 rounded-xl bg-surface-100/95 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-white">
                    MERN + LangChain
                  </span>
                </motion.div>

                {/* Floating Micro-Badge 2: Docker & AWS */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-3 -left-3 sm:-left-5 px-3.5 py-1.5 rounded-xl bg-surface-100/95 border border-indigo-500/40 backdrop-blur-md shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-mono font-semibold text-white">
                    Docker &bull; AWS S3
                  </span>
                </motion.div>

                {/* Floating Micro-Badge 3: GSSoC Open Source */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="hidden sm:flex absolute top-1/2 -left-6 transform -translate-y-1/2 px-2.5 py-1 rounded-lg bg-surface-200/95 border border-white/10 backdrop-blur-md shadow-md items-center gap-1.5"
                >
                  <Code2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] font-mono text-slate-300">GSSoC &apos;26</span>
                </motion.div>

              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
