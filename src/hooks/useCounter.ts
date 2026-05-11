import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function useCounter(target: number, duration = 1400) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  const startCounter = () => {
    if (started.current) return
    started.current = true

    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(target * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const ref = useIntersectionObserver(startCounter, { threshold: 0.4 })

  return { ref, display }
}