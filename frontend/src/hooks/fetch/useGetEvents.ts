'use client'

import { useEffect, useState } from 'react'

import { getEvents } from '@/api/events/route'
import { Event } from '@/types/event'

interface UseGetEventsResult {
  events: Event[]
  isLoading: boolean
  error: Error | null
}

export const useGetEvents = (): UseGetEventsResult => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        const data = await getEvents<Event[]>()
        setEvents(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch events'))
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, isLoading, error }
}
