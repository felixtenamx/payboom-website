import { Suspense, lazy } from 'react'
import Badge from '@/components/ui/Badge'
import { URLS } from '@/lib/constants'

const FloatingCard = lazy(() => import('@/components/three/FloatingCard'))

export default function Hero() {
  return (
    <section className="pt-[160px] pb-20 relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-15 items-center">
          <div className="hero__content">
            <Badge>Nueva infraestructura · 2026</Badge>
            <h1 className="text-[clamp(40px,6.4vw,84px)] leading-[0.98] tracking-[-0.04em] font-semibold mb-6">
              Pagos<br />
              <span className="grad-text">sin fronteras</span><br />
              a la velocidad de tu API.
            </h1>
            <p className="text-lg text-brand-text-muted max-w-[540px] mb-8">
              Acepta tarjetas, transferencias y pagos internacionales en una sola plataforma.
              Integra en minutos, escala en días, factura en cualquier moneda.
            </p>
            <div className="flex gap-3 flex-wrap mb-14">
              <a href={URLS.whatsapp} target="_blank" rel="noopener" className="btn-grad inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base text-white transition-transform duration-300 hover:-translate-y-0.5">
                Empieza ahora
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href={URLS.docs} target="_blank" rel="noopener" className="btn-glass inline-flex items-center gap-2 px-7 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5">
                Ver la API
              </a>
            </div>
            <div className="flex gap-10 pt-8 border-t border-white/8">
              <div className="flex flex-col">
                <strong className="text-[28px] font-semibold tracking-tight grad-text">100+</strong>
                <span className="text-[13px] text-brand-text-dim">países</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-[28px] font-semibold tracking-tight grad-text">135</strong>
                <span className="text-[13px] text-brand-text-dim">monedas</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-[28px] font-semibold tracking-tight grad-text">99.999%</strong>
                <span className="text-[13px] text-brand-text-dim">uptime</span>
              </div>
            </div>
          </div>

          <div className="relative h-[560px] max-lg:h-[440px] max-sm:h-[360px] lg:order-none -order-1">
            <Suspense fallback={<div className="w-full h-full bg-white/4 rounded-[20px]" />}>
              <FloatingCard />
            </Suspense>
            <div className="absolute top-[10%] left-[5%] inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[rgba(10,10,35,0.7)] border border-white/16 text-[13px] text-brand-text backdrop-blur-[12px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] animate-float-chip">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M2 7h20v10H2z" fill="#FFD700" opacity=".15"/><path d="M2 7h20v10H2z" stroke="#FFD700" strokeWidth="1.5" fill="none"/><path d="M7 7v10M17 7v10M2 12h20" stroke="#FFD700" strokeWidth="1.5"/></svg>
              <span>Tap to Pay</span>
            </div>
            <div className="absolute top-[50%] right-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[rgba(10,10,35,0.7)] border border-white/16 text-[13px] text-brand-text backdrop-blur-[12px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] animate-float-chip" style={{ animationDelay: '-1.6s' }}>
              <svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="#049ea0" strokeWidth="1.5"/><path d="M8 12l3 3 5-6" fill="none" stroke="#049ea0" strokeWidth="2"/></svg>
              <span>3D Secure 2</span>
            </div>
            <div className="absolute bottom-[12%] left-[10%] inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[rgba(10,10,35,0.7)] border border-white/16 text-[13px] text-brand-text backdrop-blur-[12px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] animate-float-chip" style={{ animationDelay: '-3.2s' }}>
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 7h16v10H4z" fill="none" stroke="#f05215" strokeWidth="1.5"/><path d="M4 11h16" stroke="#f05215" strokeWidth="1.5"/></svg>
              <span>Settlement T+1</span>
            </div>
          </div>
        </div>

        <div className="mt-25 text-center">
          <p className="text-[13px] text-brand-text-dim tracking-[0.1em] uppercase mb-6">Confían en Payboom equipos de</p>
          <div className="flex flex-wrap gap-12 justify-center items-center opacity-70">
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">NEXORA</span>
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">Lumen<small className="text-brand-teal-light mx-0.5">•</small>Pay</span>
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">STRIDE</span>
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">Helix Labs</span>
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">Nordvolt</span>
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">Atlasium</span>
            <span className="font-bold text-lg tracking-[0.05em] text-brand-text-muted">Polaris</span>
          </div>
        </div>
      </div>
    </section>
  )
}