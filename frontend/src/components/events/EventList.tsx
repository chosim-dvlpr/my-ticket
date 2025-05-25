import Image from 'next/image'

import { Event } from '@type/event.type'

interface EventListProps {
  events: Event[]
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="flex flex-col gap-4 mx-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg border border-grey-200 cursor-pointer">
          <div className="relative h-22 w-18 rounded-md bg-grey-100">
            {event.poster_url ? (
              <Image
                src={event.poster_url}
                alt={event.event_name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-grey-400">No Image</div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-grey-900">{event.event_name}</h2>
            <p className="text-sm text-grey-600">
              {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-grey-600">{event.place}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
