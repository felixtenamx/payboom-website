const badges = [
  { title: 'PCI DSS', sub: 'Cumplimiento' },
  { title: '3DS 2.2', sub: 'Frictionless' },
  { title: 'Tokenización', sub: 'Network tokens' },
  { title: 'Cifrado', sub: 'AES-256 + TLS 1.3' },
  { title: 'Antifraude', sub: 'Modelo IA propio' },
  { title: 'SCA', sub: 'Strong Customer Auth.' },
  { title: 'Vault', sub: 'Datos sensibles aislados' },
  { title: 'Business Rules', sub: 'Reglas dinámicas' },
]

export default function SecuritySection() {
  return (
    <section id="seguridad" className="py-[120px] relative section-alt">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="max-w-[720px] mx-auto text-center mb-16">
          <span className="inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Seguridad</span>
          <h2 className="text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-[18px]">
            Diseñada para los más <span className="grad-text">paranóicos.</span>
          </h2>
          <p className="text-brand-text-muted text-[17px] max-w-[620px] mx-auto">
            Cumplimiento de nivel banco con la velocidad de un producto moderno. Tus clientes no se enteran. Tu equipo de riesgo, sí.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.title}
              className="text-center p-7 bg-gradient-to-b from-white/5 to-transparent border border-white/8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/16"
            >
              <span className="block font-bold text-lg tracking-tight mb-1">{b.title}</span>
              <span className="text-xs text-brand-text-dim tracking-[0.05em]">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}