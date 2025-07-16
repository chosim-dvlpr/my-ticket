import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './utils/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const getAllowedOrigins = () => {
    const baseOrigins = ['http://localhost:3000']

    if (process.env.NODE_ENV === 'production') {
      return [...baseOrigins, 'https://my-ticket-frontend.com', 'https://my-ticket-frontend.vercel.app']
    }

    return [...baseOrigins, 'https://my-ticket-frontend-git-*.vercel.app']
  }

  app.enableCors({
    origin: getAllowedOrigins(),
    credentials: true,
  })
  setupSwagger(app)

  await app.listen(8080)
}
bootstrap()
