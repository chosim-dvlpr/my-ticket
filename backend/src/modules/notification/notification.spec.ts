import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from '@nestjs-modules/mailer'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { NotificationRequest } from '@src/modules/notification/entities/notification-request.entity'
import { Ticket } from '@src/modules/ticket/entities/ticket.entity'
import { NotificationService } from './notification.service'

const mockMailerService = {
  sendMail: jest.fn(),
}

const mockQueryBuilder = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockResolvedValue([]),
}

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn((dto) => dto),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => mockQueryBuilder), // createQueryBuilder 호출 시 위의 가짜 QueryBuilder 객체 반환
}

describe('NotificationService', () => {
  let service: NotificationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
        {
          provide: getRepositoryToken(NotificationRequest),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<NotificationService>(NotificationService)

    jest.clearAllMocks()
  })

  describe('createNotification', () => {
    const email = 'test@example.com'
    const ticketId = '1'

    it('성공: 알림 신청 시 DB에 저장해야 한다', async () => {
      // Given
      mockRepository.findOne.mockResolvedValueOnce({ id: ticketId }).mockResolvedValueOnce(null)
      mockRepository.save.mockResolvedValue({ id: 1 })

      // When
      await service.createNotification({ ticketId, email })

      // Then
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({ email, notification_sent: false }))
    })

    it('실패: 티켓이 존재하지 않으면 NotFoundException을 던져야 한다', async () => {
      // Given
      mockRepository.findOne.mockResolvedValueOnce(null)

      // When & Then
      await expect(service.createNotification({ ticketId, email })).rejects.toThrow(NotFoundException)
    })

    it('실패: 이미 알림을 신청했다면 BadRequestException을 던져야 한다', async () => {
      // Given
      mockRepository.findOne.mockResolvedValueOnce({ id: ticketId }).mockResolvedValueOnce({ id: 1, email })

      // When & Then
      await expect(service.createNotification({ ticketId, email })).rejects.toThrow(BadRequestException)
    })
  })

  describe('cancelNotification', () => {
    const ticketId = '1'

    it('성공: 알림 취소(삭제)에 성공해야 한다', async () => {
      // Given
      mockRepository.delete.mockResolvedValue({ affected: 1 })

      // When
      const result = await service.cancelNotification(ticketId)

      // Then
      expect(mockRepository.delete).toHaveBeenCalledWith({ ticket: { id: ticketId } })
      expect(result).toEqual({ message: '알림이 취소되었습니다.' })
    })

    it('실패: 삭제할 알림이 없으면 NotFoundException을 던져야 한다', async () => {
      // Given
      mockRepository.delete.mockResolvedValue({ affected: 0 })

      // When & Then
      await expect(service.cancelNotification(ticketId)).rejects.toThrow(NotFoundException)
    })
  })

  describe('sendScheduledEmails', () => {
    it('성공: 대상자들에게 메일을 보내고 notification_sent를 true로 변경해야 한다', async () => {
      // Given
      const targets = [
        { id: 1, email: 'user1@test.com', notification_sent: false },
        { id: 2, email: 'user2@test.com', notification_sent: false },
      ]
      mockQueryBuilder.getMany.mockResolvedValue(targets)

      // When
      await service.sendScheduledEmails()

      // Then
      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('noti')
      expect(mockMailerService.sendMail).toHaveBeenCalledTimes(2)
      expect(mockRepository.save).toHaveBeenCalledTimes(2)
      expect(targets[0].notification_sent).toBe(true)
      expect(targets[1].notification_sent).toBe(true)
    })

    it('부분 실패: 메일 발송 중 에러가 나도 다음 사람에게는 메일을 보내야 한다', async () => {
      // Given
      const targets = [
        { id: 1, email: 'fail@test.com' },
        { id: 2, email: 'success@test.com' },
      ]
      mockQueryBuilder.getMany.mockResolvedValue(targets)

      // 첫 번째 메일은 에러, 두 번째는 성공하도록 설정
      mockMailerService.sendMail.mockRejectedValueOnce(new Error('SMTP Error')).mockResolvedValueOnce('Success')

      // When
      await service.sendScheduledEmails()

      // Then
      expect(mockMailerService.sendMail).toHaveBeenCalledTimes(2) // 시도는 2번 다 했음

      // 저장은 성공한 2번 유저만 되어야 함 (총 1번 호출)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({ email: 'success@test.com' }))
    })

    it('대상 없음: 발송 대상이 없으면 아무 일도 일어나지 않아야 한다', async () => {
      // Given
      mockQueryBuilder.getMany.mockResolvedValue([])

      // When
      await service.sendScheduledEmails()

      // Then
      expect(mockMailerService.sendMail).not.toHaveBeenCalled()
      expect(mockRepository.save).not.toHaveBeenCalled()
    })
  })
})
