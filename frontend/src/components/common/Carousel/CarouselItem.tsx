import { CarouselItemProps } from './types'

export function CarouselItem({ children }: CarouselItemProps) {
  return <div className="min-w-[85%] flex-shrink-0 snap-center">{children}</div>
}
