import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingDown, 
  FiAlertCircle, 
  FiActivity, 
  FiDollarSign,
  FiClock,
  FiShield,
  FiZap,
  FiBarChart
} from 'react-icons/fi';

function FeatureSlide({ slide, inView, isFullscreen }) {
  const { title, subtitle, content } = slide;

  const getIcon = (iconName) => {
    const icons = {
      'savings': <FiDollarSign className="w-6 h-6" />,
      'insights': <FiBarChart className="w-6 h-6" />,
      'alerts': <FiAlertCircle className="w-6 h-6" />,
      'energy': <FiZap className="w-6 h-6" />,
      'time': <FiClock className="w-6 h-6" />,
      'shield': <FiShield className="w-6 h-6" />,
      'activity': <FiActivity className="w-6 h-6" />,
      'trending': <FiTrendingDown className="w-6 h-6" />
    };
    return icons[iconName] || <FiActivity className="w-6 h-6" />;
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 ${isFullscreen ? 'flex items-center min-h-screen' : ''}`}>
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
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

        {/* Main Text */}
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

        {/* Features Grid */}
        {content?.features && content.features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-retra-primary to-retra-accent rounded-lg flex items-center justify-center text-white mb-4">
                  {getIcon(feature.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-retra-dark mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-retra-gray-600">
                  {feature.description}
                </p>

                {/* Optional value */}
                {feature.value && (
                  <div className="mt-4 pt-4 border-t border-retra-gray-100">
                    <span className="text-2xl font-bold text-retra-primary">
                      {feature.value}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureSlide;