import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

function ComparisonSlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content } = slide;

  return (
    <div className={`max-w-6xl mx-auto px-4 ${isFullscreen ? 'flex items-center min-h-screen' : ''}`}>
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
            className="text-center text-lg text-retra-gray-700 mb-8 max-w-3xl mx-auto"
          >
            {content.text}
          </motion.p>
        )}

        {/* Comparison Table */}
        {content?.comparison && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2">
              {/* Headers */}
              {content.comparison.headers?.map((header, idx) => (
                <div
                  key={idx}
                  className={`p-6 font-semibold text-center text-white ${
                    idx === 0 ? 'bg-retra-gray-600' : 'bg-gradient-to-r from-retra-primary to-retra-accent'
                  }`}
                >
                  <h3 className="text-xl">{header}</h3>
                </div>
              ))}

              {/* Rows */}
              {content.comparison.rows?.map((row, rowIdx) => (
                <React.Fragment key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <motion.div
                      key={`${rowIdx}-${cellIdx}`}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + rowIdx * 0.1 }}
                      className={`p-4 border-b border-retra-gray-100 ${
                        cellIdx === 1 ? 'bg-retra-light/20' : 'bg-white'
                      } ${rowIdx % 2 === 1 ? 'bg-opacity-50' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        {cellIdx === 1 && (
                          <FiCheck className="text-retra-primary flex-shrink-0" />
                        )}
                        {cellIdx === 0 && cell.toLowerCase().includes('high') && (
                          <FiX className="text-red-500 flex-shrink-0" />
                        )}
                        <span className={cellIdx === 1 ? 'text-retra-dark font-medium' : 'text-retra-gray-700'}>
                          {cell}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ComparisonSlide;