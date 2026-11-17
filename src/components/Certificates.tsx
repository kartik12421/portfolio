import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { certificates } from '../data/portfolioData';
import { CertificateItem } from '../types/portfolio';

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          badge="Certificates"
          title="Certifications"
          subtitle="Coursework and credentials from Microsoft, HP, Udemy and university competitions."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedCert(cert)}
              className="group flex flex-col border border-line bg-bg text-left transition-colors duration-300 hover:border-line-strong"
            >
              <div className="relative overflow-hidden border-b border-line bg-sunken">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 bg-bg/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent backdrop-blur-sm">
                  {cert.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  <span className="truncate">{cert.issuer}</span>
                  <span className="shrink-0 tabular-nums">{cert.date}</span>
                </div>
                <h3 className="mt-2 flex-1 font-display text-base font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
                  {cert.title}
                </h3>
                <span className="mt-4 border-t border-line pt-3 text-[11px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent">
                  View &rarr;
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={selectedCert.title}
              className="relative my-auto w-full max-w-3xl border border-line bg-elev shadow-pop"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {selectedCert.issuer} &mdash; {selectedCert.date}
                  </span>
                  <h4 className="hang mt-1.5 font-display text-xl font-normal tracking-tight text-ink sm:text-2xl">
                    {selectedCert.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="mx-auto max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:px-8">
                <span>Credential on file</span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
