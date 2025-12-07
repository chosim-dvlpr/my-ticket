import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('event_schedule')
export class EventSchedule {
  @ApiProperty({ description: '스케줄 ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @ApiProperty({ description: '이벤트 ID' })
  @Column({ type: 'bigint' })
  event_id: string

  @ApiProperty({ description: '공연 날짜' })
  @Column({ type: 'date' })
  event_date: string

  @ApiProperty({ description: '회차' })
  @Column({ type: 'int' })
  round_number: number

  @ApiProperty({ description: '취소 마감일' })
  @Column({ type: 'datetime' })
  cancellation_deadline: string
}
