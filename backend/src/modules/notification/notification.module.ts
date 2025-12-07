import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationRequest } from '@src/modules/notification/entities/notification-request.entity'
import { Ticket } from '@src/modules/ticket/entities/ticket.entity'
import { NotificationService } from '@src/modules/notification/notification.service'
import { NotificationController } from '@src/modules/notification/notification.controller'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [MailerModule, TypeOrmModule.forFeature([NotificationRequest, Ticket])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
