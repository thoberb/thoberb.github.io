import { motion } from 'motion/react';
import { useEffect, useState, useRef, RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';

interface AboutProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function About({ containerRef }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    container: containerRef
  });

  // Fade out and slide up when scrolling away
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

  const capabilities = [
    'Product strategy',
    'UX & interaction design',
    'Product engineering',
    'Rapid prototyping'
  ];

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
      transition: { duration: 0.6, ease }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const tagVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.35, ease }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      data-theme="light"
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-32 bg-white snap-start snap-always relative overflow-hidden"
      style={{ borderTopLeftRadius: isStuck ? '0' : '48px', borderTopRightRadius: isStuck ? '0' : '48px' }}
    >
      {/* Rounded border decoration - only show when not stuck */}
      {!isStuck && (
        <>
          {/* Left corner - creates outward curve */}
          <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full" />
          </div>
          {/* Right corner - creates outward curve */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full" />
          </div>
        </>
      )}
      
      <motion.div 
        className="max-w-[1280px] w-full relative z-10"
        style={{ opacity, y }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-12">
            What I Do
          </p>
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-12 max-w-4xl leading-tight"
        >
          I turn product ideas into working software.
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl leading-relaxed"
        >
          Working at the intersection of product, design and engineering,
          I prototype ideas quickly and turn complex systems into usable tools.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap gap-4"
        >
          {capabilities.map((capability, index) => (
            <motion.span
              key={index}
              variants={tagVariants}
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#9ca3af',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              transition={{ duration: 0.2 }}
              className="text-base md:text-lg text-gray-700 px-5 py-2 border rounded-full cursor-default"
              style={{ borderColor: '#d1d5db' }}
            >
              {capability}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}