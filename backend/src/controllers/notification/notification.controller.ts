import { Controller, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { NotificationService } from '@src/services/notification/notification.service'

@ApiTags('Notification (알림)')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: '티켓 알림 신청' })
  @ApiBody({ schema: { example: { ticketId: '1', email: 'user@example.com' } } })
  async create(@Body() body: { ticketId: string; email: string }) {
    return this.notificationService.createNotification(body.ticketId, body.email)
  }

  @Delete(':ticketId')
  @ApiOperation({ summary: '티켓 알림 취소' })
  async remove(@Param('ticketId') ticketId: string) {
    return this.notificationService.cancelNotification(ticketId)
  }
}
