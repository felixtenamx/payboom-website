import { Link } from 'react-router-dom'
import { URLS, COMPANY } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="pt-20 pb-8 mt-16 border-t border-white/8 relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 font-bold tracking-tight">
              <svg viewBox="0 0 380 80" className="h-8 w-auto" role="img" aria-label="PAYBOOM">
                <g fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="800" fontSize="72" letterSpacing="-1">
                  <text x="0" y="62" fill="#f05215">PAY</text>
                  <text x="160" y="62" fill="#049ea0">B</text>
                  <text x="318" y="62" fill="#049ea0">M</text>
                </g>
                <g transform="translate(206 14)">
                  <rect x="0" y="0" width="118" height="52" rx="26" ry="26" fill="#049ea0"/>
                  <circle cx="30" cy="26" r="14" fill="#ffffff"/>
                  <circle cx="74" cy="26" r="14" fill="#ffffff"/>
                  <circle cx="98" cy="34" r="4.5" fill="#ffffff"/>
                </g>
              </svg>
            </Link>
            <p className="text-brand-text-muted text-sm mt-4 max-w-[280px]">Infraestructura de pagos para empresas que no quieren depender de fronteras.</p>
            <div className="flex gap-2.5 mt-5">
              <a href={URLS.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="w-9 h-9 grid place-items-center rounded-[10px] bg-white/4 border border-white/8 text-brand-text-muted hover:text-brand-text hover:bg-white/8 hover:-translate-y-0.5 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5C0 2.12 1.119 1 2.5 1s2.48 1.119 2.48 2.5zM.22 8h4.56v14H.22V8zm7.18 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.13c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.36 1.59-2.36 3.23V22H7.4V8z"/></svg>
              </a>
              <a href={URLS.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-[10px] bg-white/4 border border-white/8 text-brand-text-muted hover:text-brand-text hover:bg-white/8 hover:-translate-y-0.5 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.5.4 1.1.4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.5.2-1.1.4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.5-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.5-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.8-2.2 1.4C1.3 2.7.8 3.4.5 4.2.2 5 .1 5.9 0 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.2.3 2.1.6 2.9.3.8.8 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 2.9.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.2-.1 2.1-.3 2.9-.6.8-.3 1.5-.8 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.2-.3-2.1-.6-2.9-.3-.8-.8-1.5-1.4-2.2C21.3 1.3 20.6.8 19.8.5 19 .2 18.1.1 16.9 0 15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-semibold mb-1">Producto</h4>
            <Link to="/tarjetas" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Tarjetas</Link>
            <Link to="/pagos-internacionales" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Pagos internacionales</Link>
            <Link to="/antifraude" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Antifraude</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-semibold mb-1">Developers</h4>
            <a href={URLS.docs} target="_blank" rel="noopener" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Documentación</a>
            <a href={URLS.docs} target="_blank" rel="noopener" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">API Reference</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-semibold mb-1">Empresa</h4>
            <a href="/#contacto" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Contacto</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-semibold mb-1">Legal</h4>
            <Link to="/terminos" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Términos</Link>
            <Link to="/privacidad" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Privacidad</Link>
            <Link to="/cookies" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Cookies</Link>
            <Link to="/licencias" className="text-sm text-brand-text-muted hover:text-brand-text transition-colors">Licencias</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/8 text-brand-text-dim text-xs gap-2">
          <p>{COMPANY.copyright}</p>
          <p>Hecho con ❤️ y 💪🏻 desde Madrid y México</p>
        </div>
      </div>
    </footer>
  )
}