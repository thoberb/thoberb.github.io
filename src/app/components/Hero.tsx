import { ChevronDown } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, RefObject } from 'react';

interface HeroProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function Hero({ containerRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    container: containerRef
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="home" data-theme="dark" className="min-h-screen flex items-center px-6 overflow-hidden snap-start snap-always relative" style={{ backgroundColor: '#050505' }}>
      {/* Minimal atmospheric background */}
      <div className="absolute inset-0">
        {/* Soft gradient glows - very subtle and more blurred */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[150px]" />
        
        {/* Extremely subtle grid pattern - almost invisible */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Content - left aligned */}
      <motion.div 
        className="relative z-10 w-full" 
        style={{ 
          opacity, 
          y,
          marginLeft: '8vw',
          maxWidth: '680px'
        }}
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl text-white whitespace-nowrap">
            Hi, I'm Blandine Berthod.
          </h1>
          <div className="text-5xl md:text-7xl text-gray-400 min-h-[1.2em] whitespace-nowrap">
            I'm{' '}
            <TypewriterText
              words={['a product manager', 'a designer', 'an engineer', 'a product builder']}
            />
          </div>
          <p className="text-gray-500 text-lg max-w-md pt-4">
            Designing and building products end-to-end.<br />
            From user problems to shipped solutions.
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator - more spacing */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        aria-label="Scroll to next section"
        style={{ opacity }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: isHovered ? '#ffffff' : '#6b7280', transition: 'border-color 0.3s' }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ backgroundColor: isHovered ? '#ffffff' : '#6b7280', transition: 'background-color 0.3s' }} />
        </div>
      </motion.button>
    </section>
  );
}