import { getEvents } from '@/api/events/route'
import { Event } from '@/types/event'
import { EventList } from '@/components/events/EventList'

export const metadata = {
  title: '공연 관리',
  description: '등록된 공연 리스트',
}

export default async function Events() {
  const events = await getEvents<Event[]>()

  return (
    <div>
      <h1>공연 관리</h1>
      <EventList events={events} />
    </div>
  )
}
