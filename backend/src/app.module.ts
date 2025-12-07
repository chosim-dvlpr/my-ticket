import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Event } from '@entities/event/event.entity'
import { EventModule } from '@modules/event/event.module'
import { AppController } from '@src/app.controller'
import { AppService } from '@src/app.service'
import { TicketModule } from './modules/ticket/ticket.module'
import { Ticket } from './entities/ticket/ticket.entity'
import { EventSchedule } from './entities/event-schedule/event-schedule.entity'

const modules = [EventModule, TicketModule]
const entities = [Event, Ticket, EventSchedule]

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
