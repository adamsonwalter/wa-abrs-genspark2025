import React from 'react';
import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-retra-light via-white to-retra-muted flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            type: 'spring',
            stiffness: 100
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-retra-primary to-retra-accent rounded-2xl mx-auto flex items-center justify-center">
            <span className="text-white text-4xl font-bold">R</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-retra-primary mb-4"
        >
          Retragreen
        </motion.h1>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-retra-secondary rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* System Check Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-retra-gray-600 mt-6"
        >
          Initializing presentation system...
        </motion.p>
      </div>
    </div>
  );
}

export default LoadingScreen;