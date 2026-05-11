import { useEffect, useRef } from 'react'

export function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.12 }
) {
  const ref = useRef<HTMLDivElement | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          callback()
          observer.unobserve(el)
        }
      })
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [callback, options])

  return ref
}