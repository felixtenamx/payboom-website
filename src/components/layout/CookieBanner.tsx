import { Link } from 'react-router-dom'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function CookieBanner() {
  const { showBanner, accept, reject } = useCookieConsent()

  if (!showBanner) return null

  return (
    <div className="cookie-banner fixed bottom-4 left-4 right-4 z-[100] bg-[rgba(10,22,30,0.92)] border border-white/16 rounded-[18px] backdrop-blur-[20px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] animate-cookie-in">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 max-w-[1200px] mx-auto">
        <div className="flex-1">
          <strong className="block mb-1 text-[15px]">Esta web usa cookies.</strong>
          <p className="text-[13.5px] text-brand-text-muted m-0">
            Usamos cookies propias y de terceros para iniciar sesión, prevenir bots (reCAPTCHA), recibir mensajes desde el formulario de contacto y entender cómo usas el sitio (Google Analytics). Puedes leer el detalle en nuestra{' '}
            <Link to="/cookies" className="text-brand-teal underline">política de cookies</Link>.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 sm:self-center">
          <button onClick={reject} className="btn-glass inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5">
            Rechazar
          </button>
          <button onClick={accept} className="btn-grad inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}