import { useState } from 'react'

const snippets: Record<string, string> = {
  node: `<span class="text-brand-text-dim italic">// Cobra una tarjeta en cualquier moneda</span>
<span class="text-brand-orange-light">import</span> Payboom <span class="text-brand-orange-light">from</span> <span class="text-brand-teal-light">"@payboom/node"</span>;

<span class="text-brand-orange-light">const</span> pb = <span class="text-brand-orange-light">new</span> <span class="text-brand-teal">Payboom</span>(process.env.<span class="text-brand-orange-light opacity-80">PAYBOOM_KEY</span>);

<span class="text-brand-orange-light">const</span> charge = <span class="text-brand-orange-light">await</span> pb.charges.<span class="text-brand-teal">create</span>({
  amount: <span class="text-[#f5b074]">4990</span>,            <span class="text-brand-text-dim italic">// 49,90</span>
  currency: <span class="text-brand-teal-light">"EUR"</span>,
  source: <span class="text-brand-teal-light">"tok_visa_4242"</span>,
  customer: <span class="text-brand-teal-light">"cus_8f3aB2"</span>,
  capture: <span class="text-brand-orange-light">true</span>,
  metadata: { order: <span class="text-brand-teal-light">"ord_001"</span> }
});

console.<span class="text-brand-teal">log</span>(charge.status); <span class="text-brand-text-dim italic">// "succeeded"</span>`,
  python: `<span class="text-brand-text-dim italic"># Cobra una tarjeta en cualquier moneda</span>
<span class="text-brand-orange-light">import</span> payboom

payboom.api_key = os.environ[<span class="text-brand-teal-light">"PAYBOOM_KEY"</span>]

charge = payboom.Charge.<span class="text-brand-teal">create</span>(
    amount=<span class="text-[#f5b074]">4990</span>,            <span class="text-brand-text-dim italic"># 49,90</span>
    currency=<span class="text-brand-teal-light">"EUR"</span>,
    source=<span class="text-brand-teal-light">"tok_visa_4242"</span>,
    customer=<span class="text-brand-teal-light">"cus_8f3aB2"</span>,
    capture=<span class="text-brand-orange-light">True</span>,
    metadata={<span class="text-brand-teal-light">"order"</span>: <span class="text-brand-teal-light">"ord_001"</span>}
)

<span class="text-brand-teal">print</span>(charge.status)  <span class="text-brand-text-dim italic"># "succeeded"</span>`,
  curl: `<span class="text-brand-text-dim italic"># Cobra una tarjeta en cualquier moneda</span>
curl https://api.payboom.io/v1/charges \\
  -u <span class="text-brand-orange-light opacity-80">$PAYBOOM_KEY</span>: \\
  -d amount=<span class="text-[#f5b074]">4990</span> \\
  -d currency=<span class="text-brand-teal-light">EUR</span> \\
  -d source=<span class="text-brand-teal-light">tok_visa_4242</span> \\
  -d customer=<span class="text-brand-teal-light">cus_8f3aB2</span> \\
  -d capture=<span class="text-brand-orange-light">true</span> \\
  -d metadata[order]=<span class="text-brand-teal-light">ord_001</span>`,
}

const tabs = ['Node.js', 'Python', 'cURL']
const keys = ['node', 'python', 'curl']

export default function CodeTabs() {
  const [active, setActive] = useState('node')

  return (
    <div className="relative bg-gradient-to-b from-[#0e0d2e] to-[#06061a] border border-white/16 rounded-[20px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(240,82,21,0.4)]">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand-orange/15 to-transparent" />
      <div className="flex items-center gap-4 px-[18px] py-3.5 border-b border-white/8 bg-white/[0.02] relative">
        <div className="flex gap-1.5">
          <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
          <span className="w-[11px] h-[11px] rounded-full bg-[#28c940]" />
        </div>
        <div className="flex gap-1 ml-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(keys[i])}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                active === keys[i]
                  ? 'bg-white/8 text-brand-text'
                  : 'text-brand-text-dim'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <pre className="relative px-7 py-6 font-mono text-[13.5px] leading-[1.75] overflow-x-auto text-[#d6d8f5]">
        <code dangerouslySetInnerHTML={{ __html: snippets[active] }} />
      </pre>
    </div>
  )
}