import React from 'react';
import { motion } from 'framer-motion';

function StandardSlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content, media } = slide;

  return (
    <div className={`max-w-5xl mx-auto px-4 ${isFullscreen ? 'flex items-center min-h-screen' : ''}`}>
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

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {content && (
            <div className="space-y-6">
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
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-2 h-2 bg-retra-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-retra-gray-700">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* Media */}
              {media && (
                <div className="mt-6">
                  {media.type === 'image' && media.src && (
                    <img
                      src={media.src}
                      alt={media.alt || ''}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  )}
                  
                  {media.type === 'chart' && media.chartType === 'coverage' && (
                    <div className="bg-retra-light/20 rounded-lg p-6">
                      <div className="space-y-4">
                        {media.data?.labels?.map((label, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-retra-gray-700">{label}</span>
                              <span className="text-retra-primary font-bold">
                                {media.data.values[idx]}%
                              </span>
                            </div>
                            <div className="w-full bg-retra-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${media.data.values[idx]}%` } : {}}
                                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                className="bg-gradient-to-r from-retra-secondary to-retra-primary h-2 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default StandardSlide;