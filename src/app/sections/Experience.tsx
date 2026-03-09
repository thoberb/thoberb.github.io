import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef, useCallback, RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { useSwipe } from '@/app/hooks/useSwipe';
import { Pill, SectionLabel, SectionRoundedCorners } from '@/app/components/atoms';

interface ExperienceProps {
  containerRef: RefObject<HTMLDivElement>;
}

interface ExperienceData {
  title: string;
  company: string;
  description: string;
  year: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  focusAreas: string[];
  isFuture?: boolean;
}

export function Experience({ containerRef }: ExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(6); // Start at current Everdian PM role (index 6)
  const slideDirectionRef = useRef(0); // -1 = from right, 1 = from left (pour animation défilement)
  const isScrolling = useRef(false);

  const setIndex = useCallback((newIndex: number) => {
    slideDirectionRef.current = newIndex - currentIndex;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  // Define experiences data first, before any hooks that reference it
  const experiences: ExperienceData[] = [
    {
      title: 'Software Intern',
      company: 'MedEngine',
      description: 'My first hands-on experience with programming and applied problem solving.',
      year: '2019',
      startDate: 'Jan 2019',
      endDate: 'Jan 2019',
      responsibilities: [
        'First experience writing code for real use cases',
        'Discovered programming through practical experimentation',
        'Early exposure to technology applied to real-world problems'
      ],
      focusAreas: [
        'Python',
        'Problem solving',
        'Tech discovery'
      ]
    },
    {
      title: 'Art Direction Intern',
      company: 'Groupe M6',
      description: 'Worked in a large media environment on visual and creative production.',
      year: '2022',
      startDate: 'Jul 2022',
      endDate: 'Aug 2022',
      responsibilities: [
        'Contributed to visual communication and creative work',
        'Discovered large-scale content production workflows',
        'Strengthened visual storytelling and communication skills'
      ],
      focusAreas: [
        'Art direction',
        'Media production',
        'Visual communication'
      ]
    },
    {
      title: 'Software Engineering Student',
      company: '42 School',
      description: 'Peer-to-peer software engineering program focused on building real systems.',
      year: '2022-24',
      startDate: '2022',
      endDate: '2024',
      responsibilities: [
        'Built software projects in collaborative environments',
        'Strengthened debugging and algorithmic thinking',
        'Developed strong foundations in programming'
      ],
      focusAreas: [
        'Software engineering',
        'Algorithms',
        'Systems thinking'
      ]
    },
    {
      title: 'UI/UX Designer & Project Manager',
      company: 'Junior 42 Paris',
      description: 'Worked at the intersection of design and project delivery within a technical ecosystem.',
      year: '2023',
      startDate: 'May 2023',
      endDate: 'Sep 2024',
      responsibilities: [
        'Designed product interfaces and user flows',
        'Coordinated project delivery across contributors',
        'Balanced design quality with technical constraints'
      ],
      focusAreas: [
        'UX design',
        'Project leadership',
        'Product thinking'
      ]
    },
    {
      title: 'Product Owner Intern',
      company: 'Everdian',
      description: 'Joined an AI-driven intelligence platform working with massive multilingual data streams.',
      year: '2024',
      startDate: 'Sep 2024',
      endDate: 'Feb 2025',
      responsibilities: [
        'Contributed to product development on monitoring tools',
        'Worked closely with engineers on complex workflows',
        'Learned to structure product requirements in data-heavy environments'
      ],
      focusAreas: [
        'AI products',
        'Monitoring tools',
        'Product discovery'
      ]
    },
    {
      title: 'Product Owner',
      company: 'Everdian',
      description: 'Took ownership of product features on an AI intelligence platform.',
      year: '2025',
      startDate: 'Feb 2025',
      endDate: 'Aug 2025',
      responsibilities: [
        'Managed product backlog and feature prioritization',
        'Coordinated closely with engineering teams',
        'Shaped workflows for large-scale data monitoring'
      ],
      focusAreas: [
        'Product ownership',
        'AI systems',
        'Agile delivery'
      ]
    },
    {
      title: 'Product Manager (Design × Engineering)',
      company: 'Everdian',
      description: 'Working at the intersection of product strategy, UX and engineering on AI-powered intelligence tools.',
      year: 'Present',
      startDate: 'Aug 2025',
      endDate: 'Present',
      responsibilities: [
        'Led product direction on complex monitoring and analysis systems',
        'Designed workflows for large-scale multilingual data',
        'Prototyped and validated features directly with engineers'
      ],
      focusAreas: [
        'Product strategy',
        'AI systems',
        'Product engineering'
      ]
    },
    {
      title: 'Your company?',
      company: '',
      description: 'Maybe the next chapter is building something meaningful together.',
      year: 'Future',
      startDate: '',
      endDate: '',
      responsibilities: [
        'I\'m especially interested in teams building ambitious software where product, design and engineering meet.'
      ],
      focusAreas: [
        'Product building',
        'AI tools',
        'Early-stage startups'
      ],
      isFuture: true
    }
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    container: containerRef
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -150]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? false);
        setIsStuck((entry?.intersectionRatio ?? 0) > 0.95);
      },
      { threshold: [0, 0.5, 0.95, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Horizontal scroll handler
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll when section is in view
      if (!isInView) return;

      // Detect horizontal scroll (deltaX) or shift+scroll (deltaY with shift key)
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      
      if (isHorizontalScroll && !isScrolling.current) {
        e.preventDefault();
        
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        
        // Only change if scroll threshold is met
        if (Math.abs(delta) > 5) {
          if (delta > 0 && currentIndex < experiences.length - 1) {
            // Scroll right - go to next card
            setIndex(currentIndex + 1);
            isScrolling.current = true;
            
            // Reset flag after animation completes
            setTimeout(() => {
              isScrolling.current = false;
            }, 700); // Match animation duration
          } else if (delta < 0 && currentIndex > 0) {
            // Scroll left - go to previous card
            setIndex(currentIndex - 1);
            isScrolling.current = true;
            
            // Reset flag after animation completes
            setTimeout(() => {
              isScrolling.current = false;
            }, 700); // Match animation duration
          }
        }
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, [isInView, currentIndex, experiences.length, setIndex]);

  const goNext = useCallback(() => {
    if (currentIndex >= experiences.length - 1) return;
    setIndex(currentIndex + 1);
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 700);
  }, [currentIndex, experiences.length, setIndex]);
  const goPrev = useCallback(() => {
    if (currentIndex <= 0) return;
    setIndex(currentIndex - 1);
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 700);
  }, [currentIndex, setIndex]);
  const swipe = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev, enabled: isInView });

  const ease = [0.22, 1, 0.36, 1] as const;
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.5, ease }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease }
    }
  };

  return (
    <SectionRoundedCorners visible={!isStuck} previousSectionBg="bg-white">
      <section
        ref={sectionRef}
        id="experience"
        data-theme="light"
        className="h-screen flex flex-col bg-gray-50 snap-start snap-always relative overflow-hidden"
        style={{ borderTopLeftRadius: isStuck ? '0' : '48px', borderTopRightRadius: isStuck ? '0' : '48px' }}
      >
      <motion.div
        className="flex flex-1 flex-col min-h-0"
        style={{ opacity, y }}
      >
      {/* Espace fixe ; un peu réduit pour rapprocher titre et carousel */}
      <div className="h-[6rem] flex-shrink-0" aria-hidden />
      <div className="absolute left-0 right-0 top-48 px-6 md:px-20 pointer-events-none">
        <div className="max-w-[1280px] mx-auto">
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="text-section-title uppercase tracking-wider text-gray-400"
          >
            Experience
          </motion.p>
        </div>
      </div>

      {/* Bloc cartes + frise centré verticalement dans la section */}
      <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
        <div className="flex flex-col items-center gap-10">
          {/* Carousel - plus grand en mobile comme Projects; touch swipe sur mobile */}
          <div
            className="w-full min-h-[60vh] md:min-h-0 md:h-[460px] relative flex-shrink-0 flex items-center justify-center touch-pan-y"
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
          <div className="w-full h-full relative flex items-center justify-center">
          {/* Cards container - absolute positioning */}
          <div className="absolute inset-0 flex items-center justify-center">
            {experiences.map((exp, index) => {
              const distance = Math.abs(currentIndex - index);
              const isActive = currentIndex === index;
              const isPrev = currentIndex - 1 === index;
              const isNext = currentIndex + 1 === index;
              const isVisible = distance <= 1;

              if (!isVisible) return null;

              // Calculate position offset
              const offset = (index - currentIndex) * 50; // percentage

              // Z-index logic: active card on top, right cards below, left cards in between
              let zIndex = 10; // active card
              if (index < currentIndex) {
                zIndex = 5; // left cards
              } else if (index > currentIndex) {
                zIndex = 0; // right cards - UNDER the active card
              }

              // Slide-in: quand on change d'index (surtout lointain), la carte active "défile" depuis la direction
                  const dir = slideDirectionRef.current;
                  const slideInOffset = isActive && dir !== 0
                    ? Math.min(Math.abs(dir), 5) * 40 * (dir > 0 ? 1 : -1)
                    : null;

                  return (
                <motion.div
                  key={index}
                  initial={
                    slideInOffset != null
                      ? { scale: 0.95, opacity: 0.6, x: `${slideInOffset}%` }
                      : false
                  }
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                    x: `${offset}%`
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onClick={() => !isActive && setIndex(index)}
                  className={`absolute left-1/2 -translate-x-1/2 w-[90%] max-w-3xl ${
                    !isActive ? 'cursor-pointer' : ''
                  }`}
                  style={{
                    transformOrigin: 'center center',
                    zIndex
                  }}
                >
                  {exp.isFuture ? (
                    // Future card with special design
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-dashed border-gray-300 min-h-[55vh] md:min-h-0 md:h-[420px] flex flex-col items-center justify-center text-center overflow-hidden">
                      <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                        {exp.title}
                      </h2>
                      <p className="text-xl md:text-2xl text-gray-500 mb-6">
                        {exp.description}
                      </p>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-md">
                        {exp.responsibilities[0]}
                      </p>
                    </div>
                  ) : (
                    // Regular experience card - plus haute en mobile, scroll si besoin
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 min-h-[55vh] md:min-h-0 md:h-[420px] overflow-y-auto">
                      <div className="mb-5">
                        <h2 className="text-2xl md:text-3xl text-gray-900 mb-2 leading-tight">
                          {exp.title}
                        </h2>
                        {exp.company && (
                          <p className="text-lg md:text-xl text-gray-600 mb-1">{exp.company}</p>
                        )}
                        {exp.description && (
                          <p className="text-sm text-gray-500">
                            {exp.description}
                          </p>
                        )}
                      </div>

                      {exp.responsibilities.length > 0 && (
                        <div className="mb-5">
                          {exp.responsibilities.map((item, idx) => (
                            <p
                              key={idx}
                              className="text-sm md:text-base text-gray-700 mb-2 leading-relaxed"
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      )}

                      {exp.focusAreas.length > 0 && (
                        <div>
                          <SectionLabel className="mb-2">Focus Areas</SectionLabel>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.focusAreas.map((area, idx) => (
                              <Pill key={idx} variant="outline" size="sm">{area}</Pill>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
          </div>

          {/* Timeline - juste sous les cartes */}
          <div className="px-6 md:px-12 lg:px-24 pb-4 w-full flex-shrink-0">
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" />
          
          {/* Active segment */}
          <motion.div 
            className="absolute top-6 left-0 h-0.5 bg-gray-900"
            initial={false}
            animate={{
              width: `${(currentIndex / (experiences.length - 1)) * 100}%`
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Year markers */}
          <div className="relative flex justify-between">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setIndex(index)}
                className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110"
              >
                <motion.div 
                  className="w-3 h-3 rounded-full mb-6 transition-all"
                  initial={false}
                  animate={{
                    scale: index === currentIndex ? 1.5 : 1,
                    backgroundColor: index === currentIndex ? '#111827' : '#D1D5DB'
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Petit écran : seule la date sélectionnée ; grand écran : toutes les dates */}
                <span
                  className={`text-sm font-medium transition-colors ${
                    index === currentIndex ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                  } ${index !== currentIndex ? 'hidden md:block' : ''}`}
                >
                  {exp.year}
                </span>
              </button>
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>
      </motion.div>
      </section>
    </SectionRoundedCorners>
  );
}