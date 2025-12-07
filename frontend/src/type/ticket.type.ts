import { EventSchedule } from './eventSchedule.type'

export interface Ticket {
  id: string
  event_id: string
  event_schedule_id: string
  seat_label: string
  ticketing_date: string
  get_notification: boolean
  eventSchedule: EventSchedule
}
