import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EventSchedule } from '../../event/entities/event-schedule.entity'

@Entity('ticket')
export class Ticket {
  @ApiProperty({ description: '티켓 ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @ApiProperty({ description: '이벤트 ID' })
  @Column({ type: 'bigint' })
  event_id: string

  @ApiProperty({ description: '이벤트 스케줄 ID' })
  @Column({ type: 'bigint' })
  event_schedule_id: string

  @ApiProperty({ description: '좌석 정보' })
  @Column({ length: 100 })
  seat_label: string

  @ApiProperty({ description: '예매일' })
  @Column({ type: 'date' })
  ticketing_date: string

  @ApiProperty({ description: '알림 신청 여부' })
  @Column({ type: 'boolean' })
  get_notification: boolean

  @ManyToOne(() => EventSchedule)
  @JoinColumn({ name: 'event_schedule_id' })
  eventSchedule: EventSchedule
}
