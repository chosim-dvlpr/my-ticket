'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'

import { useEvent } from '@hooks/fetch/useEvent'

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const { event, isLoading, error } = useEvent(eventId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!event) return <div>이벤트가 없습니다.</div>

  return (
    <div>
      {/* Event Card */}
      <div className="border-2 border-gray-100 rounded-xl overflow-hidden mt-4">
        <div className="overflow-hidden w-full">
          {/* TODO: 기본 이미지 추가 */}
          <Image
            src={event.poster_url || 'https://example.com'}
            className="h-40 object-cover"
            width={400}
            height={100}
            unoptimized
            alt="포스터 이미지"
          />
        </div>
        <div className="p-4">
          <div className="font-bold">{event.event_name}</div>
          <div className="flex gap-2 text-gray-400 mt-2">
            <div>{event.start_date}</div>
            <div>-</div>
            <div>{event.end_date}</div>
          </div>
          <div className="text-gray-400">{event.place}</div>
        </div>
      </div>
      {/* chip */}
      {/* Tickets */}
    </div>
  )
}
