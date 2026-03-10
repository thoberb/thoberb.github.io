import { motion } from 'motion/react';
import { useEffect, useState, useRef, RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { ContentCard, SectionRoundedCorners } from '@/app/components/atoms';

interface EducationProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function Education({ containerRef }: EducationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

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

  const staggerVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const blockVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4, ease }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease }
    }
  };

  const foundations = [
    {
      title: 'Research',
      institution: 'CRI – Centre de Recherches Interdisciplinaires',
      description: 'Interdisciplinary research environment focused on complex problem solving and systems thinking.',
      themes: [
        'Research methods',
        'Systems thinking',
        'Cross-disciplinary collaboration',
        'Framing complex problems'
      ]
    },
    {
      title: 'Design',
      institution: 'LISAA School of Design',
      description: 'Design education focused on visual communication, UX thinking and creative exploration.',
      themes: [
        'Visual design',
        'UX thinking',
        'Interaction design',
        'Creative experimentation'
      ]
    },
    {
      title: 'Engineering',
      institution: '42 School',
      description: 'Peer-to-peer software engineering program focused on building real systems.',
      themes: [
        'Programming',
        'Software architecture',
        'Team collaboration',
        'Building production tools'
      ]
    }
  ];

  return (
    <SectionRoundedCorners visible={!isStuck} previousSectionBg="bg-gray-50">
      <section
        ref={sectionRef}
        id="education"
        data-theme="light"
        className="min-h-screen flex items-center justify-center px-6 md:px-20 py-32 bg-white md:snap-start md:snap-always relative overflow-hidden"
        style={{ borderTopLeftRadius: isStuck ? '0' : '48px', borderTopRightRadius: isStuck ? '0' : '48px' }}
      >
      <motion.div className="max-w-[1280px] w-full relative z-10" style={{ opacity, y }}>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-section-title uppercase tracking-wider text-gray-400 mb-16"
        >
          Background
        </motion.p>

        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-24 max-w-4xl leading-tight"
        >
          How my multidisciplinary approach to product was built.
        </motion.h2>

        {/* Three foundation blocks */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative items-stretch"
        >
          {/* Convergence hint - connecting lines between blocks */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 -translate-y-1/2" />
          
          {foundations.map((foundation, index) => (
            <motion.div
              key={foundation.title}
              variants={blockVariants}
              className="relative group flex flex-col min-h-0"
            >
              {/* Subtle center convergence glow for middle block */}
              {index === 1 && (
                <div className="absolute -inset-4 bg-gradient-to-br from-gray-200/40 via-transparent to-gray-200/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="flex-1 flex flex-col min-h-0"
              >
                <ContentCard hover flexCol className="min-h-[320px] md:min-h-[380px] h-full">
                  <h3 className="text-4xl md:text-5xl text-gray-900 mb-4 font-medium relative z-10 group-hover:text-black transition-colors duration-300">
                  {foundation.title}
                </h3>
                
                {/* Institution */}
                <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide relative z-10">
                  {foundation.institution}
                </p>
                
                {/* Description */}
                <p className="text-base text-gray-700 leading-relaxed mb-8 relative z-10">
                  {foundation.description}
                </p>
                
                {/* Key themes as minimal list */}
                <div className="mt-auto space-y-2 relative z-10">
                  {foundation.themes.map((theme, themeIndex) => (
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + (index * 0.15) + (themeIndex * 0.08),
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      className="text-sm text-gray-600 pl-4 border-l-2 border-gray-300 hover:border-gray-900 transition-colors duration-200 cursor-default"
                    >
                      {theme}
                    </motion.div>
                  ))}
                </div>
                </ContentCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </section>
    </SectionRoundedCorners>
  );
}