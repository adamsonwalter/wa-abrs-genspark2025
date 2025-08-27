import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSlide from './slides/HeroSlide';
import StandardSlide from './slides/StandardSlide';
import FeatureSlide from './slides/FeatureSlide';
import ComparisonSlide from './slides/ComparisonSlide';
import DemoSlide from './slides/DemoSlide';
import StatsSlide from './slides/StatsSlide';
import CTASlide from './slides/CTASlide';
import { useConfig } from '../context/ConfigContext';

function SlideRenderer({ slide, index, isActive, isFullscreen }) {
  const { config } = useConfig();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Get animation settings
  const getAnimation = () => {
    const animationType = slide.animation || 'fade-in';
    
    switch (animationType) {
      case 'fade-in':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 }
        };
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 50 }
        };
      case 'scale-up':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  // Render slide based on type
  const renderSlideContent = () => {
    const commonProps = {
      slide,
      index,
      isActive,
      inView,
      isFullscreen
    };

    switch (slide.type) {
      case 'hero':
        return <HeroSlide {...commonProps} />;
      case 'standard':
        return <StandardSlide {...commonProps} />;
      case 'feature':
        return <FeatureSlide {...commonProps} />;
      case 'comparison':
        return <ComparisonSlide {...commonProps} />;
      case 'demo':
        return <DemoSlide {...commonProps} />;
      case 'stats':
        return <StatsSlide {...commonProps} />;
      case 'cta':
        return <CTASlide {...commonProps} />;
      default:
        return <StandardSlide {...commonProps} />;
    }
  };

  const animations = getAnimation();
  const slideSpacing = isFullscreen ? 'mb-0' : `mb-${config.layout.slideSpacing || 8}`;

  return (
    <motion.div
      ref={ref}
      className={`relative ${slideSpacing} ${isFullscreen ? 'min-h-screen flex items-center' : 'min-h-[70vh]'}`}
      initial={animations.initial}
      animate={inView ? animations.animate : animations.initial}
      exit={animations.exit}
      transition={{ 
        duration: (config.components.slideTransitions?.duration || 500) / 1000,
        ease: 'easeOut' 
      }}
    >
      {/* Slide background */}
      {slide.background && (
        <div className="absolute inset-0 -z-10">
          {slide.background.type === 'gradient' && (
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${slide.background.colors.join(', ')})`
              }}
            />
          )}
          {slide.background.type === 'image' && (
            <img
              src={slide.background.src}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
          )}
        </div>
      )}

      {/* Slide number indicator */}
      {config.layout.showSlideNumbers && !isFullscreen && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
            <span className="text-sm font-medium text-retra-gray-600">
              {index + 1} / {config.slides.length}
            </span>
          </div>
        </div>
      )}

      {/* Slide content */}
      <div className={`w-full ${isFullscreen ? '' : 'py-12'}`}>
        {renderSlideContent()}
      </div>

      {/* Active indicator */}
      {isActive && !isFullscreen && (
        <motion.div
          className="absolute left-0 top-0 w-1 h-full bg-retra-primary rounded-r"
          layoutId="activeIndicator"
          transition={{ type: 'spring', damping: 20 }}
        />
      )}
    </motion.div>
  );
}

export default SlideRenderer;