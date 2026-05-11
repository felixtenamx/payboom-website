import { useCallback, useEffect, useState } from 'react'
import { COOKIE_KEY } from '@/lib/constants'
import type { CookieConsent } from '@/types'

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY)
      if (stored === 'accepted' || stored === 'rejected') {
        setConsent(stored)
      }
    } catch {}
  }, [])

  const accept = useCallback(() => {
    try { localStorage.setItem(COOKIE_KEY, 'accepted') } catch {}
    setConsent('accepted')
  }, [])

  const reject = useCallback(() => {
    try { localStorage.setItem(COOKIE_KEY, 'rejected') } catch {}
    setConsent('rejected')
  }, [])

  return { consent, accept, reject, showBanner: consent === null }
}