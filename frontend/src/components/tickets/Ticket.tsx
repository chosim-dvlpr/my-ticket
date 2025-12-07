import Badge from '@components/common/Badge'
import Card from '@components/common/Card'
import { Event } from '@type/event.type'
import type { Ticket } from '@type/ticket.type'
import { calculateDday, formatDateTime } from 'src/utils/dateTime'

interface TicketProps {
  ticket: Ticket
  event: Event
}

export default function Ticket({ ticket, event }: TicketProps) {
  const dday = calculateDday(ticket.eventSchedule.event_date)

  return (
    <Card>
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">{event.event_name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {ticket.eventSchedule.event_date} ({ticket.eventSchedule.round_number}회차)
            </p>
          </div>
          {dday > 0 ? <Badge content={`D-${dday}`} variant="gray" /> : <Badge content="D-day" variant="gray" />}
        </div>

        <div className="border-t border-gray-100" />

        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">좌석</span>
            <span className="font-medium text-gray-900">{ticket.seat_label}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">예매일</span>
            <span className="text-gray-900">{ticket.ticketing_date}</span>
          </div>
          {ticket.eventSchedule.cancellation_deadline && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">취소 마감</span>
              <span className="text-gray-900">{formatDateTime(ticket.eventSchedule.cancellation_deadline)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">알림</span>
            <span className="text-gray-900">{ticket.get_notification ? '신청' : '미신청'}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
