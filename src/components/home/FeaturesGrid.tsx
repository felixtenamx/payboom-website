import ProductCard from '@/components/ui/ProductCard'

const products = [
  {
    icon: 'card',
    iconVariant: 'icon-1' as const,
    title: 'Procesamiento de tarjetas',
    description: 'Visa, Mastercard, Amex, UnionPay y más. Autorización en menos de 200 ms con enrutamiento inteligente para maximizar la tasa de aprobación.',
    items: ['3D Secure 2 nativo', 'Tokenización segura', 'Network tokens y Apple Pay'],
    href: '/tarjetas',
  },
  {
    icon: 'globe',
    iconVariant: 'icon-2' as const,
    title: 'Pagos internacionales',
    description: 'Cobra y paga en 135 monedas con liquidación local. Transferencias SWIFT, SEPA, ACH y rieles instantáneos en una sola integración.',
    items: ['FX en tiempo real, sin sorpresas', 'Cuentas multi-divisa', 'Compliance KYB/KYC integrado'],
    href: '/pagos-internacionales',
  },
  {
    icon: 'code',
    iconVariant: 'icon-3' as const,
    title: 'API y SDKs',
    description: 'REST limpia, webhooks fiables, SDKs en varios lenguajes. Pasa de la documentación a producción la misma tarde — con sandbox real.',
    items: ['Webhooks idempotentes', 'SDK Node, Python, Go, PHP', 'Test cards y simuladores'],
    href: 'https://docs.payboom.io/',
    external: true,
  },
  {
    icon: 'shield',
    iconVariant: 'icon-4' as const,
    title: 'Antifraude IA',
    description: 'Motor de riesgo entrenado con millones de transacciones. Bloquea el fraude antes de que llegue al gateway, sin fricción para clientes legítimos.',
    items: ['Reglas dinámicas + ML', 'Velocity checks, device fingerprint', 'Chargeback shield'],
    href: '/antifraude',
  },
]

export default function FeaturesGrid() {
  return (
    <section id="productos" className="py-[120px] relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="max-w-[720px] mb-16">
          <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Productos</span>
          <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
            Una plataforma. <span className="grad-text">Todos tus pagos.</span>
          </h2>
          <p className="text-brand-text-muted text-[17px] max-w-[620px]">
            Desde el primer cobro hasta payouts globales: la infraestructura que tu equipo necesita, sin reinventar la rueda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}