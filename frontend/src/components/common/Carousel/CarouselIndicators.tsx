import { useCarouselContext } from './CarouselContext'

export function CarouselIndicators() {
  const { currentIndex, totalItems, scrollToIndex } = useCarouselContext()

  if (totalItems <= 1) return null

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToIndex(index)}
          className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-gray-600' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  )
}
