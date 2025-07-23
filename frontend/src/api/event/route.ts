import { BASE_URL } from '@constants/api'
import { Event } from '@type/event.type'

export const getEvent = async (eventId: string): Promise<Event> => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch event')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to fetch event')
  }
}
