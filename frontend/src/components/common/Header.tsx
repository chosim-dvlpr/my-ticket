import { Menu } from 'lucide-react'

interface HeaderProps {
  title?: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="relative h-14 border-b border-b-grey-50">
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-mlg font-bold">{title}</h1>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
        <Menu size={24} />
      </button>
    </div>
  )
}
