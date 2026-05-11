import MetaTags from '@/components/seo/MetaTags'

export default function Terminos() {
  return (
    <>
      <MetaTags title="Terminos y condiciones — Payboom" description="Terminos y condiciones de uso de Payboom: relacion contractual, derechos y obligaciones." path="/terminos" />
      <main className="legal-prose max-w-[820px] mx-auto px-6 pt-[140px] pb-20">
        <h1 className="text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.03em] mb-2">Terminos y Condiciones</h1>
        <p className="text-brand-text-dim text-sm mb-10">Ultima actualizacion: 1 de mayo de 2026 · PayBoom S.A.S. de C.V.</p>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Estos terminos regulan el acceso y uso del sitio web payboom.io, de la plataforma PayBoom y de las APIs ofrecidas por <strong className="text-brand-text font-semibold">PayBoom S.A.S. de C.V.</strong> ("PayBoom", "nosotros"). Al utilizar nuestros servicios aceptas estos terminos integramente.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">1. Quienes somos</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">PayBoom S.A.S. de C.V. es una sociedad por acciones simplificada constituida bajo las leyes de los Estados Unidos Mexicanos, con folio de constitucion <code>SAS202506881505</code>. Operamos como agregador de pagos y proveemos servicios tecnologicos de procesamiento de tarjetas, transferencias y pagos internacionales.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">2. Aceptacion</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Si utilizas el sitio o contratas el servicio, declaras que tienes la capacidad legal para hacerlo, que la informacion que proporcionas es veraz y que aceptas estos terminos. Si actuas en nombre de una empresa, declaras ademas que cuentas con poder suficiente para vincularla.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">3. Servicios PayBoom</h2>
        <ul><li>Procesamiento de tarjetas (Visa, Mastercard, AMEX, redes locales).</li><li>Pagos internacionales y conversion de divisa.</li><li>APIs y SDKs para integraciones tecnicas.</li><li>Motor antifraude y analitica.</li></ul>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">El alcance especifico de los servicios contratados se detalla en el contrato comercial firmado con cada cliente. Estos terminos son complementarios y se aplican en todo lo no previsto en aquel.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">4. Obligaciones del cliente</h2>
        <ul><li>Cumplir con la normativa aplicable a tu actividad (incluyendo prevencion de blanqueo, proteccion de datos y normativa de pagos).</li><li>Proveer informacion veraz para los procesos de KYC y KYB.</li><li>Custodiar adecuadamente tus credenciales de API y de acceso al dashboard.</li><li>No utilizar los servicios para actividades ilicitas, prohibidas por las redes de marca o sancionadas por las autoridades competentes.</li></ul>
        <h2 className="text-[22px] font-semibold tracking-tight">5. Comisiones y liquidacion</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Las comisiones aplicables, plazos de liquidacion y condiciones financieras se acuerdan caso a caso en el contrato comercial. PayBoom liquida las cantidades que correspondan al cliente en los plazos pactados, neto de comisiones, contracargos y retenciones legales.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">6. Limitacion de responsabilidad</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">PayBoom presta sus servicios con la diligencia exigible a un proveedor profesional de servicios tecnologicos. No nos hacemos responsables de fallos imputables a terceros (redes de marca, bancos, internet) ni de danos indirectos, lucro cesante o perdida de oportunidad. Nuestra responsabilidad agregada quedara limitada a los importes efectivamente cobrados al cliente en los doce meses anteriores al incidente.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">7. Propiedad intelectual</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Los contenidos del sitio, las APIs, los SDKs, la marca PayBoom, el logotipo y cualquier elemento grafico son propiedad de PayBoom o de sus licenciantes. Te concedemos una licencia limitada, no exclusiva y revocable para utilizarlos exclusivamente con la finalidad de operar el servicio contratado.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">8. Suspension y terminacion</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Podremos suspender o terminar el acceso al servicio en caso de incumplimiento de estos terminos, sospecha fundada de fraude, bloqueo regulatorio o solicitud de autoridad competente. Te avisaremos con la antelacion que sea razonable salvo que la inmediatez resulte exigida por motivos de seguridad o ley.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">9. Ley aplicable y jurisdiccion</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Estos terminos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de Mexico, salvo que la ley imperativamente disponga otro fuero.</p>
        <h2 className="text-[22px] font-semibold tracking-tight">10. Contacto</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Para cualquier comunicacion relacionada con estos terminos, escribenos a <a href="mailto:comercial@payboom.io">comercial@payboom.io</a>.</p>
        <hr/>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Estos terminos pueden actualizarse. La version vigente sera siempre la publicada en este sitio.</p>
      </main>
    </>
  )
}