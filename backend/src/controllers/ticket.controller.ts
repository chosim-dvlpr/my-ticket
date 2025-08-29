import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateTicketDto } from '@dto/ticket.dto'
import { Ticket } from '@entities/ticket.entity'
import { TicketService } from '@services/ticket.service'

@Controller('tickets')
@ApiTags('tickets')
export class TicketController {
  // private : 클래스 내부에서만 접근 가능하도록 제한
  // readonly : 초기화 후 변경 불가능하도록 선언
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ summary: '티켓 생성', description: '새로운 티켓을 생성한다.' })
  @ApiCreatedResponse({ description: '티켓을 생성한다.', type: Ticket })
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto)
  }

  @Get()
  @ApiOperation({ summary: '모든 티켓 조회', description: '모든 티켓을 조회한다.' })
  @ApiOkResponse({ description: '모든 티켓을 조회한다.', type: [Ticket] })
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 티켓 조회', description: '특정 티켓을 조회한다.' })
  @ApiOkResponse({ description: '특정 티켓을 조회한다.', type: Ticket })
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOne(id)
  }
}
