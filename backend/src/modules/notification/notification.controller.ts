import { Controller, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { NotificationService } from '@src/modules/notification/notification.service'
import { CreateNotificationDto } from './dto/notification.dto'

@ApiTags('Notification (알림)')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: '티켓 알림 신청' })
  async create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.createNotification(dto)
  }

  @Delete(':ticketId')
  @ApiOperation({ summary: '티켓 알림 취소' })
  async remove(@Param('ticketId') ticketId: string) {
    return this.notificationService.cancelNotification(ticketId)
  }
}
