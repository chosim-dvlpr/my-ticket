import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationRequest } from '@entities/notification-request/notification-request.entity'
import { Ticket } from '@entities/ticket/ticket.entity'
import { NotificationService } from '@src/services/notification/notification.service'
import { NotificationController } from '@src/controllers/notification/notification.controller'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [MailerModule, TypeOrmModule.forFeature([NotificationRequest, Ticket])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
