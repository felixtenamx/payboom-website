import MetaTags from '@/components/seo/MetaTags'
import { URLS } from '@/lib/constants'

const concepts = [
  { num: 1, title: 'Senales', description: 'Recogemos cientos de senales en cada cobro: device fingerprint, IP, comportamiento del usuario, BIN de la tarjeta, velocidad de intentos y consistencia con compras previas.' },
  { num: 2, title: 'Scoring', description: 'Un modelo entrenado con millones de transacciones asigna un score de riesgo de 0 a 100. Cuanto mayor el score, mayor la probabilidad de fraude.' },
  { num: 3, title: 'Decision', description: 'Tus reglas y nuestros umbrales deciden: aprobar, retar con 3DS, derivar a revision manual o rechazar. Todo en menos de 80 ms.' },
]

export default function Antifraude() {
  return (
    <>
      <MetaTags
        title="Motor antifraude — Payboom"
        description="Motor antifraude de Payboom: como evaluamos cada transaccion en tiempo real con reglas dinamicas y modelos de machine learning."
        path="/antifraude"
      />

      <section className="pt-[160px] pb-15 text-center">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Motor antifraude</span>
          <h1 className="text-[clamp(36px,5.5vw,64px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
            Cada transaccion <span className="grad-text">evaluada</span><br/>en milisegundos.
          </h1>
          <p className="max-w-[720px] mx-auto text-brand-text-muted text-lg">
            El antifraude de Payboom no es una caja negra: combina reglas dinamicas y modelos de machine learning para decidir, transaccion a transaccion, que pasa.
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
            <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Como decidimos</span>
            <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
              Una transaccion <span className="grad-text">vista por dentro.</span>
            </h2>
            <p className="text-brand-text-muted text-[17px] max-w-[620px]">
              Sigue el viaje de una compra desde que el boton "pagar" se aprieta hasta que se autoriza o se rechaza.
            </p>
          </div>

          <div className="relative flow-card rounded-3xl p-5 sm:p-9 overflow-hidden mb-12">
            <svg className="w-full h-auto block relative z-10" viewBox="0 0 1100 360" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="gAF" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#f05215"/>
                  <stop offset="1" stopColor="#049ea0"/>
                </linearGradient>
              </defs>
              <g><rect x="40" y="140" width="160" height="80" rx="14" fill="rgba(255,255,255,0.06)" stroke="#f05215" strokeWidth="2"/><text x="120" y="175" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Transaccion</text><text x="120" y="198" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Click "Pagar"</text></g>
              <g><rect x="240" y="140" width="200" height="80" rx="14" fill="rgba(255,255,255,0.06)" stroke="#ff7a45" strokeWidth="2"/><text x="340" y="175" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Recolector de senales</text><text x="340" y="198" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Device · IP · BIN · velocity</text></g>
              <g><rect x="490" y="60" width="200" height="60" rx="12" fill="rgba(255,255,255,0.06)" stroke="#06c4c7" strokeWidth="2"/><text x="590" y="88" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Reglas dinamicas</text><text x="590" y="106" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Tus business rules</text></g>
              <g><rect x="490" y="150" width="200" height="60" rx="12" fill="rgba(255,255,255,0.06)" stroke="#06c4c7" strokeWidth="2"/><text x="590" y="178" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Modelo ML</text><text x="590" y="196" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Score 0–100</text></g>
              <g><rect x="490" y="240" width="200" height="60" rx="12" fill="rgba(255,255,255,0.06)" stroke="#06c4c7" strokeWidth="2"/><text x="590" y="268" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Listas y reputacion</text><text x="590" y="286" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Blacklists · whitelists</text></g>
              <g><rect x="730" y="140" width="180" height="80" rx="14" fill="rgba(255,255,255,0.06)" stroke="#049ea0" strokeWidth="2"/><text x="820" y="175" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Decision</text><text x="820" y="198" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontFamily="'Space Grotesk', sans-serif">Aprobar · Reto · Rechazar</text></g>
              <g><rect x="960" y="60" width="120" height="60" rx="12" fill="rgba(69,255,182,0.08)" stroke="#06c4c7" strokeWidth="2"/><text x="1020" y="95" textAnchor="middle" fontSize="14" fill="#06c4c7" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Aprobada</text></g>
              <g><rect x="960" y="150" width="120" height="60" rx="12" fill="rgba(255,122,69,0.08)" stroke="#ff7a45" strokeWidth="2"/><text x="1020" y="185" textAnchor="middle" fontSize="14" fill="#ff7a45" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Reto 3DS</text></g>
              <g><rect x="960" y="240" width="120" height="60" rx="12" fill="rgba(240,82,21,0.10)" stroke="#f05215" strokeWidth="2"/><text x="1020" y="275" textAnchor="middle" fontSize="14" fill="#f05215" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Rechazada</text></g>
              {[
                'M200 180 H 240', 'M440 180 L 490 90', 'M440 180 H 490', 'M440 180 L 490 270',
                'M690 90 L 730 165', 'M690 180 H 730', 'M690 270 L 730 195',
                'M910 165 L 960 90', 'M910 180 H 960', 'M910 195 L 960 270',
              ].map((d, i) => {
                const strokes = ['url(#gAF)', 'url(#gAF)', 'url(#gAF)', 'url(#gAF)', 'url(#gAF)', 'url(#gAF)', 'url(#gAF)', '#06c4c7', '#ff7a45', '#f05215']
                return <path key={i} className="flow-path" d={d} stroke={strokes[i]}/>
              })}
              <circle className="flow-particle" r="7" fill="#f05215"><animateMotion dur="3.5s" repeatCount="indefinite" path="M120 180 H 340 H 590 H 820 L 1020 90"/></circle>
              <circle r="6" fill="#ff7a45" opacity="0.85"><animateMotion dur="3.5s" begin="1.2s" repeatCount="indefinite" path="M120 180 H 340 H 590 H 820 L 1020 180"/></circle>
              <circle r="6" fill="#049ea0" opacity="0.85"><animateMotion dur="3.5s" begin="2.4s" repeatCount="indefinite" path="M120 180 H 340 H 590 H 820 L 1020 270"/></circle>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div>
              <h2 className="text-[clamp(26px,3.5vw,38px)] leading-[1.1] tracking-[-0.02em] font-semibold mb-4">Reglas que tu controlas</h2>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">Desde el dashboard puedes activar reglas como <em>"si la tarjeta es nueva y el monto supera 500 €, pedir 3DS"</em> sin tocar codigo.</p>
              <ul className="flex flex-col gap-2.5 pl-[22px]">
                {['Por pais, BIN, MCC, monto, hora del dia', 'Velocity checks (intentos por usuario / por tarjeta)', 'Listas dinamicas (negras, blancas, vigilancia)', 'Reglas A/B con trafico real'].map((item) => (
                  <li key={item} className="text-brand-text-muted relative before:absolute before:left-[-22px] before:top-[7px] before:w-3 before:h-3 before:rounded before:bg-gradient-to-br before:from-brand-orange before:to-brand-teal">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(26px,3.5vw,38px)] leading-[1.1] tracking-[-0.02em] font-semibold mb-4">Modelo entrenado con datos reales</h2>
              <p className="text-brand-text-muted mb-3.5 leading-[1.7]">Nuestro modelo de ML ha visto millones de transacciones legitimas y fraudulentas. Aprende patrones de cada pais, de cada vertical y los actualiza cada noche.</p>
              <ul className="flex flex-col gap-2.5 pl-[22px]">
                {['Deteccion de anomalias por sesion', 'Analisis de comportamiento del comprador', 'Cooperacion con redes de marca (Visa Risk)', 'Chargeback shield: cubrimos la disputa si autorizamos'].map((item) => (
                  <li key={item} className="text-brand-text-muted relative before:absolute before:left-[-22px] before:top-[7px] before:w-3 before:h-3 before:rounded before:bg-gradient-to-br before:from-brand-orange before:to-brand-teal">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-4">Pon a prueba el motor</h2>
          <p className="text-brand-text-muted mb-6">Te montamos un sandbox con tus reglas en 24 horas para que veas como decide en transacciones reales.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={URLS.whatsapp} target="_blank" rel="noopener" className="btn-grad inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base text-white transition-transform duration-300 hover:-translate-y-0.5">Probar el motor</a>
            <a href={URLS.docs} target="_blank" rel="noopener" className="btn-glass inline-flex items-center gap-2 px-7 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5">Ver la API</a>
          </div>
        </div>
      </section>
    </>
  )
}