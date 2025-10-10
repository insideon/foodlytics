module.exports = {
  apps: [
    {
      name: 'foodlytics',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/foodlytics',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 5,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/foodlytics-error.log',
      out_file: '/var/log/pm2/foodlytics-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      kill_timeout: 5000,
      listen_timeout: 10000,
      wait_ready: true,
    },
  ],
}
