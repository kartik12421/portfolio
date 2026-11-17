import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ThemeToggle } from './ThemeToggle';
import { personalInfo, navLinks } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-line bg-sunken px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Sign-off */}
          <div className="md:col-span-5">
            <p className="hang font-display text-2xl font-normal leading-snug tracking-tight text-ink">
              Thanks for scrolling this far.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Built with React, TypeScript and Tailwind. Designed and written by{' '}
              {personalInfo.name}.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Open to internships &amp; roles
            </div>
          </div>

          {/* Index */}
          <nav className="md:col-span-4">
            <span className="kicker">Index</span>
            <ul className="mt-4 grid grid-cols-2 gap-x-4">
              {navLinks.map((link, i) => (
                <li key={link.label} className="border-b border-line">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-baseline gap-3 py-2.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-[10px] tabular-nums text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="md:col-span-3">
            <span className="kicker">Elsewhere</span>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  Email
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <ThemeToggle variant="label" />
            </div>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </span>
          <span className="flex items-center gap-4">
            <span>Haridwar, India</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <ArrowUp className="h-3 w-3" strokeWidth={2} />
              Top
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
};
