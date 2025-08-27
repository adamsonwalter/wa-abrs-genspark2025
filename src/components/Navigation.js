import React from 'react';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

function Navigation({ slides, currentSlide, onNavigate }) {
  const { config } = useConfig();
  const { navigation } = config.components;

  if (!navigation || !config.layout.showNavigation) return null;

  const navVariants = {
    hidden: { opacity: 0, x: navigation.position === 'right' ? 50 : -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed ${navigation.position === 'right' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-40 ${
        navigation.autoHide ? 'hover:opacity-100 opacity-50' : ''
      } transition-opacity`}
    >
      <div className="flex flex-col gap-3">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            variants={dotVariants}
            className="relative group"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-retra-primary scale-125 shadow-lg'
                  : 'bg-retra-gray-300 hover:bg-retra-secondary'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            />
            
            {/* Tooltip */}
            {navigation.showLabels !== false && (
              <div className={`absolute ${
                navigation.position === 'right' ? 'right-6' : 'left-6'
              } top-1/2 -translate-y-1/2 pointer-events-none`}>
                <div className={`${
                  navigation.position === 'right' ? 'text-right' : 'text-left'
                } opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span className="bg-retra-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {slide.title}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      {config.layout.showProgress && (
        <div className="mt-6 w-1 h-24 bg-retra-gray-200 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="w-full bg-retra-primary rounded-full"
            style={{
              height: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
            layoutId="progress"
            transition={{ type: 'spring', damping: 20 }}
          />
        </div>
      )}
    </motion.nav>
  );
}

export default Navigation;