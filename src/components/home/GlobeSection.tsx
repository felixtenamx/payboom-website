import { Suspense, lazy } from 'react'
import Counter from '@/components/ui/Counter'
import { METRICS, PAYMENT_METHODS } from '@/lib/constants'

const PaymentGlobe = lazy(() => import('@/components/three/PaymentGlobe'))

export default function GlobeSection() {
  return (
    <section id="global" className="py-30 relative section-alt">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-15 items-center">
          <div>
            <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Cobertura global</span>
            <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
              El dinero se mueve <span className="grad-text">como debería.</span>
            </h2>
            <p className="text-brand-text-muted text-[17px] max-w-[620px]">
              Conecta corredores entre regiones, acepta el método local que tus clientes usan a diario y recibe en tu moneda — sin fricción, sin intermediarios opacos.
            </p>

            <div className="grid grid-cols-2 gap-[18px] my-7">
              {METRICS.map((m) => (
                <Counter key={m.label} target={m.value} label={m.label} />
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span key={method} className="px-3.5 py-1.5 rounded-full bg-white/4 border border-white/16 text-[13px] text-brand-text-muted">
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[560px] max-lg:h-[440px] max-sm:h-[360px] lg:order-none -order-1">
            <Suspense fallback={<div className="w-full h-full bg-white/4 rounded-[20px]" />}>
              <PaymentGlobe />
            </Suspense>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-[18px] px-4 py-2 bg-[rgba(10,10,35,0.7)] border border-white/16 rounded-full backdrop-blur-[12px] text-[13px] text-brand-text-muted">
              <span><i className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle bg-brand-orange shadow-[0_0_8px_var(--color-brand-orange)]" />Origen</span>
              <span><i className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle bg-brand-teal-light shadow-[0_0_8px_var(--color-brand-teal-light)]" />Destino</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}