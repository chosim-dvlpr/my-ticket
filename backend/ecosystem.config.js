module.exports = {
  apps: [
    {
      name: 'my-ticket', // PM2 프로세스 이름
      script: './dist/main.js',
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        FRONTEND_URL: 'https://www.ticketalarm.site/',
      },
    },
  ],
}
