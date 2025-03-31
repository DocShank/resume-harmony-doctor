
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoAnimation = () => {
  const [showFirstPart, setShowFirstPart] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstPart(prev => !prev);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-16">
      <AnimatePresence mode="wait">
        {showFirstPart ? (
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
};

export default LogoAnimation;
