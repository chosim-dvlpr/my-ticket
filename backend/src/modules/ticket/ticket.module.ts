import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ticket } from '@entities/ticket/ticket.entity'
import { EventSchedule } from '@entities/event-schedule/event-schedule.entity'
import { TicketController } from '@controllers/ticket/ticket.controller'
import { TicketService } from '@services/ticket/ticket.service'

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, EventSchedule])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
