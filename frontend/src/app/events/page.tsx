import { Event } from '@type/event.type'
import { getEvents } from '@api/events/route'
import EventList from '@components/events/EventList'
import Header from '@components/common/Header'

export const metadata = {
  title: '공연 관리',
  description: '등록된 공연 리스트',
}

export default async function Events() {
  const events = await getEvents<Event[]>()

  return (
    <div>
      <Header title="공연 관리" />
      <EventList events={events} />
    </div>
  )
}
