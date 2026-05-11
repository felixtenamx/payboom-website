import MetaTags from '@/components/seo/MetaTags'
import { URLS } from '@/lib/constants'

const concepts = [
  { num: 1, title: 'Merchant', description: 'Eres tu. El comercio que vende un producto o servicio y necesita aceptar tarjetas. Tu reto: cobrar rapido, con la mayor tasa de aprobacion posible.' },
  { num: 2, title: 'Agregador', description: 'Payboom. El que agrupa miles de comercios bajo una infraestructura comun para que tu no tengas que negociar con bancos uno a uno. Aporta seguridad, antifraude y conciliacion.' },
  { num: 3, title: 'Emisor', description: 'El banco del cliente final. El que emite la tarjeta y, al final del proceso, decide si autoriza o rechaza el cobro segun fondos, riesgo y verificacion 3DS.' },
]

export default function Tarjetas() {
  return (
    <>
      <MetaTags
        title="Procesamiento de tarjetas — Payboom"
        description="Procesamiento de tarjetas con Payboom. Como se procesa un cobro local e internacional, que es un agregador, un merchant y un emisor."
        path="/tarjetas"
      />

      <section className="pt-[160px] pb-15 text-center">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Procesamiento de tarjetas</span>
          <h1 className="text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
            Como cobramos una <span className="grad-text">tarjeta</span><br/>local e internacional.
          </h1>
          <p className="max-w-[720px] mx-auto text-brand-text-muted text-lg">
            Cuando alguien paga con tarjeta, ocurren cinco saltos en menos de 200 milisegundos. Te lo contamos sin jerga financiera.
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
            <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Flujo local</span>
            <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
              Un cobro <span className="grad-text">en el mismo pais.</span>
            </h2>
            <p className="text-brand-text-muted text-[17px] max-w-[620px]">
              Sigue el viaje del dinero del cliente al merchant. La animacion recorre cada salto en tiempo real.
            </p>
          </div>

          <div className="relative flow-card rounded-3xl p-9 overflow-hidden mb-12">
            <svg className="w-full h-auto block relative z-10" viewBox="0 0 1100 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="gFlow1" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#f05215"/>
                  <stop offset="1" stopColor="#049ea0"/>
                </linearGradient>
              </defs>
              {['Cliente', 'Merchant', 'Payboom', 'Red de marca', 'Emisor'].map((label, i) => {
                const positions = [20, 240, 460, 680, 900]
                const subLabels = [['Tarjeta · 3DS'], ['Checkout · API'], ['Agregador · Antifraude'], ['Visa · Mastercard'], ['Banco del cliente']]
                const colors = ['#f05215', '#ff7a45', '#06c4c7', '#06c4c7', '#049ea0']
                return (
                  <g key={label}>
                    <rect x={positions[i]} y={120} width={170} height={80} rx={14} fill="rgba(255,255,255,0.06)" stroke={colors[i]} strokeWidth={2}/>
                    <text x={positions[i] + 85} y={155} textAnchor="middle" fontSize="16" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">{label}</text>
                    <text x={positions[i] + 85} y={178} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">{subLabels[i][0]}</text>
                  </g>
                )
              })}
              {[190, 410, 630, 850].map((x, i) => (
                <path key={i} className="flow-path" d={`M${x} 160 H ${x + 50}`} stroke="url(#gFlow1)"/>
              ))}
              <circle className="flow-particle" r="7" fill="#f05215">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M105 200 V 240 H 985 V 200"/>
              </circle>
              <circle r="7" fill="#049ea0" opacity="0.85">
                <animateMotion dur="6s" begin="3s" repeatCount="indefinite" rotate="auto" path="M985 120 V 80 H 105 V 120"/>
              </circle>
              <text x="545" y="265" textAnchor="middle" fontSize="13" fill="#ff7a45" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">→ Solicitud de autorizacion</text>
              <text x="545" y="55" textAnchor="middle" fontSize="13" fill="#06c4c7" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">← Autorizacion + liquidacion</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div>
              <h2 className="text-[clamp(26px,3.5vw,38px)] leading-[1.1] tracking-[-0.02em] font-semibold mb-4">¿Que pasa en cada salto?</h2>
              <ul className="flex flex-col gap-2.5 pl-[22px]">
                {['Cliente → Merchant: introduce la tarjeta en tu checkout. El navegador cifra los datos antes de salir del dispositivo.',
                  'Merchant → Payboom: tu sistema llama a nuestra API. Tokenizamos la tarjeta para que tu nunca veas el PAN real.',
                  'Payboom → Red: enviamos la transaccion a Visa o Mastercard junto con senales de antifraude y 3DS.',
                  'Red → Emisor: el banco del cliente decide si hay fondos y si la transaccion luce legitima.',
                  'Vuelta: en menos de 200 ms recibes "autorizado" o "rechazado". Si es autorizado, programamos la liquidacion a tu cuenta.',
                ].map((item) => (
                  <li key={item} className="text-brand-text-muted relative before:absolute before:left-[-22px] before:top-[7px] before:w-3 before:h-3 before:rounded before:bg-gradient-to-br before:from-brand-orange before:to-brand-teal">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(26px,3.5vw,38px)] leading-[1.1] tracking-[-0.02em] font-semibold mb-4">Y si la tarjeta es internacional…</h2>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">El proceso es practicamente identico, pero pasa por mas entidades intermedias y suele requerir <strong className="text-brand-text font-semibold">conversion de divisa</strong>. Payboom liquida al merchant en su moneda local y absorbe el FX en un solo importe transparente.</p>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">Tambien aplicamos enrutamiento dinamico: si una tarjeta argentina se rechaza por una ruta, probamos otra adquirencia en milisegundos para maximizar la aprobacion.</p>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">El <strong className="text-brand-text font-semibold">3DS 2.2</strong> en cross-border es obligatorio en muchas regiones. Lo manejamos por ti: si el banco del cliente lo requiere, mostramos el reto biometrico sin que toques nada.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-4">¿Listo para integrar?</h2>
          <p className="text-brand-text-muted mb-6">Empieza con la documentacion o contactanos directamente por WhatsApp.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={URLS.docs} target="_blank" rel="noopener" className="btn-grad inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base text-white transition-transform duration-300 hover:-translate-y-0.5">Ver la API</a>
            <a href={URLS.whatsapp} target="_blank" rel="noopener" className="btn-glass inline-flex items-center gap-2 px-7 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5">Hablar con ventas</a>
          </div>
        </div>
      </section>
    </>
  )
}