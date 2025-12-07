import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cron } from '@nestjs/schedule'
import { MailerService } from '@nestjs-modules/mailer'
import { NotificationRequest } from '@src/modules/notification/entities/notification-request.entity'
import { Ticket } from '@src/modules/ticket/entities/ticket.entity'
import { CreateNotificationDto } from './dto/notification.dto'

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name)

  constructor(
    @InjectRepository(NotificationRequest)
    private notiRepo: Repository<NotificationRequest>,
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
    private readonly mailerService: MailerService,
  ) {}

  async createNotification(dto: CreateNotificationDto) {
    const { ticketId, email } = dto
    // 티켓 존재 확인
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } })
    if (!ticket) throw new NotFoundException('티켓을 찾을 수 없습니다.')

    // 이미 신청했는지 확인 (OneToOne이므로 중복 불가)
    const existing = await this.notiRepo.findOne({ where: { ticket: { id: ticketId } } })
    if (existing) throw new BadRequestException('이미 알림이 설정된 티켓입니다.')

    // 저장
    const newNoti = this.notiRepo.create({
      ticket,
      email,
      notification_sent: false,
    })
    return await this.notiRepo.save(newNoti)
  }

  // 알림 취소 (삭제 - Hard Delete)
  async cancelNotification(ticketId: string) {
    const result = await this.notiRepo.delete({ ticket: { id: ticketId } })
    if (result.affected === 0) {
      throw new NotFoundException('신청된 알림이 없습니다.')
    }
    return { message: '알림이 취소되었습니다.' }
  }

  // 스케줄러: 매일 오전 9시 실행
  @Cron('0 0 9 * * *')
  async sendScheduledEmails() {
    this.logger.log('알림 발송 스케줄러 시작')

    // 조건: 발송 안됨(false) AND 취소 마감일이 '내일'인 것
    const targetNotis = await this.notiRepo
      .createQueryBuilder('noti')
      .leftJoinAndSelect('noti.ticket', 'ticket')
      .leftJoinAndSelect('ticket.eventSchedule', 'schedule')
      .where('noti.notification_sent = :sent', { sent: false })
      .andWhere('DATE(schedule.cancellation_deadline) = CURDATE() + INTERVAL 1 DAY')
      .getMany()

    this.logger.log(`발송 대상: ${targetNotis.length}건`)

    for (const noti of targetNotis) {
      try {
        await this.mailerService.sendMail({
          to: noti.email,
          subject: '[티켓 알림] 취소 가능 기간이 곧 종료됩니다',
          text: `구매하신 티켓의 취소 마감이 하루 남았습니다.`,
        })

        noti.notification_sent = true
        await this.notiRepo.save(noti)
      } catch (error) {
        this.logger.error(`메일 발송 실패 (ID: ${noti.id})`, error.stack)
      }
    }
  }
}
