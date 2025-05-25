import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EventService } from '../services/event.service'
import { CreateEventDto } from '../dto/event.dto'
import { Event } from '../entities/event.entity'

@Controller('events')
@ApiTags('events')
export class EventController {
  // private : 클래스 내부에서만 접근 가능하도록 제한
  // readonly : 초기화 후 변경 불가능하도록 선언
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: '이벤트 생성', description: '새로운 이벤트를 생성한다.' })
  @ApiCreatedResponse({ description: '이벤트를 생성한다다.', type: Event })
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.create(createEventDto)
  }

  @Get()
  @ApiOperation({ summary: '모든 이벤트 조회', description: '모든 이벤트를 조회한다.' })
  @ApiOkResponse({ description: '모든 이벤트를 조회한다.', type: [Event] })
  findAll(): Promise<Event[]> {
    return this.eventService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 이벤트 조회', description: '특정 이벤트를 조회한다.' })
  @ApiOkResponse({ description: '특정 이벤트를 조회한다.', type: Event })
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventService.findOne(+id)
  }
}
