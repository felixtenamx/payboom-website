import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { URLS } from '@/lib/constants'

type NavLink = { label: string; to: string; external?: false }
type ExternalLink = { label: string; href: string; external: true }
type NavItem = NavLink | ExternalLink

const navLinks: NavItem[] = [
  { to: '/tarjetas', label: 'Tarjetas' },
  { to: '/pagos-internacionales', label: 'Pagos internacionales' },
  { to: '/antifraude', label: 'Antifraude' },
  { href: URLS.docs, label: 'API', external: true },
  { to: '/#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const linkClass = "text-sm text-brand-text-muted hover:text-brand-text relative after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-orange after:to-brand-teal after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
  const mobileLinkClass = "text-brand-text-muted hover:text-brand-text transition-colors"

  return (
    <header className="fixed top-4 left-4 right-4 z-50 transition-all duration-300">
      <div
        className={`mx-auto flex items-center justify-between px-4 sm:px-6 py-3 max-w-[1200px] rounded-full border transition-all duration-300 backdrop-blur-[20px] ${
          scrolled
            ? 'bg-[rgba(10,10,35,0.85)] border-white/16'
            : 'bg-[rgba(10,10,35,0.6)] border-white/8'
        }`}
      >
        <Link to="/" className="inline-flex items-center gap-2 font-bold tracking-tight" onClick={closeMenu}>
          <svg viewBox="0 0 380 80" className="h-[26px] w-auto" role="img" aria-label="PAYBOOM">
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

        <nav className="hidden lg:flex gap-7" aria-label="Principal">
          {navLinks.map((link) => {
              if (link.external) return <a key={link.label} href={link.href} target="_blank" rel="noopener" className={linkClass}>{link.label}</a>
              return <Link key={link.label} to={link.to} className={linkClass}>{link.label}</Link>
            })}
        </nav>

        <div className="hidden lg:flex gap-2 items-center">
          <a href={URLS.onboarding} target="_blank" rel="noopener" className="btn-glass inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5">Iniciar sesión</a>
          <a href={URLS.whatsapp} target="_blank" rel="noopener" className="btn-grad inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5">Empezar gratis</a>
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-[22px] h-0.5 bg-brand-text rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-brand-text rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-brand-text rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden mx-auto mt-2 p-5 bg-[rgba(10,10,35,0.95)] border border-white/14 rounded-[20px] backdrop-blur-[20px]">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => {
              if (link.external) return <a key={link.label} href={link.href} target="_blank" rel="noopener" onClick={closeMenu} className={mobileLinkClass}>{link.label}</a>
              return <Link key={link.label} to={link.to} onClick={closeMenu} className={mobileLinkClass}>{link.label}</Link>
            })}
          </nav>
          <div className="flex flex-col gap-2">
            <a href={URLS.onboarding} target="_blank" rel="noopener" onClick={closeMenu} className="btn-glass text-center px-5 py-3 rounded-full text-sm font-medium transition-all">Iniciar sesión</a>
            <a href={URLS.whatsapp} target="_blank" rel="noopener" onClick={closeMenu} className="btn-grad text-center px-6 py-3 rounded-full text-sm font-semibold text-white transition-transform">Empezar gratis</a>
          </div>
        </div>
      )}
    </header>
  )
}