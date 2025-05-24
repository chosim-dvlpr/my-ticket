'use client'

import { useGetEvents } from '@/hooks/fetch/useGetEvents'

export default function Events() {
  const { events, isLoading, error } = useGetEvents()

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.event_name}</li>
        ))}
      </ul>
    </div>
  )
}
