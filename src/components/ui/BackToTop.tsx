import { useState, useEffect, useCallback } from 'react'

/**
 * Back-to-top button that appears after scrolling past a threshold.
 * Smooth scrolls to top on click. Respects prefers-reduced-motion.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-brand-orange/80 backdrop-blur-sm border border-white/16 text-white shadow-[0_8px_30px_-8px_rgba(240,82,21,0.5)] transition-all duration-300 hover:bg-brand-orange hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-10px_rgba(240,82,21,0.6)] animate-cookie-in"
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}
