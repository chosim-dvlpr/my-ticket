import { createContext, useContext } from 'react'

import { CarouselContextType } from './types'

export const CarouselContext = createContext<CarouselContextType | null>(null)

export const useCarouselContext = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel 하위 컴포넌트는 Carousel 내부에서만 사용 가능합니다')
  }
  return context
}
