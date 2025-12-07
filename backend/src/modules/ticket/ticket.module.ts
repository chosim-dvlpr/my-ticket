import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ticket } from '@src/modules/ticket/entities/ticket.entity'
import { EventSchedule } from '@src/modules/event/entities/event-schedule.entity'
import { TicketController } from '@src/modules/ticket/ticket.controller'
import { TicketService } from '@src/modules/ticket/ticket.service'

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, EventSchedule])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
