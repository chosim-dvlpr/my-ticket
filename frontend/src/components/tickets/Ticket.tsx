import Badge from '@components/common/Badge'
import Card from '@components/common/Card'
import { Event } from '@type/event.type'
import type { Ticket } from '@type/ticket.type'
import { calculateDday } from 'src/utils/date'

interface TicketProps {
  ticket: Ticket
  event: Event
}

export default function Ticket({ ticket, event }: TicketProps) {
  const dday = calculateDday(event.start_date || '')

  return (
    <Card>
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <p>티켓 정보 {ticket.id}</p>
          {dday > 0 ? <Badge content={`D-${dday}`} variant="gray" /> : <Badge content="D-day" variant="gray" />}
        </div>

        <div className="border-t border-gray-100" />

        <div className="p-4">
          <div>
            <p>좌석: </p>
            <p>취소 마감: </p>
          </div>
          <div>
            <p>수수료 구간</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
