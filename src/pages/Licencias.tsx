import MetaTags from '@/components/seo/MetaTags'

export default function Licencias() {
  return (
    <>
      <MetaTags title="Licencias — Payboom" description="Como PayBoom se apalanca en licencias propias y de proveedores para tokenizar tarjetas, transmitir dinero y operar como agregador." path="/licencias" />
      <main className="legal-prose max-w-[820px] mx-auto px-6 pt-[140px] pb-20">
        <h1 className="text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.03em] mb-2">Licencias</h1>
        <p className="text-brand-text-dim text-sm mb-10">Ultima actualizacion: 1 de mayo de 2026 · PayBoom S.A.S. de C.V.</p>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Para procesar pagos a escala global hace falta mas que tecnologia: hace falta una <strong className="text-brand-text font-semibold">arquitectura de licencias</strong> que permita tokenizar tarjetas, mover dinero entre paises y custodiar fondos en condiciones de seguridad. En PayBoom combinamos licencias propias y de proveedores estrategicos para ofrecer ese servicio sin que tu tengas que gestionarlas.</p>

        <h2 className="text-[22px] font-semibold tracking-tight">1. Licencias propias de PayBoom</h2>

        <h3 className="text-[17px] font-semibold">Cumplimiento PCI DSS</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">PayBoom cumple el estandar <strong className="text-brand-text font-semibold">PCI DSS</strong> (Payment Card Industry Data Security Standard), el conjunto de controles que las redes Visa, Mastercard y AMEX exigen a cualquier entidad que procesa, transmite o almacena datos de tarjeta. Este cumplimiento nos permite operar nuestra propia <strong className="text-brand-text font-semibold">boveda de tokenizacion</strong>: cuando una tarjeta entra en nuestro sistema, generamos un token que reemplaza al PAN real. Tu base de datos nunca toca el numero original; los reembolsos y cobros recurrentes se hacen contra el token.</p>

        <h3 className="text-[17px] font-semibold">Boveda de tokenizacion</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Operada bajo nuestro perimetro PCI, la boveda almacena los datos sensibles aislados del resto de la infraestructura, con cifrado AES-256 en reposo, controles de acceso de minimo privilegio y registros inmutables de auditoria. Permite emitir <strong className="text-brand-text font-semibold">network tokens</strong> homologados con cada red de marca, lo que mejora la tasa de aprobacion y reduce el alcance de cumplimiento de nuestros clientes.</p>

        <h3 className="text-[17px] font-semibold">Licencias regulatorias en proceso</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">PayBoom opera como entidad mexicana y se encuentra en distintas fases de obtencion de autorizaciones que nos permitan ampliar progresivamente nuestra capacidad de actuar como agregador y operador transfronterizo. Te informaremos en esta pagina a medida que cada licencia se confirme.</p>

        <h2 className="text-[22px] font-semibold tracking-tight">2. Licencias de proveedores estrategicos</h2>

        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Para los servicios que aun no operamos directamente, nos apalancamos en proveedores con licencias <strong className="text-brand-text font-semibold">ya autorizadas y vigentes</strong>. Esto nos permite ofrecer cobertura inmediata sin esperar nuestros propios procesos regulatorios.</p>

        <h3 className="text-[17px] font-semibold">Transmision de dinero (money transmission)</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Para mover fondos entre paises y emitir payouts a beneficiarios finales, trabajamos con socios licenciados como <strong className="text-brand-text font-semibold">Money Transmitters</strong> en cada jurisdiccion donde lo exige la regulacion local. Estos socios cuentan con autorizaciones especificas (en EE. UU. por estado, en la UE como entidades de pago, en LATAM bajo autoridades equivalentes) y son auditados periodicamente.</p>

        <h3 className="text-[17px] font-semibold">Custodia y depositos</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Para mantener los fondos en cuenta segregada mientras viajan entre el cobro y la liquidacion, utilizamos cuentas custodia (<em>safeguarding accounts</em>) en bancos asociados con licencia bancaria plena. Esto garantiza que el dinero del cliente final nunca se confunde con el patrimonio de PayBoom.</p>

        <h3 className="text-[17px] font-semibold">Adquirencia y conexion a redes de marca</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">El acceso a Visa, Mastercard, AMEX y redes locales se realiza mediante adquirentes autorizados con los que mantenemos acuerdos de procesamiento. Esto nos permite ofrecer multiples rutas de procesamiento por pais y enrutar dinamicamente cada transaccion al adquirente con mayor probabilidad de aprobacion.</p>

        <h3 className="text-[17px] font-semibold">Antifraude y verificacion de identidad</h3>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Nuestro motor antifraude se complementa con servicios de terceros licenciados para verificacion de identidad (KYC), screening de listas internacionales (PLD/AML) y analisis de riesgo de dispositivos. Cada uno cuenta con sus propias certificaciones de seguridad.</p>

        <h2 className="text-[22px] font-semibold tracking-tight">3. Como se traduce esto en valor para ti</h2>
        <ul><li>Empiezas a cobrar con una sola integracion, sin gestionar licencias propias.</li><li>Tus datos de tarjeta nunca tocan tus servidores: viven en nuestra boveda PCI.</li><li>Operas en multiples paises usando rieles locales que ya estan autorizados.</li><li>El cumplimiento se delega a quien lo tiene resuelto, no se inventa de cero.</li></ul>

        <h2 className="text-[22px] font-semibold tracking-tight">4. Transparencia en la cadena</h2>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">Cuando contratas a PayBoom, te entregamos una ficha de proveedores subcontratados con los que opera tu cuenta para que tu equipo de cumplimiento pueda evaluarlos. Si necesitas firmar un acuerdo de subcontratacion especifico, lo gestionamos con cada uno de ellos.</p>

        <hr/>
        <p className="text-brand-text-muted text-base leading-[1.75] mb-3.5">¿Quieres revisar el detalle tecnico y regulatorio? Escribenos a <a href="mailto:comercial@payboom.io">comercial@payboom.io</a> y te ponemos en contacto con nuestro equipo de cumplimiento.</p>
      </main>
    </>
  )
}