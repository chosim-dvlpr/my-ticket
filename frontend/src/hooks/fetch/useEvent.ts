import { useEffect, useState } from 'react'

import { getEvent } from '@api/event/route'
import { Event } from '@type/event.type'

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getEvent(eventId)
      .then((res) => setEvent(res))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }, [eventId])

  return { event, isLoading, error }
}
