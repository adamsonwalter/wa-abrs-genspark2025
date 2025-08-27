import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';

function SearchModal({ slides, onClose, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = slides.filter((slide, index) => {
      const titleMatch = slide.title?.toLowerCase().includes(query);
      const subtitleMatch = slide.subtitle?.toLowerCase().includes(query);
      const contentMatch = slide.content?.text?.toLowerCase().includes(query);
      const bulletsMatch = slide.content?.bullets?.some(b => 
        b.toLowerCase().includes(query)
      );
      const tagsMatch = slide.tags?.some(t => 
        t.toLowerCase().includes(query)
      );
      
      return titleMatch || subtitleMatch || contentMatch || bulletsMatch || tagsMatch;
    }).map((slide, index) => ({
      ...slide,
      originalIndex: slides.findIndex(s => s.id === slide.id)
    }));

    setResults(filtered);
  }, [searchQuery, slides]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-retra-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-retra-primary">Search Slides</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-retra-gray-100 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-retra-gray-600" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-retra-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by title, content, or tags..."
              className="w-full pl-10 pr-4 py-3 bg-retra-gray-50 border border-retra-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-retra-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
          {searchQuery && results.length === 0 ? (
            <div className="p-8 text-center text-retra-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              <AnimatePresence>
                {results.map((slide) => (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-retra-gray-50 hover:bg-retra-light rounded-lg cursor-pointer transition-colors group"
                    onClick={() => onNavigate(slide.originalIndex)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-retra-primary mb-1">
                          {slide.title}
                        </h3>
                        {slide.subtitle && (
                          <p className="text-sm text-retra-gray-600 mb-2">
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.tags && slide.tags.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {slide.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-white rounded-full text-retra-secondary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <FiArrowRight className="text-retra-gray-400 group-hover:text-retra-primary transition-colors mt-1" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-8 text-center text-retra-gray-400">
              <FiSearch className="w-12 h-12 mx-auto mb-4 text-retra-gray-300" />
              <p>Start typing to search slides</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-retra-gray-200 bg-retra-gray-50">
          <div className="flex items-center justify-between text-sm text-retra-gray-600">
            <span>
              {results.length > 0 && `${results.length} result${results.length !== 1 ? 's' : ''} found`}
            </span>
            <span>Press ESC to close</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SearchModal;