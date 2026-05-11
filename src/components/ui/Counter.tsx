import { useCounter } from '@/hooks/useCounter'

interface CounterProps {
  target: number
  label: string
}

export default function Counter({ target, label }: CounterProps) {
  const { ref, display } = useCounter(target)

  return (
    <div ref={ref} className="p-[18px_22px] bg-white/4 border border-white/8 rounded-xl">
      <span className="block text-[32px] font-semibold tracking-tight grad-text">
        {display.toLocaleString('es-ES')}
      </span>
      <span className="text-[13px] text-brand-text-dim">{label}</span>
    </div>
  )
}