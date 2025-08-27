import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingDown, 
  FiClock, 
  FiDollarSign, 
  FiMonitor,
  FiZap,
  FiUsers,
  FiAward,
  FiBarChart2
} from 'react-icons/fi';

function StatsSlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content } = slide;

  const getIcon = (iconName) => {
    const icons = {
      'energy': <FiZap className="w-8 h-8" />,
      'time': <FiClock className="w-8 h-8" />,
      'money': <FiDollarSign className="w-8 h-8" />,
      'monitor': <FiMonitor className="w-8 h-8" />,
      'trending': <FiTrendingDown className="w-8 h-8" />,
      'users': <FiUsers className="w-8 h-8" />,
      'award': <FiAward className="w-8 h-8" />,
      'chart': <FiBarChart2 className="w-8 h-8" />
    };
    return icons[iconName] || <FiBarChart2 className="w-8 h-8" />;
  };

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
            className="text-center text-lg text-retra-gray-700 mb-12 max-w-3xl mx-auto"
          >
            {content.text}
          </motion.p>
        )}

        {/* Stats Grid */}
        {content?.stats && content.stats.length > 0 && (
          <div className={`grid ${
            content.stats.length === 2 ? 'md:grid-cols-2' : 
            content.stats.length === 3 ? 'md:grid-cols-3' : 
            'md:grid-cols-2 lg:grid-cols-4'
          } gap-6`}>
            {content.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + idx * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-retra-primary to-retra-accent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform opacity-10" />
                
                <div className="relative bg-white rounded-2xl shadow-xl p-6 text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-retra-primary to-retra-accent rounded-full text-white mb-4">
                    {getIcon(stat.icon)}
                  </div>

                  {/* Value with animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className="text-3xl lg:text-4xl font-bold text-retra-primary mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <p className="text-retra-gray-600 font-medium">
                    {stat.label}
                  </p>

                  {/* Optional description */}
                  {stat.description && (
                    <p className="text-sm text-retra-gray-500 mt-2">
                      {stat.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional info */}
        {content?.additionalInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-retra-gray-600 italic">
              {content.additionalInfo}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StatsSlide;