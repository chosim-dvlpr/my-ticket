'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Info, MapPin, SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

import { useEvent } from '@hooks/fetch/useEvent'
import { useTickets } from '@hooks/fetch/useTickets'
import Chip from '@components/common/Chip'
import { MAP } from '@constants/externalUrl'
import Ticket from '@components/tickets/Ticket'
import { Carousel } from '@components/common/Carousel'

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const { event, isLoading, error } = useEvent(eventId)
  const { tickets } = useTickets(eventId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!event) return <div>이벤트가 없습니다.</div>

  return (
    <div className="overflow-hidden">
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

      {/* Chip */}
      <div className="flex flex-row gap-4 mt-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {event.md_info_url && (
          <Link href={event.md_info_url}>
            <Chip content="MD 정보" icon={<Info width={24} height={24} />} variant="gray" />
          </Link>
        )}
        <a href={MAP(event.road_address)}>
          <Chip content="공연장 정보" icon={<MapPin width={24} height={24} />} variant="gray" />
        </a>
        {/* TODO:" 티켓 예매 페이지 연결" */}
        <Chip content="티켓 예매 페이지" icon={<SquareArrowOutUpRight width={24} height={24} />} variant="gray" />
      </div>

      {/* Tickets */}
      <Carousel totalItems={tickets.length}>
        <Carousel.Content>
          {tickets.map((ticket) => (
            <Carousel.Item key={ticket.id}>
              <Ticket ticket={ticket} event={event} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Indicators />
      </Carousel>
    </div>
  )
}
