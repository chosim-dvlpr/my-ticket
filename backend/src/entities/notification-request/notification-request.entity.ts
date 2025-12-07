import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm'
import { Ticket } from '../ticket/ticket.entity'

@Entity('notification_request')
export class NotificationRequest {
  @ApiProperty({ description: '알림 신청 ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @ApiProperty({ description: '티켓 ID' })
  @Column({ type: 'bigint' })
  ticket_id: string

  @ApiProperty({ description: '알림 받을 이메일' })
  @Column({ length: 255 })
  email: string

  @ApiProperty({ description: '알림 발송 여부' })
  @Column({ type: 'boolean', default: false })
  notification_sent: boolean

  @ApiProperty({ description: '알림 신청 시각' })
  @CreateDateColumn() // TypeORM에서 자동으로 시간 주입
  created_at: Date

  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket
}
