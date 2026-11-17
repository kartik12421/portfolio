import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ThemeToggle } from './ThemeToggle';
import { navLinks, personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-line bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        {/* Wordmark — plain type, no logo tile */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex shrink-0 items-baseline gap-2 focus:outline-none"
          aria-label="Kartik Joshi — home"
        >
          <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
            {personalInfo.name}
          </span>
          <span className="hidden font-mono text-[11px] text-faint sm:inline">dev</span>
        </a>

        {/* Desktop nav — underline indicator instead of a pill */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative block px-3 py-2 text-[13px] transition-colors ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-ink sm:grid"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-ink sm:grid"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <ThemeToggle />

          <button
            onClick={onOpenCV}
            className="hidden items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-accent-on transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" strokeWidth={2} />
            <span>CV</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:text-ink lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-bg lg:hidden"
          >
            <nav className="px-5 py-4 sm:px-8">
              <ul className="divide-y divide-line">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center justify-between py-3 text-sm transition-colors ${
                          isActive ? 'text-accent' : 'text-muted'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCV();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-on transition-colors hover:bg-accent-strong"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Download CV</span>
                </button>
                <ThemeToggle variant="label" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
