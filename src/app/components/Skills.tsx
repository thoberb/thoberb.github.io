import { motion } from 'motion/react';
import { useEffect, useState, useRef, RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';

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
        setIsInView(entry.isIntersecting);
        setIsStuck(entry.intersectionRatio > 0.95);
      },
      { threshold: [0, 0.5, 0.95, 1] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
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
    <section 
      ref={sectionRef}
      id="skills" 
      data-theme="light"
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-32 bg-gray-50 snap-start snap-always relative overflow-hidden"
      style={{ borderTopLeftRadius: isStuck ? '0' : '48px', borderTopRightRadius: isStuck ? '0' : '48px' }}
    >
      {/* Rounded border decoration - only show when not stuck */}
      {!isStuck && (
        <>
          {/* Left corner - creates outward curve */}
          <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-50 rounded-full" />
          </div>
          {/* Right corner - creates outward curve */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full" />
          </div>
        </>
      )}
      
      <motion.div className="max-w-[1280px] w-full relative z-10" style={{ opacity, y }}>
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-sm uppercase tracking-wider text-gray-400 mb-16"
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
                className="relative bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 group h-full"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
              >
                {/* Animated gradient glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-2xl border border-gray-900/0 group-hover:border-gray-900/10 transition-all duration-300" />
                
                {/* Category title with increased size */}
                <h3 className="text-3xl md:text-4xl text-gray-900 mb-8 font-medium relative z-10 group-hover:text-black transition-colors duration-300">{category.title}</h3>
                
                {/* Skills pills with increased spacing */}
                <div className="flex flex-col gap-3 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + (index * 0.15) + (skillIndex * 0.08),
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      className="text-base text-gray-700 px-5 py-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 w-fit cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}