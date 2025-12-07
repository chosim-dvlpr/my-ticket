import { CarouselRoot } from './CarouselRoot'
import { CarouselContent } from './CarouselContent'
import { CarouselItem } from './CarouselItem'
import { CarouselIndicators } from './CarouselIndicators'

export const Carousel = Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Item: CarouselItem,
  Indicators: CarouselIndicators,
})

export type { CarouselRootProps, CarouselContentProps, CarouselItemProps } from './types'
export { useCarouselDrag } from './useCarouselDrag'
