import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './utils/swagger'
import { corsConfig } from './config/cors.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors(corsConfig)
  setupSwagger(app)

  await app.listen(8080)
}
bootstrap()
