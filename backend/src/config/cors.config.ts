const getAllowedOrigins = (): string[] => {
  const origins = ['http://localhost:3000']

  if (process.env.FRONTEND_URL) {
    origins.push(process.env.FRONTEND_URL)
  }

  if (process.env.VERCEL_URL) {
    origins.push(process.env.VERCEL_URL)
  }

  if (process.env.VERCEL_PREVIEW_URL) {
    origins.push(process.env.VERCEL_PREVIEW_URL)
  }

  return [...new Set(origins)].filter((origin) => origin.length > 0)
}

export const corsConfig = {
  origin: getAllowedOrigins(),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'X-Requested-With'],
}
