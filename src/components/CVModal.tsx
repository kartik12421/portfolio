import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FileDown, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo, experience, projects, skillCategories, certificates } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md print:hidden"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c101d] text-slate-100 border border-white/20 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden print:max-h-none print:border-none print:bg-white print:text-black print:rounded-none"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-4 sm:px-8 border-b border-white/10 bg-surface-100/90 print:hidden">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                  Curriculum Vitae Preview &bull; Kartik Joshi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-surface-200 hover:bg-surface-50 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Print / Save PDF</span>
                </button>

                <a
                  href="/Kartik_Joshi_CV.pdf"
                  download="Kartik_Joshi_CV.pdf"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Direct Download</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resume Sheet Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans print:p-0 print:space-y-6">
              
              {/* Resume Header */}
              <div className="border-b border-white/10 pb-6 print:border-black/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight print:text-black">
                      {personalInfo.name}
                    </h1>
                    <p className="text-sm font-semibold text-cyan-400 print:text-blue-700 mt-1">
                      {personalInfo.role}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-300 print:text-gray-700 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-indigo-400 print:text-black" />
                      <span>{personalInfo.phoneFormatted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-violet-400 print:text-black" />
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 print:border-black/10 text-xs font-mono text-slate-400 print:text-gray-600">
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    <GithubIcon className="w-3 h-3" /> github.com/kartik12421
                  </a>
                  <span>&bull;</span>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    <LinkedinIcon className="w-3 h-3" /> linkedin.com/in/kartik-joshi-31a509330
                  </a>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-blue-700 font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </h2>
                <div className="p-4 rounded-xl bg-surface-100/60 border border-white/5 print:bg-gray-50 print:border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-white print:text-black text-sm">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <span className="text-xs font-mono text-cyan-300 print:text-blue-600 font-bold">
                      Full-Time
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 print:text-gray-700">
                    COER University, Roorkee &bull; Uttarakhand, India
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-blue-700 font-bold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Work Experience</span>
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-surface-100/60 border border-white/5 print:bg-gray-50 print:border-gray-200 mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <h3 className="font-bold text-white print:text-black text-sm">{exp.role}</h3>
                        <div className="text-xs text-cyan-400 print:text-blue-600 font-semibold">{exp.company} &bull; {exp.location}</div>
                      </div>
                      <span className="text-xs font-mono text-slate-400 print:text-gray-600">{exp.period}</span>
                    </div>
                    <ul className="space-y-1.5 mt-2">
                      {exp.description.map((bullet, i) => (
                        <li key={i} className="text-xs text-slate-300 print:text-gray-800 flex items-start gap-2">
                          <span className="text-cyan-400 print:text-black">&bull;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Major Projects */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-blue-700 font-bold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>Featured Production Projects</span>
                </h2>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-surface-100/60 border border-white/5 print:bg-gray-50 print:border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white print:text-black text-sm">{proj.title}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 print:text-blue-700 border border-cyan-500/20">
                            {proj.tagline}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-slate-400 print:text-gray-600">
                          {proj.liveUrl.replace('https://', '')}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 print:text-gray-800 mb-2">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200 print:bg-gray-200 text-slate-300 print:text-black">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills Overview */}
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 print:text-blue-700 font-bold mb-3">
                  Technical Skills &amp; Tools
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {skillCategories.map((cat) => (
                    <div key={cat.title} className="p-3 rounded-lg bg-surface-100/40 border border-white/5 print:bg-gray-50 print:border-gray-200">
                      <span className="font-bold text-white print:text-black block mb-1">{cat.title}:</span>
                      <span className="text-slate-300 print:text-gray-800 font-mono text-[11px]">
                        {cat.skills.map((s) => s.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
