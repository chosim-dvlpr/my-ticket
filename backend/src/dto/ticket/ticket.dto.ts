import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/swagger'
import { IsString, IsBoolean, IsDateString } from 'class-validator'

export class CreateTicketDto {
  @ApiProperty({
    description: '이벤트 ID',
    example: '1',
  })
  @IsString()
  event_id: string

  @ApiProperty({
    description: '좌석 정보',
    example: 'Floor 1구역 5번',
  })
  @IsString()
  seat_label: string

  @ApiProperty({
    description: '예매일',
    example: '2025-04-28',
  })
  @IsDateString()
  ticketing_date: string

  @ApiProperty({
    description: '알림 신청 여부',
    example: true,
  })
  @IsBoolean()
  get_notification: boolean
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
