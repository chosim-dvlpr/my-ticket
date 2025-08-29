import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTicketDto } from '@dto/ticket/ticket.dto'
import { Ticket } from '@entities/ticket/ticket.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto)
    return await this.ticketRepository.save(ticket)
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find()
  }

  async findOne(id: string): Promise<Ticket> {
    return await this.ticketRepository.findOneOrFail({ where: { id } })
  }
}
