import { Event } from '@/types/event'

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <h2>{event.event_name}</h2>
          <p>Date: {event.start_date}</p>
          <p>Location: {event.place}</p>
        </li>
      ))}
    </ul>
  )
}
