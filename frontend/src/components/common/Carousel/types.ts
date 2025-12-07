import { ReactNode, RefObject } from 'react'

export interface CarouselContextType {
  currentIndex: number
  totalItems: number
  scrollToIndex: (index: number) => void
  containerRef: RefObject<HTMLDivElement | null>
  updateCurrentIndex: () => void
}

export interface CarouselRootProps {
  children: ReactNode
  totalItems: number
}

export interface CarouselContentProps {
  children: ReactNode
}

export interface CarouselItemProps {
  children: ReactNode
}
