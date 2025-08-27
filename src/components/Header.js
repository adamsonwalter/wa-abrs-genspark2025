import React from 'react';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

function Header() {
  const { config } = useConfig();
  const { header } = config.components;
  const { metadata } = config;

  if (!header.enabled) return null;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${header.sticky ? 'sticky top-0' : ''} z-50 bg-white/90 backdrop-blur-md border-b border-retra-gray-200 shadow-sm`}
      style={{ height: header.height }}
    >
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          {header.showLogo && metadata.logo && (
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={metadata.logo}
              alt={metadata.logoAlt || 'Logo'}
              className="h-12 w-auto object-contain"
            />
          )}
          
          {header.showTitle && (
            <div>
              <h1 className="text-xl font-bold text-retra-primary">
                {metadata.title}
              </h1>
              {metadata.company && (
                <p className="text-sm text-retra-gray-600">{metadata.company}</p>
              )}
            </div>
          )}
        </div>

        {/* Menu */}
        {header.showMenu && (
          <nav className="hidden md:flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#slide-0"
              className="text-retra-gray-700 hover:text-retra-primary transition-colors"
            >
              Home
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://retrageen.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-retra-gray-700 hover:text-retra-primary transition-colors"
            >
              Website
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:info@retrageen.com.au"
              className="text-retra-gray-700 hover:text-retra-primary transition-colors"
            >
              Contact
            </motion.a>
          </nav>
        )}
      </div>
    </motion.header>
  );
}

export default Header;