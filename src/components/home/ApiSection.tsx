import CodeTabs from '@/components/ui/CodeTabs'
import { URLS } from '@/lib/constants'

export default function ApiSection() {
  return (
    <section id="api" className="py-30 relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-15 items-center">
          <div>
            <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Para developers</span>
            <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
              Una API. <span className="grad-text">Cero sorpresas.</span>
            </h2>
            <p className="text-brand-text-muted text-[17px] max-w-[620px]">
              REST, idempotencia real, webhooks firmados con HMAC y un sandbox que se comporta como producción. Empieza a cobrar en una tarde.
            </p>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 my-7">
              <div className="p-[18px_20px] bg-white/4 border border-white/8 rounded-xl flex flex-col gap-1 text-sm text-brand-text-muted">
                <strong className="text-2xl font-semibold grad-text">200 ms</strong>
                Latencia media de autorización
              </div>
              <div className="p-[18px_20px] bg-white/4 border border-white/8 rounded-xl flex flex-col gap-1 text-sm text-brand-text-muted">
                <strong className="text-2xl font-semibold grad-text">99.999%</strong>
                SLA en plan Enterprise
              </div>
              <div className="p-[18px_20px] bg-white/4 border border-white/8 rounded-xl flex flex-col gap-1 text-sm text-brand-text-muted">
                <strong className="text-2xl font-semibold grad-text">8</strong>
                SDKs oficiales
              </div>
              <div className="p-[18px_20px] bg-white/4 border border-white/8 rounded-xl flex flex-col gap-1 text-sm text-brand-text-muted">
                <strong className="text-2xl font-semibold grad-text">24/7</strong>
                Soporte técnico
              </div>
            </div>
            <a href={URLS.docs} target="_blank" rel="noopener" className="btn-grad inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base text-white transition-transform duration-300 hover:-translate-y-0.5">
              Acceder a la documentación
            </a>
          </div>

          <CodeTabs />
        </div>
      </div>
    </section>
  )
}