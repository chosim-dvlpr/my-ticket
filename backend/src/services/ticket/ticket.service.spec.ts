import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ticket } from '@entities/ticket/ticket.entity'
import { TicketService } from '@services/ticket/ticket.service'

const mockEvent = {
  id: '1',
  start_date: '2025-09-01',
  end_date: '2025-09-01',
  event_name: 'Concert',
  place: 'Stadium',
  road_address: '123 Teheran-ro',
}

const mockTicket = {
  id: '1',
  event: mockEvent,
  seat_label: 'A1',
  ticketing_date: '2025-08-01',
  get_notification: true,
}

describe('TicketService', () => {
  let service: TicketService
  let repo: Repository<Ticket>

  const mockTicketRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    mockTicketRepository.find.mockResolvedValue([mockTicket])
    mockTicketRepository.findOne.mockResolvedValue(mockTicket)
    mockTicketRepository.findOneOrFail.mockResolvedValue(mockTicket)
    mockTicketRepository.save.mockResolvedValue(mockTicket)
    mockTicketRepository.create.mockReturnValue(mockTicket)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockTicketRepository,
        },
      ],
    }).compile()

    service = module.get<TicketService>(TicketService)
    repo = module.get<Repository<Ticket>>(getRepositoryToken(Ticket))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of tickets', async () => {
      const result = await service.findAll()
      expect(result).toEqual([mockTicket])
      expect(repo.find).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a single ticket', async () => {
      const result = await service.findOne(mockTicket.id)
      expect(result).toEqual(mockTicket)
      expect(repo.findOneOrFail).toHaveBeenCalledWith({ where: { id: mockTicket.id } })
    })
  })

  describe('create', () => {
    it('should create and return a ticket', async () => {
      const createDto = {
        event: mockEvent,
        seat_label: 'B1',
        ticketing_date: '2025-08-01',
        get_notification: true,
      }
      const createdTicket = { ...mockTicket, seat_label: 'B1' }

      mockTicketRepository.create.mockReturnValue(createdTicket)
      mockTicketRepository.save.mockResolvedValue(createdTicket)

      const result = await service.create(createDto)

      expect(repo.create).toHaveBeenCalledWith(createDto)
      expect(repo.save).toHaveBeenCalledWith(createdTicket)
      expect(result).toEqual(createdTicket)
    })
  })
})
