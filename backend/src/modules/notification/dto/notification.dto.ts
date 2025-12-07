import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateNotificationDto {
  @ApiProperty({ description: '티켓 ID', example: '1' })
  @IsString()
  @IsNotEmpty()
  ticketId: string

  @ApiProperty({ description: '알림 받을 이메일', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string
}
