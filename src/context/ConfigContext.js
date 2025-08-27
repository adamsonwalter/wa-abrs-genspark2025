import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultConfig from '../config/presentation.config.json';
import { SystemValidator } from '../utils/SystemValidator';

const ConfigContext = createContext();

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationStatus, setValidationStatus] = useState({ valid: true, errors: [] });

  // Validate configuration on mount and updates
  useEffect(() => {
    const validation = SystemValidator.runFullCheck();
    setValidationStatus({
      valid: !validation.hasErrors,
      errors: validation.errors || []
    });
  }, [config]);

  /**
   * Update configuration with validation
   */
  const updateConfig = (updates) => {
    setIsLoading(true);
    setError(null);

    try {
      // Deep merge updates with existing config
      const newConfig = deepMerge(config, updates);
      
      // Validate new configuration
      const validation = SystemValidator.runFullCheck();
      
      if (!validation.critical) {
        setConfig(newConfig);
        localStorage.setItem('presentation-config', JSON.stringify(newConfig));
        console.log('✅ Configuration updated successfully');
      } else {
        setError('Configuration update failed validation');
        console.error('❌ Configuration validation failed:', validation.errors);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Configuration update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add a new slide with validation
   */
  const addSlide = (slideData) => {
    const validation = SystemValidator.validateSlideUpdate(slideData);
    
    if (!validation.valid) {
      setError(`Cannot add slide: ${validation.errors.join(', ')}`);
      return false;
    }

    const newSlide = {
      id: slideData.id || `slide-${Date.now()}`,
      type: slideData.type || 'standard',
      title: slideData.title || 'New Slide',
      ...slideData
    };

    const newSlides = [...config.slides, newSlide];
    updateConfig({ slides: newSlides });
    return true;
  };

  /**
   * Update existing slide
   */
  const updateSlide = (slideId, updates) => {
    const slideIndex = config.slides.findIndex(s => s.id === slideId);
    
    if (slideIndex === -1) {
      setError(`Slide ${slideId} not found`);
      return false;
    }

    const updatedSlide = { ...config.slides[slideIndex], ...updates };
    const validation = SystemValidator.validateSlideUpdate(updatedSlide);
    
    if (!validation.valid) {
      setError(`Cannot update slide: ${validation.errors.join(', ')}`);
      return false;
    }

    const newSlides = [...config.slides];
    newSlides[slideIndex] = updatedSlide;
    updateConfig({ slides: newSlides });
    return true;
  };

  /**
   * Remove slide
   */
  const removeSlide = (slideId) => {
    const newSlides = config.slides.filter(s => s.id !== slideId);
    
    if (newSlides.length === config.slides.length) {
      setError(`Slide ${slideId} not found`);
      return false;
    }

    updateConfig({ slides: newSlides });
    return true;
  };

  /**
   * Reorder slides
   */
  const reorderSlides = (fromIndex, toIndex) => {
    if (fromIndex < 0 || fromIndex >= config.slides.length ||
        toIndex < 0 || toIndex >= config.slides.length) {
      setError('Invalid slide indices for reordering');
      return false;
    }

    const newSlides = [...config.slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);
    
    updateConfig({ slides: newSlides });
    return true;
  };

  /**
   * Update theme
   */
  const updateTheme = (themeUpdates) => {
    const newTheme = { ...config.theme, ...themeUpdates };
    updateConfig({ theme: newTheme });
  };

  /**
   * Update layout settings
   */
  const updateLayout = (layoutUpdates) => {
    const newLayout = { ...config.layout, ...layoutUpdates };
    updateConfig({ layout: newLayout });
  };

  /**
   * Update footer
   */
  const updateFooter = (footerUpdates) => {
    const newFooter = { 
      ...config.components.footer, 
      ...footerUpdates 
    };
    updateConfig({ 
      components: { 
        ...config.components, 
        footer: newFooter 
      } 
    });
  };

  /**
   * Update header
   */
  const updateHeader = (headerUpdates) => {
    const newHeader = { 
      ...config.components.header, 
      ...headerUpdates 
    };
    updateConfig({ 
      components: { 
        ...config.components, 
        header: newHeader 
      } 
    });
  };

  /**
   * Reset to default configuration
   */
  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem('presentation-config');
    setError(null);
    console.log('🔄 Configuration reset to default');
  };

  /**
   * Export configuration
   */
  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `presentation-config-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  /**
   * Import configuration
   */
  const importConfig = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target.result);
          setConfig(importedConfig);
          localStorage.setItem('presentation-config', JSON.stringify(importedConfig));
          resolve(true);
        } catch (err) {
          setError('Invalid configuration file');
          reject(err);
        }
      };
      
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const value = {
    config,
    isLoading,
    error,
    validationStatus,
    updateConfig,
    addSlide,
    updateSlide,
    removeSlide,
    reorderSlides,
    updateTheme,
    updateLayout,
    updateFooter,
    updateHeader,
    resetConfig,
    exportConfig,
    importConfig
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

/**
 * Deep merge utility
 */
function deepMerge(target, source) {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}