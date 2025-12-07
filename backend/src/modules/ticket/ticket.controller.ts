import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateTicketDto } from '@src/modules/ticket/dto/ticket.dto'
import { Ticket } from '@src/modules/ticket/entities/ticket.entity'
import { TicketService } from '@src/modules/ticket/ticket.service'

@Controller('events/:event_id/tickets')
@ApiTags('tickets')
export class TicketController {
  // private : 클래스 내부에서만 접근 가능하도록 제한
  // readonly : 초기화 후 변경 불가능하도록 선언
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ summary: '티켓 생성', description: '새로운 티켓을 생성한다.' })
  @ApiCreatedResponse({ description: '티켓을 생성한다.', type: Ticket })
  create(@Param('event_id') event_id: string, @Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(event_id, createTicketDto)
  }

  @Get()
  getTickets(@Param('event_id') event_id: string) {
    return this.ticketService.getTicketsByEvent(event_id)
  }

  @Delete(':ticket_id')
  deleteTicket(@Param('event_id') event_id: string, @Param('ticket_id') ticket_id: string) {
    return this.ticketService.delete(event_id, ticket_id)
  }
}
