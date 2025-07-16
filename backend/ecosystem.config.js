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
        VERCEL_URL: 'https://my-ticket-frontend-teal.vercel.app',
        VERCEL_PREVIEW_URL: 'https://my-ticket-frontend-git-*.vercel.app',
      },
    },
  ],
}
