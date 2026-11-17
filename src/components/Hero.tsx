import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, MapPin, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onOpenCV: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  return (
    <section id="hero" className="relative px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Status line, sits above the rule like a masthead dateline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-4"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:inline">
            {personalInfo.location}
          </span>
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Portfolio &mdash; {new Date().getFullYear()}
          </span>
        </motion.div>

        <div className="grid gap-12 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          {/* Left: the headline */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="hang text-balance font-display text-[2.75rem] font-normal leading-[1.04] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[4.25rem]"
            >
              I build <span className="italic text-accent">full-stack</span> products and{' '}
              <span className="italic">AI tools</span> that hold up in production.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {personalInfo.subheadline}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                onClick={scrollTo('projects')}
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-on transition-colors hover:bg-accent-strong"
              >
                View work
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>

              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-sunken"
              >
                <FileDown className="h-4 w-4" strokeWidth={2} />
                Download CV
              </button>

              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="group inline-flex items-center gap-1 px-1 py-3 text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Get in touch
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </motion.div>

            {/* Meta strip — plain type, hairline separated */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-12 grid max-w-lg grid-cols-2 gap-y-6 border-t border-line pt-6 sm:grid-cols-3"
            >
              <div>
                <dt className="kicker">Based in</dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-sm text-ink">
                  <MapPin className="h-3.5 w-3.5 text-faint" strokeWidth={1.75} />
                  Haridwar, India
                </dd>
              </div>
              <div>
                <dt className="kicker">Studying</dt>
                <dd className="mt-1.5 text-sm text-ink">BCA, COER University</dd>
              </div>
              <div>
                <dt className="kicker">Focus</dt>
                <dd className="mt-1.5 text-sm text-ink">MERN &amp; AI systems</dd>
              </div>
            </motion.dl>
          </div>

          {/* Right: portrait, set like a plate with a caption */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-5"
          >
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden border border-line bg-sunken">
                <img
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name}, full-stack developer`}
                  className="aspect-[4/5] w-full object-cover object-top grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
                  loading="eager"
                />
                {/* Ink wash at the base so the caption sits on solid tone */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
              </div>

              <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                <span>{personalInfo.name}</span>
                <span>Fig. 01</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* Stack ticker — plain mono line instead of badge pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 lg:mt-24"
        >
          <span className="kicker shrink-0">Stack</span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {personalInfo.heroTechBadges.map((badge) => (
              <li
                key={badge}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                {badge}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
