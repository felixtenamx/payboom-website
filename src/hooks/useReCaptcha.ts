import { useCallback, useEffect, useRef, useState } from 'react'
import { RECAPTCHA_SITE_KEY } from '@/lib/constants'

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      ready: (cb: () => void) => void
    }
  }
}

export function useReCaptcha() {
  const [ready, setReady] = useState(false)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => {
      setTimeout(() => {
        if (window.grecaptcha?.execute) {
          window.grecaptcha.ready(() => setReady(true))
        }
      }, 50)
    }
    script.onerror = () => setReady(false)
    document.head.appendChild(script)

    const start = Date.now()
    const poll = () => {
      if (window.grecaptcha?.execute) {
        setReady(true)
        return
      }
      if (Date.now() - start > 6000) return
      setTimeout(poll, 120)
    }
    poll()
  }, [])

  const execute = useCallback(async (action = 'contact_form'): Promise<string | null> => {
    if (!ready || !window.grecaptcha) return null
    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
      return token || null
    } catch {
      return null
    }
  }, [ready])

  return { ready, execute }
}