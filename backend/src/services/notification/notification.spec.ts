import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from '@nestjs-modules/mailer'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotificationRequest } from '@src/entities/notification-request/notification-request.entity'
import { Ticket } from '@src/entities/ticket/ticket.entity'
import { NotificationService } from './notification.service'

const mockMailerService = {
  sendMail: jest.fn(),
}

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn((dto) => dto),
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
  })

  it('알림 신청 시 DB에 저장해야 한다', async () => {
    // [Given]
    const email = 'test@example.com'
    const ticketId = '1'

    mockRepository.findOne
      .mockResolvedValueOnce({
        id: ticketId,
      })
      .mockResolvedValueOnce(null)

    mockRepository.save.mockResolvedValue({ id: 1, ticketId, email })

    // [When]
    await service.createNotification(ticketId, email)

    // [Then]
    expect(mockRepository.save).toHaveBeenCalled()
  })
})
