import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiMail, FiPhone, FiLinkedin } from 'react-icons/fi';
import { useConfig } from '../context/ConfigContext';

function Footer() {
  const { config } = useConfig();
  const { footer } = config.components;

  if (!footer.enabled) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'web':
        return <FiGlobe className="w-4 h-4" />;
      case 'email':
        return <FiMail className="w-4 h-4" />;
      case 'phone':
        return <FiPhone className="w-4 h-4" />;
      case 'linkedin':
        return <FiLinkedin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-retra-gray-200 shadow-lg"
      style={{ height: footer.height }}
    >
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Copyright Text */}
        <div className="text-sm text-retra-gray-600">
          {footer.text}
        </div>

        {/* Links */}
        {footer.links && footer.links.length > 0 && (
          <div className="flex items-center gap-4">
            {footer.links.map((link, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-retra-gray-600 hover:text-retra-primary transition-colors"
              >
                {getIcon(link.icon)}
                <span className="hidden sm:inline">{link.text}</span>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.footer>
  );
}

export default Footer;