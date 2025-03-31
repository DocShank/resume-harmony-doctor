
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LogoAnimationProps = {
  simplified?: boolean;
};

const LogoAnimation = ({ simplified = false }: LogoAnimationProps) => {
  const [animationState, setAnimationState] = useState<number>(0);

  useEffect(() => {
    if (simplified) {
      // For simplified version, just toggle between two states
      const interval = setInterval(() => {
        setAnimationState(prev => prev === 0 ? 1 : 0);
      }, 1500);
      
      return () => clearInterval(interval);
    } else {
      // For full animation sequence
      const timeouts = [
        setTimeout(() => setAnimationState(1), 2000), // Highlight SHA SHA
        setTimeout(() => setAnimationState(2), 3000), // Merge to SHA
        setTimeout(() => setAnimationState(3), 4000), // Add NK
        setTimeout(() => setAnimationState(4), 5000), // Final state
      ];
      
      return () => timeouts.forEach(timeout => clearTimeout(timeout));
    }
  }, [simplified]);

  // Simplified version (for header)
  if (simplified) {
    return (
      <div className="flex items-center justify-center h-16">
        <AnimatePresence mode="wait">
          {animationState === 0 ? (
            <motion.div 
              key="sha-sha"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="font-montserrat font-bold text-3xl"
            >
              <span className="text-doctor-blue">SHA</span> <span className="text-doctor-blue">SHA</span>
            </motion.div>
          ) : (
            <motion.div 
              key="shank"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="font-montserrat font-bold text-3xl"
            >
              <span className="text-doctor-blue">SHA</span><span className="text-white">NK</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full detailed animation sequence
  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {animationState === 0 && (
          <motion.div
            key="full-name" 
            className="text-4xl font-montserrat font-bold"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Medsume by <span className="text-gray-800">Shashank</span>
          </motion.div>
        )}
        
        {animationState === 1 && (
          <motion.div
            key="highlight-sha" 
            className="text-4xl font-montserrat font-bold"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Medsume by <span className="text-gray-800">
              <span className="text-teal-500 font-bold">SHA</span>
              shan
              <span className="text-teal-500 font-bold">SHA</span>
              nk
            </span>
          </motion.div>
        )}
        
        {animationState === 2 && (
          <motion.div
            key="merged-sha" 
            className="text-4xl font-montserrat font-bold"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Medsume by <span className="text-teal-500 font-bold">SHA</span>
          </motion.div>
        )}
        
        {animationState === 3 && (
          <motion.div
            key="add-nk" 
            className="text-4xl font-montserrat font-bold"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Medsume by <span className="text-teal-500 font-bold">SHANK</span>
          </motion.div>
        )}
        
        {animationState === 4 && (
          <motion.div
            key="final-state"
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl font-montserrat font-bold">
              Medsume by <span className="text-gray-800">Shank</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl font-montserrat text-gray-600 mt-2"
            >
              AI Resume Builder
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogoAnimation;
