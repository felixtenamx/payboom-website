import MetaTags from '@/components/seo/MetaTags'
import { URLS } from '@/lib/constants'

const concepts = [
  { num: 1, title: 'Recoleccion', description: 'El cliente paga en su pais con el metodo que le resulta natural: transferencia bancaria local (SPEI, ACH, SEPA, Pix) o cash (OXXO, deposito en banco, vouchers).' },
  { num: 2, title: 'Liquidacion + FX', description: 'Convertimos el importe a la moneda de destino con un FX transparente, en tiempo real. Sin intermediarios opacos, sin spreads ocultos.' },
  { num: 3, title: 'Dispersion', description: 'El dinero llega al beneficiario por su riel local: cuenta bancaria, billetera digital o pago en efectivo. Trazabilidad completa de extremo a extremo.' },
]

export default function PagosInternacionales() {
  return (
    <>
      <MetaTags
        title="Pagos internacionales — Payboom"
        description="Pagos internacionales con Payboom. Como se procesan transferencias y cash en distintos paises: recoleccion, FX y dispersion."
        path="/pagos-internacionales"
      />

      <section className="pt-[160px] pb-15 text-center">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Pagos internacionales</span>
          <h1 className="text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
            Mueve dinero entre paises <span className="grad-text">como si fuera local.</span>
          </h1>
          <p className="max-w-[720px] mx-auto text-brand-text-muted text-lg">
            Recoleccion por transferencia o efectivo, conversion justa de divisa y dispersion a quien tiene que cobrar — en una sola plataforma.
          </p>
        </div>
      </section>

      <section className="py-15">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
            {concepts.map((c) => (
              <div key={c.num} className="concept-card p-7 rounded-[20px]">
                <span className="inline-grid place-items-center w-9 h-9 rounded-[10px] font-bold text-base text-white bg-gradient-to-br from-brand-orange to-brand-teal mb-3.5">{c.num}</span>
                <h3 className="text-[19px] font-semibold mb-2">{c.title}</h3>
                <p className="text-brand-text-muted text-[14.5px]">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="max-w-[720px] mb-16">
            <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Flujo internacional</span>
            <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
              De un pais <span className="grad-text">a otro</span>, sin intermediarios opacos.
            </h2>
            <p className="text-brand-text-muted text-[17px] max-w-[620px]">
              El recorrido del dinero en una transferencia o cash collection internacional procesada con Payboom.
            </p>
          </div>

          <div className="relative flow-card rounded-3xl p-5 sm:p-9 overflow-hidden mb-12">
            <svg className="w-full h-auto block relative z-10" viewBox="0 0 1100 360" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="gIntl" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#f05215"/>
                  <stop offset="1" stopColor="#049ea0"/>
                </linearGradient>
              </defs>
              <text x="180" y="40" textAnchor="middle" fontSize="14" fill="#ff7a45" fontWeight="700" letterSpacing="2" fontFamily="'Space Grotesk', sans-serif">PAIS ORIGEN</text>
              <g>
                <rect x="40" y="80" width="160" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="#f05215" strokeWidth="2"/>
                <text x="120" y="112" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Cliente paga</text>
                <text x="120" y="135" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Transferencia · cash</text>
              </g>
              <g>
                <rect x="40" y="180" width="160" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="#ff7a45" strokeWidth="2"/>
                <text x="120" y="212" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Cuenta local</text>
                <text x="120" y="235" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Recoleccion Payboom</text>
              </g>
              <g>
                <rect x="380" y="120" width="340" height="120" rx="20" fill="rgba(255,255,255,0.04)" stroke="url(#gIntl)" strokeWidth="2.5"/>
                <text x="550" y="155" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="'Space Grotesk', sans-serif">Payboom · Motor FX</text>
                <text x="550" y="180" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Conversion en tiempo real</text>
                <text x="550" y="200" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Compliance · KYB · Trazabilidad</text>
                <text x="550" y="225" textAnchor="middle" fontSize="13" fill="#06c4c7" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">135 monedas · 100+ paises</text>
              </g>
              <text x="920" y="40" textAnchor="middle" fontSize="14" fill="#06c4c7" fontWeight="700" letterSpacing="2" fontFamily="'Space Grotesk', sans-serif">PAIS DESTINO</text>
              <g>
                <rect x="900" y="80" width="160" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="#06c4c7" strokeWidth="2"/>
                <text x="980" y="112" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Cuenta local</text>
                <text x="980" y="135" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Liquidacion Payboom</text>
              </g>
              <g>
                <rect x="900" y="180" width="160" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="#049ea0" strokeWidth="2"/>
                <text x="980" y="212" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Beneficiario</text>
                <text x="980" y="235" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Banco · wallet · cash</text>
              </g>
              <path className="flow-path" d="M120 150 V 180" stroke="#f05215"/>
              <path className="flow-path" d="M200 215 H 380" stroke="url(#gIntl)"/>
              <path className="flow-path" d="M720 175 H 900" stroke="url(#gIntl)"/>
              <path className="flow-path" d="M980 150 V 180" stroke="#049ea0"/>
              <circle className="flow-particle" r="8" fill="#f05215">
                <animateMotion dur="4s" repeatCount="indefinite" path="M120 115 V 215 H 380 L 720 175 H 900 V 215 V 215"/>
              </circle>
              <circle r="6" fill="#049ea0" opacity="0.9">
                <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M380 175 H 720 L 900 215 V 215"/>
              </circle>
              <text x="290" y="280" textAnchor="middle" fontSize="13" fill="#ff7a45" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">→ Recoleccion</text>
              <text x="810" y="280" textAnchor="middle" fontSize="13" fill="#06c4c7" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">→ Dispersion</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div>
              <h2 className="text-[clamp(26px,3.5vw,38px)] leading-[1.1] tracking-[-0.02em] font-semibold mb-4">Recoleccion sin fricciones</h2>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">Cobramos en el riel local del cliente para que <strong className="text-brand-text font-semibold">nunca tenga que pagar comisiones SWIFT</strong>. En Mexico un SPEI tarda segundos; en Brasil un Pix es instantaneo; en Europa un SEPA llega en menos de 10 segundos.</p>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">Para mercados donde la bancarizacion es baja, ofrecemos cash collection: el cliente va a un punto fisico, paga el voucher, y nosotros lo registramos automaticamente.</p>
              <ul className="flex flex-col gap-2.5 pl-[22px]">
                {['SPEI, Pix, ACH, SEPA, UPI, Faster Payments',
                  'OXXO, 7-Eleven, Boleto, Pago Efectivo',
                  'Conciliacion automatica por referencia',
                ].map((item) => (
                  <li key={item} className="text-brand-text-muted relative before:absolute before:left-[-22px] before:top-[7px] before:w-3 before:h-3 before:rounded before:bg-gradient-to-br before:from-brand-orange before:to-brand-teal">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(26px,3.5vw,38px)] leading-[1.1] tracking-[-0.02em] font-semibold mb-4">Dispersion a destino</h2>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">El beneficiario cobra como prefiere: en cuenta bancaria, en una billetera digital o en efectivo. Nosotros nos encargamos del ultimo kilometro.</p>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">Si la cuenta destino rebota, reintentamos automaticamente. Si hace falta KYC adicional, lo gestionamos sin frenar el resto del payout batch.</p>
              <ul className="flex flex-col gap-2.5 pl-[22px]">
                {['Cuentas bancarias en 100+ paises',
                  'Wallets locales y mobile money',
                  'Cash payout en agencias asociadas',
                  'Webhooks por estado: pending → settled',
                ].map((item) => (
                  <li key={item} className="text-brand-text-muted relative before:absolute before:left-[-22px] before:top-[7px] before:w-3 before:h-3 before:rounded before:bg-gradient-to-br before:from-brand-orange before:to-brand-teal">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-4">¿Tienes flujos cross-border?</h2>
          <p className="text-brand-text-muted mb-6">Cuentanos los corredores que necesitas. Te montamos el pricing en menos de 48 horas.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={URLS.whatsapp} target="_blank" rel="noopener" className="btn-grad inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base text-white transition-transform duration-300 hover:-translate-y-0.5">Hablar por WhatsApp</a>
            <a href={URLS.docs} target="_blank" rel="noopener" className="btn-glass inline-flex items-center gap-2 px-7 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5">Ver la API</a>
          </div>
        </div>
      </section>
    </>
  )
}