import { useState, useCallback } from 'react'
import type { FormEvent } from 'react'
import { useReCaptcha } from '@/hooks/useReCaptcha'
import { submitLead } from '@/lib/api'
import type { LeadPayload } from '@/types'

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: '' | 'idle' | 'loading' | 'ok' | 'err'; text: string }>({ type: '', text: '' })
  const { ready, execute } = useReCaptcha()

  const submit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return

    setStatus({ type: 'loading', text: 'Enviando…' })

    const fd = new FormData(form)
    const sanitize = (v: FormDataEntryValue | null, max: number) => (v?.toString() ?? '').trim().slice(0, max)

    const token = ready && execute ? await execute('contact_form').catch(() => null) : null

    const payload: LeadPayload = {
      Nombre: sanitize(fd.get('nombre'), 100),
      Correo: sanitize(fd.get('correo'), 254),
      Telefono: sanitize(fd.get('telefono'), 32),
      Mensaje: sanitize(fd.get('mensaje'), 2000),
      'g-recaptcha-response': token || '',
    }

    const KEY = 'payboom_cf_ts_v1'
    try {
      const raw = localStorage.getItem(KEY)
      const now = Date.now()
      const arr: number[] = raw ? JSON.parse(raw) : []
      const filtered = arr.filter((ts) => now - ts < 3600000)
      if (filtered.length >= 5) {
        setStatus({ type: 'err', text: 'Has enviado demasiadas solicitudes. Intenta más tarde.' })
        return
      }
      filtered.push(now)
      localStorage.setItem(KEY, JSON.stringify(filtered))
    } catch {}

    try {
      const res = await submitLead(payload)
      if (!res.ok) throw new Error('http ' + res.status)
      const json = await res.json().catch(() => ({}))
      if (json?.ok || json?.forward?.success === 'true' || json?.forward?.success === true) {
        setStatus({ type: 'ok', text: '¡Mensaje enviado! Te contactamos en menos de 24 h.' })
        form.reset()
      } else {
        setStatus({ type: 'ok', text: '¡Mensaje enviado! Te contactamos pronto.' })
        form.reset()
      }
    } catch (err) {
      setStatus({
        type: 'err',
        text: err instanceof Error && err.name === 'AbortError'
          ? 'La solicitud tardó demasiado. Inténtalo de nuevo.'
          : 'No se pudo enviar. Inténtalo de nuevo o escríbenos a comercial@payboom.io',
      })
    }
  }, [ready, execute])

  return (
    <form id="contactForm" onSubmit={submit} className="relative z-10 max-w-[720px] mx-auto text-left" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[18px]">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] text-brand-text-muted tracking-[0.02em]">Nombre</span>
          <input type="text" name="nombre" required autoComplete="name" placeholder="Ej. María García"
            className="font-sans text-brand-text px-4 py-3.5 bg-[rgba(10,22,30,0.55)] border border-white/16 rounded-xl outline-none transition-all focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(240,82,21,0.18)] focus:bg-[rgba(10,22,30,0.8)] placeholder:text-brand-text-dim w-full"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] text-brand-text-muted tracking-[0.02em]">Correo</span>
          <input type="email" name="correo" required autoComplete="email" placeholder="maria@empresa.com"
            className="font-sans text-brand-text px-4 py-3.5 bg-[rgba(10,22,30,0.55)] border border-white/16 rounded-xl outline-none transition-all focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(240,82,21,0.18)] focus:bg-[rgba(10,22,30,0.8)] placeholder:text-brand-text-dim w-full"
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[13px] text-brand-text-muted tracking-[0.02em]">Teléfono</span>
          <input type="tel" name="telefono" required autoComplete="tel" placeholder="+52 ..."
            className="font-sans text-brand-text px-4 py-3.5 bg-[rgba(10,22,30,0.55)] border border-white/16 rounded-xl outline-none transition-all focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(240,82,21,0.18)] focus:bg-[rgba(10,22,30,0.8)] placeholder:text-brand-text-dim w-full"
          />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[13px] text-brand-text-muted tracking-[0.02em]">¿Qué estás buscando?</span>
          <textarea name="mensaje" rows={5} required placeholder="Cuéntanos sobre tu empresa, volumen estimado, mercados, integraciones..."
            className="font-sans text-brand-text px-4 py-3.5 bg-[rgba(10,22,30,0.55)] border border-white/16 rounded-xl outline-none transition-all resize-y focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(240,82,21,0.18)] focus:bg-[rgba(10,22,30,0.8)] placeholder:text-brand-text-dim w-full"
          />
        </label>
      </div>
      <button type="submit" disabled={status.type === 'loading'} className="btn-grad inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait">
        Enviar
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>
      <p className={`text-sm mt-3.5 min-h-[20px] ${status.type === 'ok' ? 'text-brand-teal-light' : status.type === 'err' ? 'text-brand-orange-light' : 'text-brand-text-muted'}`} role="status" aria-live="polite">
        {status.text}
      </p>
    </form>
  )
}