import React, { useState } from 'react';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';

export const App: React.FC = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Background radial glows & subtle grid */}
      <BackgroundDecorations />

      {/* Sticky Glassmorphic Navigation */}
      <Navbar onOpenCV={() => setIsCVModalOpen(true)} />

      {/* Main Page Content */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenCV={() => setIsCVModalOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certificates />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive CV Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />
    </div>
  );
};

export default App;
