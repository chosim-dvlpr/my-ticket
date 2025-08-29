const getAllowedOrigins = (): (string | RegExp)[] => {
  const origins: (string | RegExp)[] = ['http://localhost:3000']

  if (process.env.FRONTEND_URL) {
    origins.push(process.env.FRONTEND_URL)
  }

  if (process.env.LOCAL_HOST) {
    origins.push(process.env.LOCAL_HOST)
  }

  if (process.env.VERCEL_ORIGIN_REGEX) {
    try {
      origins.push(new RegExp(process.env.VERCEL_ORIGIN_REGEX))
    } catch (e) {
      console.error('Invalid VERCEL_ORIGIN_REGEX:', process.env.VERCEL_ORIGIN_REGEX)
    }
  }

  return [...new Set(origins)].filter((origin) => origin.toString().length > 0)
}

export const corsConfig = {
  origin: getAllowedOrigins(),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'X-Requested-With'],
}
