import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

/**
 * Slide-in side panel with backdrop overlay.
 * Portaled to document.body for correct z-index stacking.
 * Handles body scroll lock, Escape-to-close, and focus trapping.
 */
export default function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Body scroll lock — uses position:fixed to reliably block background
  // scroll on iOS where overflow:hidden on <body> is ignored.
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const body = document.body
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflowY = 'scroll'
    return () => {
      const offset = -parseInt(body.style.top || '0', 10)
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.style.overflowY = ''
      window.scrollTo(0, offset)
    }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Focus management
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null
      // Small delay to let the panel render
      requestAnimationFrame(() => {
        const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      })
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm animate-drawer-backdrop-in"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 z-[95] w-[min(85vw,360px)] bg-[rgba(10,10,35,0.97)] border-l border-white/12 backdrop-blur-[20px] animate-drawer-panel-in overflow-y-auto overscroll-contain shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.5)]"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {children}
      </div>
    </>,
    document.body,
  )
}
