import { useCarouselContext } from './CarouselContext'
import { CarouselContentProps } from './types'
import { useCarouselDrag } from './useCarouselDrag'

export function CarouselContent({ children }: CarouselContentProps) {
  const { containerRef, updateCurrentIndex } = useCarouselContext()
  const { isDragging, handlers } = useCarouselDrag({
    containerRef,
    onDragEnd: updateCurrentIndex,
  })

  return (
    <div
      ref={containerRef}
      {...handlers}
      className="flex gap-4 overflow-x-scroll snap-x snap-proximity scroll-smooth [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] select-none px-4"
      style={{
        scrollBehavior: isDragging ? 'auto' : 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  )
}
