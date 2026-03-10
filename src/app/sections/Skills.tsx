import { motion } from 'motion/react';
import { useEffect, useState, useRef, RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { ContentCard, Pill, SectionRoundedCorners } from '@/app/components/atoms';

interface SkillsProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function Skills({ containerRef }: SkillsProps) {
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

  const categoryVariants = {
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

  const skillCategories = [
    {
      title: 'Product',
      skills: [
        'Product strategy',
        'User research',
        'Roadmap planning',
        'Stakeholder alignment'
      ]
    },
    {
      title: 'Design',
      skills: [
        'UX & interaction design',
        'Rapid prototyping',
        'Design systems',
        'User flows'
      ]
    },
    {
      title: 'Technical',
      skills: [
        'Product engineering',
        'React',
        'TypeScript',
        'Node.js'
      ]
    }
  ];

  return (
    <SectionRoundedCorners visible={!isStuck} previousSectionBg="bg-white">
      <section
        ref={sectionRef}
        id="skills"
        data-theme="light"
        className="min-h-screen flex items-center justify-center px-6 md:px-20 py-32 bg-gray-50 md:snap-start md:snap-always relative overflow-hidden"
        style={{ borderTopLeftRadius: isStuck ? '0' : '48px', borderTopRightRadius: isStuck ? '0' : '48px' }}
      >
      <motion.div className="max-w-[1280px] w-full relative z-10" style={{ opacity, y }}>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-section-title uppercase tracking-wider text-gray-400 mb-16"
        >
          Skills
        </motion.p>

        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-20 max-w-4xl leading-tight"
        >
          Working across product, design and engineering.
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="relative"
            >
              {/* Visual intersection hint - connecting line for middle item */}
              {index === 1 && (
                <>
                  <div className="hidden md:block absolute top-1/2 -left-8 w-8 h-0.5 bg-gray-300" />
                  <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gray-300" />
                </>
              )}
              
              <motion.div
                className="group"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
              >
                <ContentCard hover>
                  <h3 className="text-3xl md:text-4xl text-gray-900 mb-8 font-medium relative z-10 group-hover:text-black transition-colors duration-300">{category.title}</h3>
                  <div className="flex flex-col gap-3 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + (index * 0.15) + (skillIndex * 0.08),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      >
                        <Pill variant="muted" size="md">{skill}</Pill>
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