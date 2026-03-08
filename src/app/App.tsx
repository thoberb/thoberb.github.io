import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { useRef } from 'react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen snap-y snap-mandatory overflow-y-auto h-screen">
      <Navigation />
      <div className="relative">
        <Hero containerRef={containerRef} />
        <About containerRef={containerRef} />
        <Experience containerRef={containerRef} />
        <Projects containerRef={containerRef} />
        <Skills containerRef={containerRef} />
        <Education containerRef={containerRef} />
        <Contact containerRef={containerRef} />
      </div>
    </div>
  );
}