'use client'

interface BadgeProps {
  content: string
  variant: 'gray'
}

export default function Badge({ content, variant }: BadgeProps) {
  const badgeVariant = {
    gray: 'bg-gray-800 text-gray-100',
  } as const

  return <div className={`px-2 py-1 rounded-full text-sm ${badgeVariant[variant]}`}>{content}</div>
}
