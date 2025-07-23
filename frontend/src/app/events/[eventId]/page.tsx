'use client'

import { useParams } from 'next/navigation'

import { useEvent } from '@hooks/fetch/useEvent'

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const { event, isLoading, error } = useEvent(eventId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  console.log(event)

  return (
    <div>
      {/* Event Card */}
      <div></div>

      {/* chip */}

      {/* Tickets */}
    </div>
  )
}
