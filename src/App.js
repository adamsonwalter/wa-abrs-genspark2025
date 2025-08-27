import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useConfig } from './context/ConfigContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import SlideRenderer from './components/SlideRenderer';
import SearchModal from './components/SearchModal';
import AdminPanel from './components/AdminPanel';
import LoadingScreen from './components/LoadingScreen';
import { FiSettings, FiSearch, FiMaximize, FiMinimize } from 'react-icons/fi';

function App() {
  const { config, validationStatus } = useConfig();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);

  // Initialize and perform system check
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Log validation status
    if (!validationStatus.valid) {
      console.warn('Validation warnings:', validationStatus.errors);
    }

    return () => clearTimeout(timer);
  }, [validationStatus]);

  // Navigation functions
  const navigateToSlide = useCallback((index) => {
    if (index >= 0 && index < config.slides.length) {
      setCurrentSlide(index);
      const slideElement = document.getElementById(`slide-${index}`);
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [config.slides.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!config.layout.enableKeyboardNav) return;

    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          navigateToSlide(currentSlide + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          navigateToSlide(currentSlide - 1);
          break;
        case 'Home':
          e.preventDefault();
          navigateToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToSlide(config.slides.length - 1);
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setShowSearch(true);
          }
          break;
        case 'Escape':
          setShowSearch(false);
          setShowAdmin(false);
          if (isFullscreen) toggleFullscreen();
          break;
        case 'F11':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'a':
        case 'A':
          if (e.altKey) {
            e.preventDefault();
            setShowAdmin(!showAdmin);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, config.slides.length, config.layout.enableKeyboardNav, isFullscreen, showAdmin, navigateToSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Filter slides based on tags
  const getVisibleSlides = () => {
    if (filter === 'all') return config.slides;
    return config.slides.filter(slide => 
      slide.tags && slide.tags.includes(filter)
    );
  };

  // Get all unique tags
  const getAllTags = () => {
    const tags = new Set(['all']);
    config.slides.forEach(slide => {
      if (slide.tags) {
        slide.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const visibleSlides = getVisibleSlides();
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-retra-muted via-white to-retra-light">
      {/* Header */}
      {config.components.header.enabled && !isFullscreen && (
        <Header />
      )}

      {/* Control Bar */}
      <div className={`fixed top-4 right-4 z-50 flex gap-2 ${isFullscreen ? 'top-4' : 'top-24'}`}>
        {config.layout.enableSearch && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearch(true)}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            title="Search (Ctrl+F)"
          >
            <FiSearch className="w-5 h-5 text-retra-primary" />
          </motion.button>
        )}
        
        {config.layout.enableFullscreen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            title="Fullscreen (F11)"
          >
            {isFullscreen ? 
              <FiMinimize className="w-5 h-5 text-retra-primary" /> :
              <FiMaximize className="w-5 h-5 text-retra-primary" />
            }
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAdmin(!showAdmin)}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          title="Admin Panel (Alt+A)"
        >
          <FiSettings className="w-5 h-5 text-retra-primary" />
        </motion.button>
      </div>

      {/* Tag Filter */}
      {allTags.length > 1 && !isFullscreen && (
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-sm border-b border-retra-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex gap-2 items-center">
            <span className="text-sm font-medium text-retra-gray-600 mr-2">Filter:</span>
            {allTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === tag
                    ? 'bg-retra-primary text-white shadow-md'
                    : 'bg-retra-gray-100 text-retra-gray-700 hover:bg-retra-gray-200'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main 
        ref={containerRef}
        className={`${isFullscreen ? '' : 'pt-4 pb-20'} px-4`}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="sync">
            {visibleSlides.map((slide, index) => (
              <SlideObserver 
                key={slide.id} 
                index={index}
                onInView={() => setCurrentSlide(index)}
              >
                <SlideRenderer
                  slide={slide}
                  index={index}
                  isActive={currentSlide === index}
                  isFullscreen={isFullscreen}
                />
              </SlideObserver>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      {config.layout.showNavigation && !isFullscreen && (
        <Navigation
          slides={visibleSlides}
          currentSlide={currentSlide}
          onNavigate={navigateToSlide}
        />
      )}

      {/* Footer */}
      {config.components.footer.enabled && !isFullscreen && (
        <Footer />
      )}

      {/* Modals */}
      <AnimatePresence>
        {showSearch && (
          <SearchModal
            slides={config.slides}
            onClose={() => setShowSearch(false)}
            onNavigate={(index) => {
              navigateToSlide(index);
              setShowSearch(false);
            }}
          />
        )}
        
        {showAdmin && (
          <AdminPanel
            isOpen={showAdmin}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Slide observer component for intersection detection
function SlideObserver({ children, index, onInView }) {
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) onInView();
    }
  });

  return (
    <div ref={ref} id={`slide-${index}`} className="scroll-mt-24">
      {children}
    </div>
  );
}

export default App;