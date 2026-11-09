import React from 'react';
import { 
  ArrowUp, 
  Terminal, 
  Heart,
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo, navLinks } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080e] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Bio (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Full-Stack MERN &amp; AI-focused developer building production-grade digital products with robust REST APIs, modern web frameworks, and clean code architecture.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for internships &amp; software engineering roles</span>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-cyan-400 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Connect (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">
              Social Channels
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Send direct email"
                className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with React, TypeScript &amp; Tailwind CSS.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Haridwar, Uttarakhand, India</span>
            <span>&bull;</span>
            <span className="text-cyan-400">MERN &bull; AI Stack</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
