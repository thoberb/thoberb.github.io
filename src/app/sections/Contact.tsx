import { Linkedin, Mail, FileDown } from 'lucide-react';
import cvPdf from '@/assets/BlandineBerthodCV.pdf';
import { motion } from 'motion/react';
import { useEffect, useState, useRef, RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { LinkCard, SectionRoundedCorners } from '@/app/components/atoms';

interface ContactProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function Contact({ containerRef }: ContactProps) {
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

  const containerVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <SectionRoundedCorners visible={!isStuck} previousSectionBg="bg-white">
      <section
        ref={sectionRef}
        id="contact"
        data-theme="dark"
        className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20 relative md:snap-start md:snap-always overflow-hidden"
        style={{ borderTopLeftRadius: isStuck ? '0' : '48px', borderTopRightRadius: isStuck ? '0' : '48px' }}
      >
      {/* Animated gradient orbs in background */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.05, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl"
        style={{ opacity, y }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-tight mb-16 relative"
        >
          {/* Split text animation for each word */}
          <span className="inline-block">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mr-4"
            >
              Let's
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mr-4"
            >
              build
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block"
            >
              something
            </motion.span>
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block relative mr-4"
          >
            useful
            {/* Subtle underline animation */}
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-1 bg-white"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block"
          >
            together.
          </motion.span>
        </motion.h2>

        {/* Contact Buttons */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-4 md:gap-6"
        >
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LinkCard href="https://linkedin.com/in/blandine-berthod-02379b133" target="_blank">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <Linkedin className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300 relative z-10" />
              <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300 relative z-10 tracking-wide">
                LinkedIn
              </span>
            </LinkCard>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LinkCard href="mailto:blandine.berthod@gmail.com">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <Mail className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300 relative z-10" />
              <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300 relative z-10 tracking-wide">
                Email
              </span>
            </LinkCard>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LinkCard href={cvPdf} download="BlandineBerthodCV.pdf">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <FileDown className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300 relative z-10" />
              <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300 relative z-10 tracking-wide">
                Resume
              </span>
            </LinkCard>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-auto pt-12"
      >
        <p className="text-gray-500 text-sm">© 2026 Blandine Berthod</p>
      </motion.div>
      </section>
    </SectionRoundedCorners>
  );
}