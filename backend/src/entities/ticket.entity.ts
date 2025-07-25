import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Event } from './event.entity'

@Entity('ticket')
export class Ticket {
  @ApiProperty({ description: '티켓 ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event

  @ApiProperty({ description: '좌석 정보' })
  @Column({ length: 100 })
  seat_label: string

  @ApiProperty({ description: '예매일' })
  @Column({ type: 'date' })
  ticketing_date: string

  @ApiProperty({ description: '알림 신청 여부' })
  @Column({ type: 'boolean' })
  get_notification: boolean
}
