import React, { useState } from 'react';
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
import { ThemeProvider } from './theme';

export const App: React.FC = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-bg font-sans text-ink">
        <Navbar onOpenCV={() => setIsCVModalOpen(true)} />

        <main className="relative">
          <Hero onOpenCV={() => setIsCVModalOpen(true)} />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Certificates />
          <Achievements />
          <Contact />
        </main>

        <Footer />

        <CVModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
