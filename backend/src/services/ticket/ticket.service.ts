import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTicketDto } from '@dto/ticket/ticket.dto'
import { Ticket } from '@entities/ticket/ticket.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(event_id: string, dto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create({ ...dto, event_id })
    return this.ticketRepository.save(ticket)
  }

  async getTicketsByEvent(event_id: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { event_id },
      relations: ['eventSchedule'],
    })
  }

  async delete(event_id: string, ticket_id: string): Promise<void> {
    const result = await this.ticketRepository.delete({ id: ticket_id, event_id })
    if (result.affected === 0) {
      throw new Error('Ticket not found or does not belong to the event')
    }
  }
}
