module.exports = {
  apps: [{
    name: 'retragreen-presentation',
    script: './server.js',
    instances: 1,
    exec_mode: 'fork',  // Changed from default cluster to fork
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};