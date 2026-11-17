import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo, experience, projects, skillCategories } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm print:hidden"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Curriculum vitae"
            className="relative my-auto flex w-full max-w-3xl flex-col border border-line bg-elev shadow-pop print:max-h-none print:border-none print:bg-white print:shadow-none"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 print:hidden sm:px-8">
              <span className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                Curriculum vitae &mdash; {personalInfo.name}
              </span>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="hidden items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-ink sm:inline-flex"
                >
                  <Printer className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Print
                </button>

                <a
                  href="/Kartik_Joshi_CV.pdf"
                  download="Kartik_Joshi_CV.pdf"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-[13px] font-medium text-accent-on transition-colors hover:bg-accent-strong"
                >
                  <FileDown className="h-3.5 w-3.5" strokeWidth={2} />
                  PDF
                </a>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Resume sheet */}
            <div className="space-y-8 overflow-y-auto px-5 py-8 sm:px-10 sm:py-10 print:space-y-6 print:p-0">
              {/* Header */}
              <header className="border-b border-line pb-6 print:border-black/30">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h1 className="hang font-display text-4xl font-normal tracking-tight text-ink print:text-black">
                      {personalInfo.name}
                    </h1>
                    <p className="mt-1.5 text-sm text-accent print:text-sky-700">
                      {personalInfo.role}
                    </p>
                  </div>

                  <address className="space-y-1 font-mono text-[11px] not-italic text-muted print:text-gray-700">
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
                      <Mail className="h-3 w-3" strokeWidth={1.75} /> {personalInfo.email}
                    </a>
                    <span className="flex items-center gap-2">
                      <Phone className="h-3 w-3" strokeWidth={1.75} /> {personalInfo.phoneFormatted}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" strokeWidth={1.75} /> {personalInfo.location}
                    </span>
                  </address>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[11px] text-faint print:border-black/20 print:text-gray-600">
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                    <GithubIcon className="h-3 w-3" /> github.com/kartik12421
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                    <LinkedinIcon className="h-3 w-3" /> linkedin.com/in/kartik-joshi-31a509330
                  </a>
                </div>
              </header>

              {/* Education */}
              <section>
                <h2 className="kicker border-b border-line pb-2 print:border-black/30 print:text-sky-700">
                  Education
                </h2>
                <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-ink print:text-black">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="mt-0.5 text-[13px] text-muted print:text-gray-700">
                      COER University, Roorkee &middot; Uttarakhand, India
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-faint print:text-gray-600">Full-time</span>
                </div>
              </section>

              {/* Experience */}
              <section>
                <h2 className="kicker border-b border-line pb-2 print:border-black/30 print:text-sky-700">
                  Experience
                </h2>
                <div className="mt-4 space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-ink print:text-black">{exp.role}</h3>
                          <p className="mt-0.5 text-[13px] text-muted print:text-gray-700">
                            {exp.company} &middot; {exp.location}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-[11px] text-faint print:text-gray-600">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {exp.description.map((bullet, i) => (
                          <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-muted print:text-gray-800">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent print:bg-black" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <h2 className="kicker border-b border-line pb-2 print:border-black/30 print:text-sky-700">
                  Selected projects
                </h2>
                <div className="mt-4 space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-sm font-semibold text-ink print:text-black">{proj.title}</h3>
                        <span className="shrink-0 font-mono text-[11px] text-faint print:text-gray-600">
                          {proj.liveUrl.replace('https://', '')}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted print:text-gray-800">
                        {proj.description}
                      </p>
                      <p className="mt-1.5 font-mono text-[11px] text-faint print:text-gray-600">
                        {proj.techStack.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h2 className="kicker border-b border-line pb-2 print:border-black/30 print:text-sky-700">
                  Technical skills
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {skillCategories.map((cat) => (
                    <div key={cat.title}>
                      <h3 className="text-[13px] font-semibold text-ink print:text-black">{cat.title}</h3>
                      <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted print:text-gray-700">
                        {cat.skills.map((s) => s.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
