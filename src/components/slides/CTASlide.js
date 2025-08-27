import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiCalendar, FiMail, FiPhone } from 'react-icons/fi';

function CTASlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content, actions, background } = slide;

  const handleAction = (action) => {
    if (action.action === 'link' && action.url) {
      window.open(action.url, '_blank');
    } else if (action.action === 'download' && action.url) {
      const link = document.createElement('a');
      link.href = action.url;
      link.download = action.url.split('/').pop();
      link.click();
    }
  };

  return (
    <div 
      className={`relative ${isFullscreen ? 'min-h-screen flex items-center' : 'min-h-[60vh] flex items-center'}`}
      style={background && background.type === 'gradient' ? {
        background: `linear-gradient(135deg, ${background.colors.join(', ')})`
      } : {}}
    >
      <div className="max-w-5xl mx-auto px-4 py-16 text-center w-full">
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12"
        >
          {/* Icon or Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-gradient-to-br from-retra-primary to-retra-accent rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <FiArrowRight className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-retra-primary mb-4"
            >
              {title}
            </motion.h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-retra-secondary mb-8"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Main Text */}
          {content?.text && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg text-retra-gray-700 mb-12 max-w-2xl mx-auto"
            >
              {content.text}
            </motion.p>
          )}

          {/* Action Buttons */}
          {actions && actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {actions.map((action, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(action)}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                    action.type === 'primary'
                      ? 'bg-gradient-to-r from-retra-primary to-retra-accent text-white shadow-lg hover:shadow-xl'
                      : 'bg-white text-retra-primary border-2 border-retra-primary hover:bg-retra-light'
                  }`}
                >
                  {action.action === 'download' && <FiDownload />}
                  {action.text.toLowerCase().includes('calendar') && <FiCalendar />}
                  {action.text.toLowerCase().includes('email') && <FiMail />}
                  {action.text.toLowerCase().includes('phone') && <FiPhone />}
                  {action.text}
                  {!action.text.toLowerCase().includes('download') && <FiArrowRight />}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Additional CTAs or Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-retra-gray-200"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-retra-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available 24/7
              </span>
              <span className="flex items-center gap-2">
                ✓ No Installation Required
              </span>
              <span className="flex items-center gap-2">
                ✓ Start Saving Today
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default CTASlide;