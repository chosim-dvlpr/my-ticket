import { apiGet } from '@lib/apiClient'
import { Ticket } from '@type/ticket.type'

export const getTicketsByEvent = async (eventId: string): Promise<Ticket[]> => {
  return await apiGet<Ticket[]>(`/events/${eventId}/tickets`)
}
