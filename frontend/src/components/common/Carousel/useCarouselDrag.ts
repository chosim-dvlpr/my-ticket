import { useRef, useState } from 'react'

interface UseCarouselDragProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  onDragEnd: () => void
}

export const useCarouselDrag = ({ containerRef, onDragEnd }: UseCarouselDragProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    setIsDragging(true)
    hasDraggedRef.current = false
    startXRef.current = e.pageX - containerRef.current.offsetLeft
    scrollLeftRef.current = containerRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.2

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true
    }

    containerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
    onDragEnd()
  }

  const handleClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return

    hasDraggedRef.current = false
    startXRef.current = e.touches[0].pageX
    scrollLeftRef.current = containerRef.current.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return

    const x = e.touches[0].pageX
    const walk = x - startXRef.current

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true
    }

    containerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleTouchEnd = () => {
    onDragEnd()
  }

  return {
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUpOrLeave,
      onMouseLeave: handleMouseUpOrLeave,
      onClick: handleClick,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}
