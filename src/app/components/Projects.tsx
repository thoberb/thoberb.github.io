import { motion } from 'motion/react';
import { useState, useRef, RefObject } from 'react';
import threadRelayBugReport from '@/assets/threadrelay-bug-report.png';
import threadRelayLinearIssue from '@/assets/threadrelay-linear-issue.png';

interface ProjectsProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function Projects({ containerRef }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const features = [
    'Detects triggers in chat conversations',
    'Creates bug tickets automatically',
    'Routes issues to correct team',
    'Automates triage from discussions'
  ];

  const techStack = ['TypeScript', 'Node.js', 'Linear API', 'Mattermost'];

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      data-theme="light"
      className="min-h-screen flex items-center justify-center px-6 py-32 bg-white snap-start snap-always relative overflow-hidden"
      style={{ borderTopLeftRadius: '48px', borderTopRightRadius: '48px' }}
    >
      {/* Rounded border decoration */}
      <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full" />
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full" />
      </div>

      {/* Animated background text "LAST PROJECT" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* First line */}
        <div className="absolute top-1/3 w-full overflow-hidden">
          <motion.div
            animate={{
              x: ['-50%', '0%']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop'
            }}
            className="whitespace-nowrap"
          >
            <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-black/5 inline-block pr-12">
              LAST PROJECT LAST PROJECT LAST PROJECT
            </span>
          </motion.div>
        </div>
        
        {/* Second line - opposite direction */}
        <div className="absolute bottom-1/3 w-full overflow-hidden">
          <motion.div
            animate={{
              x: ['0%', '-50%']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop'
            }}
            className="whitespace-nowrap"
          >
            <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-black/5 inline-block pr-12">
              LAST PROJECT LAST PROJECT LAST PROJECT
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] px-6 md:px-20 mx-auto">
        {/* Section Title - aligned left */}
        <p className="text-sm uppercase tracking-wider text-gray-400 mb-16">
          Last Solo Project
        </p>

        {/* 3D Flip Card Container */}
        <motion.div 
          style={{ perspective: '2000px' }}
          className="w-full"
        >
          <motion.div
            animate={{ rotateX: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformStyle: 'preserve-3d'
            }}
            className="relative w-full aspect-[16/10] cursor-pointer"
            onClick={handleCardClick}
            whileHover={{ scale: 1.01 }}
          >
            {/* Front of card - Two ThreadRelay screenshots */}
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-black border-8 border-black group"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div className="w-full h-full flex bg-gray-900">
                <motion.img 
                  src={threadRelayBugReport} 
                  alt="ThreadRelay – Bug report in Mattermost (Linear bot)" 
                  className="w-1/2 h-full object-contain object-top"
                />
                <motion.img 
                  src={threadRelayLinearIssue} 
                  alt="ThreadRelay – Bug created in Linear" 
                  className="w-1/2 h-full object-contain"
                />
              </div>
              
              {/* Bottom info overlay on front */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-black">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  ThreadRelay
                </motion.h3>
                <motion.div 
                  className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.span 
                    className="text-xs px-3 py-1 bg-white text-black rounded-full font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    Automation
                  </motion.span>
                  <motion.span 
                    className="text-xs px-3 py-1 bg-white text-black rounded-full font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    Bot
                  </motion.span>
                </motion.div>
              </div>
            </div>

            {/* Back of card - Information */}
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white border-8 border-black p-8 md:p-12"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)'
              }}
            >
              <div className="h-full flex flex-col justify-between overflow-y-auto">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                    Project Details
                  </p>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    ThreadRelay
                  </h3>
                  
                  <p className="text-lg md:text-xl text-gray-600 mb-6">
                    Mattermost × Linear Automation Tool
                  </p>
                  
                  <p className="text-base text-gray-700 mb-8 leading-relaxed">
                    Built a bot connecting Mattermost and Linear to transform team conversations into structured product inputs.
                  </p>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Key Features</p>
                    <div className="space-y-1.5">
                      {features.map((feature, index) => (
                        <motion.p 
                          key={index} 
                          className="text-sm text-gray-700 leading-relaxed"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          • {feature}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="text-xs text-white px-3 py-1.5 bg-gray-900 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isFlipped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Click hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-sm text-gray-500 uppercase tracking-wider"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Click to flip
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}