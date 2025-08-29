import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string
  icon?: ReactNode
  variant: 'gray'
}

export default function Chip({ content, icon, variant, ...rest }: ChipProps) {
  const { onClick } = rest
  const buttonVariant = {
    gray: 'text-gray-900 bg-gray-200 hover:bg-gray-300 active:bg-gray-300',
  } as const

  return (
    <button onClick={onClick} className={`flex gap-1 p-2 whitespace-nowrap rounded-2xl ${buttonVariant[variant]}`}>
      {icon}
      {content}
    </button>
  )
}
