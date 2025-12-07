import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Event } from '@entities/event/event.entity'
import { EventModule } from '@modules/event/event.module'
import { AppController } from '@src/app.controller'
import { AppService } from '@src/app.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ScheduleModule } from '@nestjs/schedule'
import { TicketModule } from './modules/ticket/ticket.module'
import { Ticket } from './entities/ticket/ticket.entity'
import { EventSchedule } from './entities/event-schedule/event-schedule.entity'
import { NotificationRequest } from './entities/notification-request/notification-request.entity'
import { NotificationModule } from './modules/notification/notification.module'

const modules = [EventModule, TicketModule, NotificationModule]
const entities = [Event, Ticket, EventSchedule, NotificationRequest]

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [...entities],
        synchronize: true,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: parseInt(configService.get('EMAIL_PORT'), 10),
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_APP_PASSWORD'),
          },
        },
        defaults: {
          from: `"티켓 알림" <${configService.get('EMAIL_USER_DISPLAY')}>`,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
