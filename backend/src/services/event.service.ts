import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Event } from '../entities/event.entity'
import { CreateEventDto } from '../dto/event.dto'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  // 이벤트 생성 (DTO를 이용해 이벤트 엔티티 생성)
  // 생성된 Event 엔티티를 반환
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto)
    return await this.eventRepository.save(event)
  }

  // 모든 이벤트 조회
  // 모든 Event 엔티티를 배열로 반환
  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find()
  }

  // 특정 ID의 이벤트 조회
  // 주어진 ID에 해당하는 Event 엔티티를 반환 (없으면 예외 발생)
  async findOne(id: number): Promise<Event> {
    return await this.eventRepository.findOneOrFail({ where: { id } })
  }
}
