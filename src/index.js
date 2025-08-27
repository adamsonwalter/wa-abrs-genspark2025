import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SystemValidator } from './utils/SystemValidator';
import { ConfigProvider } from './context/ConfigContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Run system validation on load
const systemCheck = SystemValidator.runFullCheck();

if (systemCheck.hasErrors) {
  console.error('System validation failed:', systemCheck.errors);
  // Display error UI if critical errors exist
  if (systemCheck.critical) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">System Error</h1>
          <p className="text-gray-700 mb-4">Critical system validation failed. Please check console for details.</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {systemCheck.errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
} else {
  console.log('✅ System validation passed');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Report web vitals
if (process.env.NODE_ENV === 'development') {
  // Optional: Log performance metrics
  const reportWebVitals = (metric) => {
    console.log('Performance:', metric);
  };
  
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}