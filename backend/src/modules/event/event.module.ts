import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventController } from '@src/modules/event/event.controller'
import { EventService } from '@src/modules/event/event.service'
import { Event } from '@src/modules/event/entities/event.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
