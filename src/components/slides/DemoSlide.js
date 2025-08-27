import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMaximize2, FiMinimize2, FiRefreshCw, FiExternalLink } from 'react-icons/fi';

function DemoSlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content, fallback } = slide;
  const [isExpanded, setIsExpanded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [loadError, setLoadError] = useState(false);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
    setLoadError(false);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 ${isFullscreen ? 'flex items-center min-h-screen' : ''}`}>
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold text-retra-primary mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-retra-secondary">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Description */}
        {content?.text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-lg text-retra-gray-700 mb-6 max-w-3xl mx-auto"
          >
            {content.text}
          </motion.p>
        )}

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all ${
            isExpanded ? 'fixed inset-4 z-50' : ''
          }`}
        >
          {/* Controls */}
          <div className="bg-retra-gray-50 border-b border-retra-gray-200 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-retra-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <FiRefreshCw className="w-4 h-4 text-retra-gray-600" />
              </button>
              
              {content?.embedUrl && (
                <a
                  href={content.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-retra-gray-100 rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <FiExternalLink className="w-4 h-4 text-retra-gray-600" />
                </a>
              )}
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-retra-gray-100 rounded-lg transition-colors"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? (
                  <FiMinimize2 className="w-4 h-4 text-retra-gray-600" />
                ) : (
                  <FiMaximize2 className="w-4 h-4 text-retra-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Iframe or Fallback */}
          <div className="relative bg-retra-gray-50" style={{ height: content?.embedHeight || '600px' }}>
            {!loadError && content?.embedUrl ? (
              <iframe
                key={iframeKey}
                src={content.embedUrl}
                title={title || 'Demo'}
                className="w-full h-full border-0"
                allowFullScreen={content?.embedOptions?.allowFullscreen}
                onError={() => setLoadError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                {fallback?.type === 'image' && fallback?.src ? (
                  <img
                    src={fallback.src}
                    alt={fallback.alt || 'Demo preview'}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <p className="text-retra-gray-600 mb-4">
                      {loadError ? 'Failed to load demo' : 'Demo not available'}
                    </p>
                    {content?.embedUrl && (
                      <a
                        href={content.embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-retra-primary hover:text-retra-accent transition-colors"
                      >
                        Open demo in new tab
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DemoSlide;