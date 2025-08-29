import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventController } from '@src/controllers/event/event.controller'
import { EventService } from '@services/event/event.service'
import { Event } from '@src/entities/event/event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
