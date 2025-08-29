import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ticket } from '@entities/ticket/ticket.entity'
import { TicketService } from '@services/ticket/ticket.service'

const mockTicket = {
  id: '1',
  event_id: '1',
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
    mockTicketRepository.delete.mockResolvedValue({ affected: 1 })

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

  describe('create', () => {
    it('should create and return a ticket', async () => {
      const createDto = {
        event_id: '1',
        seat_label: 'B1',
        ticketing_date: '2025-08-01',
        get_notification: true,
      }
      const createdTicket = { ...mockTicket, seat_label: 'B1' }

      mockTicketRepository.create.mockReturnValue(createdTicket)
      mockTicketRepository.save.mockResolvedValue(createdTicket)

      const result = await service.create(createDto.event_id, createDto)

      expect(repo.create).toHaveBeenCalledWith(createDto)
      expect(repo.save).toHaveBeenCalledWith(createdTicket)
      expect(result).toEqual(createdTicket)
    })
  })

  describe('getTicketsByEvent', () => {
    it('should return tickets for the event', async () => {
      const result = await service.getTicketsByEvent('1')

      expect(repo.find).toHaveBeenCalledWith({ where: { event_id: '1' } })
      expect(result).toEqual([mockTicket])
    })
  })

  describe('delete', () => {
    it('should delete the ticket successfully', async () => {
      await expect(service.delete('1', '1')).resolves.toBeUndefined()
      expect(repo.delete).toHaveBeenCalledWith({ id: '1', event_id: '1' })
    })

    it('should throw an error if ticket does not exist', async () => {
      mockTicketRepository.delete.mockResolvedValueOnce({ affected: 0 })
      await expect(service.delete('1', '999')).rejects.toThrow('Ticket not found or does not belong to the event')
    })
  })
})
