import ContactForm from '@/components/contact/ContactForm'

export default function ContactSection() {
  return (
    <section id="contacto" className="py-25 relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="relative text-center p-20 max-sm:p-[50px_24px] bg-[radial-gradient(ellipse_at_center,rgba(240,82,21,0.18),rgba(4,158,160,0.10)_60%,transparent)] border border-white/16 rounded-[32px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(400px_circle_at_20%_30%,rgba(240,82,21,0.45),transparent_50%),radial-gradient(400px_circle_at_80%_70%,rgba(4,158,160,0.4),transparent_50%)]" />
          <span className="relative inline-block text-[13px] tracking-[0.18em] uppercase text-brand-teal-light font-semibold mb-3.5">Contacto</span>
          <h2 className="relative text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.03em] font-semibold mb-3">
            Hablemos de tu proyecto.
          </h2>
          <p className="relative text-brand-text-muted text-[17px] mb-8">
            Cuéntanos qué quieres mover y por dónde. Te respondemos en menos de 24 h.
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}