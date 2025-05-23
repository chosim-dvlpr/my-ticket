import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Ticket Management API')
    .setDescription('티켓 관리 서비스 API 문서')
    .setVersion('1.0.0')
    .addTag('events', '이벤트 관련 API')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
}
