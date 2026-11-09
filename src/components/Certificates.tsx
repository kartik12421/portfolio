import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  Eye, 
  X, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { certificates } from '../data/portfolioData';
import { CertificateItem } from '../types/portfolio';

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Verified Credentials"
          title="Certifications &amp; Accreditations"
          subtitle="Industry certifications from Microsoft, HP, technical hackathons, and foundational computer science curricula."
          accent="violet"
        />

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Image Preview Window */}
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-xs font-semibold text-white">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>View Certificate</span>
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 border border-white/20 text-cyan-300 backdrop-blur-md">
                    {cert.badge}
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-3xl w-full bg-surface-100 border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedCert.title}</h4>
                    <span className="text-xs font-mono text-cyan-400">{selectedCert.issuer} &bull; {selectedCert.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-xl bg-surface-200 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full-view Image */}
              <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/10 max-h-[70vh] flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[68vh] object-contain rounded-xl"
                />
              </div>

              {/* Footer Note */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Credential verified in portfolio records</span>
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-cyan-400 hover:underline"
                >
                  Close view
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
