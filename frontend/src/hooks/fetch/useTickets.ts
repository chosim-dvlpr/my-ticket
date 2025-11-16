import { useEffect, useState } from 'react'

import { Ticket } from '@type/ticket.type'
import { getTicketsByEvent } from 'src/app/apis/ticket/ticket'

export const useTickets = (eventId: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTicketsByEvent(eventId)
      .then((res) => setTickets(res))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }, [eventId])

  return { tickets, isLoading, error }
}
