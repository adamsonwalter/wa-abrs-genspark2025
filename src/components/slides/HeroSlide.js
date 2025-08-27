import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';

function HeroSlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content, media, actions } = slide;

  return (
    <div className={`max-w-7xl mx-auto px-4 ${isFullscreen ? 'py-16' : ''}`}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          {title && (
            <h1 className="text-4xl lg:text-5xl font-bold text-retra-primary mb-4">
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-xl lg:text-2xl text-retra-secondary mb-6">
              {subtitle}
            </h2>
          )}

          {/* Content */}
          {content && (
            <div className="space-y-4 mb-8">
              {content.text && (
                <p className="text-lg text-retra-gray-700 leading-relaxed">
                  {content.text}
                </p>
              )}
              
              {content.bullets && content.bullets.length > 0 && (
                <ul className="space-y-3">
                  {content.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-2 h-2 bg-retra-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-retra-gray-700">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {actions.map((action, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (action.action === 'link' && action.url) {
                      window.open(action.url, '_blank');
                    } else if (action.action === 'next-slide') {
                      document.getElementById('slide-1')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    action.type === 'primary'
                      ? 'bg-retra-primary text-white hover:bg-retra-accent shadow-lg hover:shadow-xl'
                      : 'bg-white text-retra-primary border-2 border-retra-primary hover:bg-retra-light'
                  }`}
                >
                  {action.text}
                  {action.action === 'link' ? <FiExternalLink /> : <FiArrowRight />}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Media */}
        {media && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {media.type === 'image' && media.src && (
              <div className="relative">
                <div className="absolute inset-0 bg-retra-primary/10 rounded-2xl transform rotate-3" />
                <img
                  src={media.src}
                  alt={media.alt || title}
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  onLoad={() => console.log(`Image loaded successfully: ${media.src}`)}
                  onError={(e) => {
                    console.error(`Failed to load image: ${media.src}`, e);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            {media.type === 'video' && media.src && (
              <video
                src={media.src}
                controls
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default HeroSlide;