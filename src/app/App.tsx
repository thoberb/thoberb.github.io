import { Navigation } from './components/molecules/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { useRef } from 'react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
        ref={containerRef}
        data-scroll-container
        className="relative min-h-screen md:snap-y md:snap-mandatory overflow-y-auto overflow-x-hidden h-screen w-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
      <Navigation />
      <Hero containerRef={containerRef} />
      <About containerRef={containerRef} />
      <Experience containerRef={containerRef} />
      <Projects containerRef={containerRef} />
      <Skills containerRef={containerRef} />
      <Education containerRef={containerRef} />
      <Contact containerRef={containerRef} />
    </div>
  );
}