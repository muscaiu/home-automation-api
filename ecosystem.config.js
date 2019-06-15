module.exports = {
  apps : [{
    name: 'home-automation-api',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: true,
  }],
};
