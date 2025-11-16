'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return <div className="border-2 border-gray-100 rounded-xl overflow-hidden mt-4">{children}</div>
}
