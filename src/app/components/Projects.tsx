import { motion } from 'motion/react';
import { useState, useRef, useEffect, RefObject } from 'react';
import threadRelayCard from '@/assets/threadrelay-card.svg';
import knowledgeGraphCard from '@/assets/knowledge-graph-explorer-card.svg';

interface ProjectsProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function Projects({ containerRef }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlippedTR, setIsFlippedTR] = useState(false);
  const [isFlippedKG, setIsFlippedKG] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const isScrolling = useRef(false);

  const threadRelayFeatures = [
    'Detects triggers in chat conversations',
    'Creates bug tickets automatically',
    'Routes issues to correct team',
    'Automates triage from discussions'
  ];

  const threadRelayTechStack = ['TypeScript', 'Node.js', 'Linear API', 'Mattermost'];

  const knowledgeGraphFeatures = [
    'Interactive 3D force-directed graph to visualize relationships between entities',
    'Dynamic grouping (user, network, language, location) and filtering synced with content feed',
    'Cluster exploration to identify patterns within data',
    'Graph interaction: zoom, focus, node selection',
    'Configurable display options'
  ];

  const knowledgeGraphTechStack = ['React', 'TypeScript', '3D Force Graph (WebGL)'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isInView) return;
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (isHorizontalScroll && !isScrolling.current) {
        e.preventDefault();
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 5) {
          if (delta > 0 && currentIndex < 1) {
            setCurrentIndex(1);
            isScrolling.current = true;
            setTimeout(() => { isScrolling.current = false; }, 700);
          } else if (delta < 0 && currentIndex > 0) {
            setCurrentIndex(0);
            isScrolling.current = true;
            setTimeout(() => { isScrolling.current = false; }, 700);
          }
        }
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [isInView, currentIndex]);

  const projects = [
    {
      id: 0,
      isFlipped: isFlippedTR,
      setFlipped: setIsFlippedTR,
      front: (
        <>
          <motion.img
            src={threadRelayCard}
            alt="ThreadRelay – Bug report thread and Linear issue view"
            className="w-full h-full object-contain object-top bg-black"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-black">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-2">ThreadRelay</motion.h3>
            <motion.div className="flex gap-3 flex-wrap">
              <span className="text-xs px-3 py-1 bg-white text-black rounded-full font-medium">Automation</span>
              <span className="text-xs px-3 py-1 bg-white text-black rounded-full font-medium">Bot</span>
            </motion.div>
          </div>
        </>
      ),
      back: (
        <div className="h-full flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">ThreadRelay</h3>
            <p className="text-lg md:text-xl text-gray-600 mb-6">Mattermost × Linear Automation Tool</p>
            <p className="text-base text-gray-700 mb-8 leading-relaxed">
              Built a bot connecting Mattermost and Linear to transform team conversations into structured product inputs.
            </p>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Key Features</p>
              <div className="space-y-1.5">
                {threadRelayFeatures.map((f, i) => (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed">• {f}</p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {threadRelayTechStack.map((t, i) => (
                <span key={i} className="text-xs text-white px-3 py-1.5 bg-gray-900 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      isFlipped: isFlippedKG,
      setFlipped: setIsFlippedKG,
      front: (
        <>
          <motion.img
            src={knowledgeGraphCard}
            alt="Knowledge Graph Explorer"
            className="w-full h-full object-contain object-top bg-black"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-black">
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Knowledge Graph Explorer</motion.h3>
            <motion.div className="flex gap-3 flex-wrap">
              <span className="text-xs px-3 py-1 bg-white text-black rounded-full font-medium">Visualization</span>
              <span className="text-xs px-3 py-1 bg-white text-black rounded-full font-medium">React</span>
            </motion.div>
          </div>
        </>
      ),
      back: (
        <div className="h-full flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Knowledge Graph Explorer</h3>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              An interactive interface designed to explore relationships within complex datasets.
            </p>
            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              Built a knowledge graph visualization tool enabling users to analyze connections between pieces of content and entities. The interface combines a content feed with a dynamic graph view, helping users understand how information clusters and spreads across a dataset.
            </p>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Key features</p>
              <div className="space-y-1.5">
                {knowledgeGraphFeatures.map((f, i) => (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed">• {f}</p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech stack</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {knowledgeGraphTechStack.map((t, i) => (
                <span key={i} className="text-xs text-white px-3 py-1.5 bg-gray-900 rounded-full">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic">
              Notes: Screenshots and dataset have been anonymized to remove sensitive information.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-theme="light"
      className="h-screen flex flex-col snap-start snap-always relative overflow-hidden bg-white"
      style={{ borderTopLeftRadius: '48px', borderTopRightRadius: '48px' }}
    >
      {/* Animation en arrière-plan (partout) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-1/3 w-full overflow-hidden">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            className="whitespace-nowrap"
          >
            <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-black/5 inline-block pr-12">
              LAST PROJECTS LAST PROJECTS LAST PROJECTS
            </span>
          </motion.div>
        </div>
        <div className="absolute bottom-1/3 w-full overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            className="whitespace-nowrap"
          >
            <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-black/5 inline-block pr-12">
              LAST PROJECTS LAST PROJECTS LAST PROJECTS
            </span>
          </motion.div>
        </div>
      </div>

      {/* Contenu (coins, titre, carousel, nav) au-dessus : z-index 1 + isolation pour que le carousel reste dans cette couche */}
      <div
        className="absolute inset-0 flex flex-col pointer-events-none"
        style={{ zIndex: 1, isolation: 'isolate' }}
      >
      {/* Rounded corner decoration */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full" />
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full" />
      </div>
        <div className="pointer-events-auto pt-16 pb-6 px-6 md:px-20 flex-shrink-0">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-sm uppercase tracking-wider text-gray-400">Last Projects</p>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Rectangles blancs = même position/forme que les cartes : ils cachent l'animation uniquement sous les cartes */}
            {[0, 1].map((index) => {
              const offset = (index - currentIndex) * 50;
              const isVisible = Math.abs(currentIndex - index) <= 1;
              if (!isVisible) return null;
              return (
                <motion.div
                  key={`mask-${index}`}
                  initial={false}
                  animate={{
                    scale: currentIndex === index ? 1 : 0.9,
                    x: `${offset}%`
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-4xl aspect-[16/10] rounded-3xl bg-white pointer-events-none"
                  style={{ transformOrigin: 'center center', zIndex: 0 }}
                />
              );
            })}
            {projects.map((proj, index) => {
              const distance = Math.abs(currentIndex - index);
              const isActive = currentIndex === index;
              const isVisible = distance <= 1;
              if (!isVisible) return null;

              const offset = (index - currentIndex) * 50;
              let zIndex = 10;
              if (index < currentIndex) zIndex = 5;
              else if (index > currentIndex) zIndex = 5;

            return (
              <motion.div
                key={proj.id}
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? 'blur(0px)' : 'blur(2px)',
                  x: `${offset}%`
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isActive && setCurrentIndex(index)}
                className={`absolute left-1/2 -translate-x-1/2 w-[90%] max-w-4xl pointer-events-auto ${!isActive ? 'cursor-pointer' : ''}`}
                style={{ transformOrigin: 'center center', zIndex }}
              >
                <motion.div
                  style={{ perspective: '2000px' }}
                  className="w-full"
                  onClick={(e) => isActive && e.stopPropagation()}
                >
                  <motion.div
                    animate={{ rotateX: proj.isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative w-full aspect-[16/10] cursor-pointer"
                    onClick={() => isActive && proj.setFlipped((f) => !f)}
                    whileHover={isActive ? { scale: 1.01 } : {}}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-black border-8 border-black"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      {proj.front}
                    </div>
                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white border-8 border-black p-8 md:p-12"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateX(180deg)'
                      }}
                    >
                      {proj.back}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
            {/* Click to flip : juste sous la carte */}
            <p className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 uppercase tracking-wider pointer-events-auto whitespace-nowrap">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Click to flip
              </motion.span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
