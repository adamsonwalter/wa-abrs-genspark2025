import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiPlus, FiTrash2, FiEdit2, FiSave, 
  FiUpload, FiDownload, FiRefreshCw, FiSettings,
  FiImage, FiType, FiLayout, FiDroplet
} from 'react-icons/fi';
import { useConfig } from '../context/ConfigContext';

function AdminPanel({ isOpen, onClose }) {
  const {
    config,
    addSlide,
    updateSlide,
    removeSlide,
    updateTheme,
    updateLayout,
    updateFooter,
    exportConfig,
    importConfig,
    resetConfig
  } = useConfig();

  const [activeTab, setActiveTab] = useState('slides');
  const [editingSlide, setEditingSlide] = useState(null);
  const [newSlideData, setNewSlideData] = useState({
    title: '',
    subtitle: '',
    content: { text: '' },
    type: 'standard'
  });

  const handleAddSlide = () => {
    const success = addSlide({
      ...newSlideData,
      id: `slide-${Date.now()}`,
      tags: ['custom'],
      animation: 'fade-in'
    });
    
    if (success) {
      setNewSlideData({
        title: '',
        subtitle: '',
        content: { text: '' },
        type: 'standard'
      });
    }
  };

  const handleUpdateSlide = (slideId, updates) => {
    updateSlide(slideId, updates);
    setEditingSlide(null);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importConfig(file).then(() => {
        alert('Configuration imported successfully!');
      }).catch(() => {
        alert('Failed to import configuration');
      });
    }
  };

  const tabs = [
    { id: 'slides', label: 'Slides', icon: <FiLayout /> },
    { id: 'theme', label: 'Theme', icon: <FiDroplet /> },
    { id: 'layout', label: 'Layout', icon: <FiSettings /> },
    { id: 'export', label: 'Export/Import', icon: <FiDownload /> }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, x: 100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0.9, opacity: 0, x: 100 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-retra-primary to-retra-accent text-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-retra-primary'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Slides Tab */}
            {activeTab === 'slides' && (
              <div className="space-y-6">
                {/* Add New Slide */}
                <div className="bg-retra-light/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-retra-primary mb-4">Add New Slide</h3>
                  <div className="grid gap-4">
                    <input
                      type="text"
                      placeholder="Slide Title"
                      value={newSlideData.title}
                      onChange={(e) => setNewSlideData({...newSlideData, title: e.target.value})}
                      className="px-4 py-2 border border-retra-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retra-primary"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle (optional)"
                      value={newSlideData.subtitle}
                      onChange={(e) => setNewSlideData({...newSlideData, subtitle: e.target.value})}
                      className="px-4 py-2 border border-retra-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retra-primary"
                    />
                    <textarea
                      placeholder="Content text"
                      value={newSlideData.content.text}
                      onChange={(e) => setNewSlideData({...newSlideData, content: { text: e.target.value }})}
                      rows="3"
                      className="px-4 py-2 border border-retra-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retra-primary"
                    />
                    <select
                      value={newSlideData.type}
                      onChange={(e) => setNewSlideData({...newSlideData, type: e.target.value})}
                      className="px-4 py-2 border border-retra-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-retra-primary"
                    >
                      <option value="standard">Standard</option>
                      <option value="hero">Hero</option>
                      <option value="feature">Feature</option>
                      <option value="comparison">Comparison</option>
                      <option value="demo">Demo</option>
                      <option value="stats">Stats</option>
                      <option value="cta">Call to Action</option>
                    </select>
                    <button
                      onClick={handleAddSlide}
                      className="bg-retra-primary text-white px-4 py-2 rounded-lg hover:bg-retra-accent transition-colors flex items-center justify-center gap-2"
                    >
                      <FiPlus /> Add Slide
                    </button>
                  </div>
                </div>

                {/* Existing Slides */}
                <div>
                  <h3 className="text-lg font-semibold text-retra-primary mb-4">Existing Slides</h3>
                  <div className="space-y-2">
                    {config.slides.map((slide) => (
                      <div key={slide.id} className="bg-white border border-retra-gray-200 rounded-lg p-4">
                        {editingSlide === slide.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
                              className="w-full px-3 py-2 border border-retra-gray-300 rounded"
                            />
                            <button
                              onClick={() => setEditingSlide(null)}
                              className="bg-retra-primary text-white px-4 py-2 rounded hover:bg-retra-accent"
                            >
                              <FiSave className="inline mr-1" /> Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-retra-dark">{slide.title}</h4>
                              <p className="text-sm text-retra-gray-600">{slide.type} • {slide.tags?.join(', ')}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingSlide(slide.id)}
                                className="p-2 hover:bg-retra-gray-100 rounded"
                              >
                                <FiEdit2 className="w-4 h-4 text-retra-gray-600" />
                              </button>
                              <button
                                onClick={() => removeSlide(slide.id)}
                                className="p-2 hover:bg-red-50 rounded"
                              >
                                <FiTrash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-retra-primary mb-4">Theme Settings</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-retra-gray-700 mb-2">Primary Color</label>
                    <input
                      type="color"
                      value={config.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-retra-gray-700 mb-2">Secondary Color</label>
                    <input
                      type="color"
                      value={config.theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-retra-gray-700 mb-2">Accent Color</label>
                    <input
                      type="color"
                      value={config.theme.accentColor}
                      onChange={(e) => updateTheme({ accentColor: e.target.value })}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-retra-primary mb-4">Layout Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.layout.showNavigation}
                      onChange={(e) => updateLayout({ showNavigation: e.target.checked })}
                      className="w-4 h-4 text-retra-primary"
                    />
                    <span>Show Navigation</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.layout.showProgress}
                      onChange={(e) => updateLayout({ showProgress: e.target.checked })}
                      className="w-4 h-4 text-retra-primary"
                    />
                    <span>Show Progress Indicator</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.layout.showSlideNumbers}
                      onChange={(e) => updateLayout({ showSlideNumbers: e.target.checked })}
                      className="w-4 h-4 text-retra-primary"
                    />
                    <span>Show Slide Numbers</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium text-retra-gray-700 mb-2">Footer Text</label>
                    <input
                      type="text"
                      value={config.components.footer.text}
                      onChange={(e) => updateFooter({ text: e.target.value })}
                      className="w-full px-4 py-2 border border-retra-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Export/Import Tab */}
            {activeTab === 'export' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-retra-primary mb-4">Configuration Management</h3>
                <div className="grid gap-4">
                  <button
                    onClick={exportConfig}
                    className="bg-retra-primary text-white px-4 py-3 rounded-lg hover:bg-retra-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <FiDownload /> Export Configuration
                  </button>
                  
                  <label className="bg-retra-secondary text-white px-4 py-3 rounded-lg hover:bg-retra-primary transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <FiUpload /> Import Configuration
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset to default configuration?')) {
                        resetConfig();
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiRefreshCw /> Reset to Default
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AdminPanel;