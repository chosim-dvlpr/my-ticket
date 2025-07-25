import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/swagger'

export class CreateTicketDto {
  @ApiProperty({
    description: '좌석 정보',
    example: '서울 재즈 페스티벌',
  })
  seat_label: string

  @ApiProperty({
    description: '예매일',
    example: '2025-04-28',
  })
  ticketing_date: string

  @ApiProperty({
    description: '알림 신청 여부',
    example: true,
  })
  get_notification: boolean
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
