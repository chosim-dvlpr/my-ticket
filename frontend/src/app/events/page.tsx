import { Event } from '@type/event.type'
import EventList from '@components/events/EventList'
import Header from '@components/common/Header'
import { fetchFromApiRoute } from '@lib/fetchFromApiRoute'

export const metadata = {
  title: '공연 관리',
  description: '등록된 공연 리스트',
}

export default async function Events() {
  const events = await fetchFromApiRoute<Event[]>('/api/events')

  return (
    <div>
      <Header title="공연 관리" />
      {events && events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <h3 className="text-lg font-semibold mb-2">이벤트가 없습니다</h3>
          <p className="text-sm">등록된 공연이 없거나 데이터를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      )}
    </div>
  )
}
