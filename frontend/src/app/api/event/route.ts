import { Event } from '@type/event.type'
import { apiGet } from '@lib/apiClient'

export const getEvent = async (eventId: string): Promise<Event> => {
  const event = await apiGet<Event>(`/events/${eventId}`)
  return event
}
