import { useState, useRef } from 'react'

import { CarouselContext } from './CarouselContext'
import { CarouselRootProps } from './types'

export function CarouselRoot({ children, totalItems }: CarouselRootProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
    const container = containerRef.current
    if (container) {
      const containerWidth = container.offsetWidth
      const itemWidth = containerWidth * 0.85
      const gap = 16
      const padding = 16

      // snap-center를 위한 계산: 아이템 중앙이 컨테이너 중앙에 오도록
      const itemCenter = padding + (itemWidth + gap) * index + itemWidth / 2
      const containerCenter = containerWidth / 2
      const scrollPosition = itemCenter - containerCenter

      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth',
      })
    }
  }

  const updateCurrentIndex = () => {
    const container = containerRef.current
    if (container) {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.offsetWidth
      const itemWidth = containerWidth * 0.85
      const gap = 16
      const padding = 16

      // snap-center를 위한 계산
      const containerCenter = containerWidth / 2
      const scrollCenter = scrollLeft + containerCenter
      const adjustedScroll = scrollCenter - padding
      const itemWidthWithGap = itemWidth + gap
      const newIndex = Math.round((adjustedScroll - itemWidth / 2) / itemWidthWithGap)

      setCurrentIndex(Math.min(Math.max(0, newIndex), totalItems - 1))
    }
  }

  return (
    <CarouselContext.Provider value={{ currentIndex, totalItems, scrollToIndex, containerRef, updateCurrentIndex }}>
      <div>{children}</div>
    </CarouselContext.Provider>
  )
}
