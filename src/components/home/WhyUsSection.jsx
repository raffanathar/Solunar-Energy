import { Star, ShieldCheck, Wrench, DollarSign, Zap, Globe, Award, TrendingDown } from 'lucide-react';

const reasons = [
  // TODO: CONFIRM — "25-year performance" panel warranty claim; verify against actual panel warranty terms.
  { icon: Award, title: 'Tier-1 Solar Panels', desc: 'We only install LONGi, JA Solar, and other globally certified Tier-1 panels for maximum efficiency and 25-year performance.' },
  { icon: ShieldCheck, title: 'Certified Inverters', desc: 'Huawei, Deye, Solis, and SMA inverters — trusted brands with proven reliability in Pakistan\'s climate conditions.' },
  // TODO: CONFIRM — "AEDB-registered engineers" credential claim; verify registration/current validity.
  { icon: Star, title: 'Expert Installation', desc: 'Our AEDB-registered engineers follow international standards. Clean, safe, and code-compliant installations every time.' },
  { icon: DollarSign, title: 'Affordable Packages', desc: 'Competitive pricing with flexible payment options. We\'ll find a solution that fits your budget without compromising quality.' },
  { icon: Zap, title: 'Net Metering Support', desc: 'Complete end-to-end net metering application assistance with DISCO/LESCO/FESCO. We handle all the paperwork.' },
  // TODO: CONFIRM — "protected for life" after-sales guarantee claim; confirm maintenance-contract coverage.
  { icon: Wrench, title: 'After-Sales Service', desc: 'Annual maintenance contracts, performance monitoring, and rapid on-site support. Your investment is protected for life.' },
  { icon: TrendingDown, title: 'Energy Consultation', desc: 'Free load analysis and energy audit to design the optimal solar system — no overselling, just the right solution.' },
  { icon: Globe, title: 'Nationwide Support', desc: 'Service centers in Lahore, Islamabad, Faisalabad, Multan, Karachi, and growing. Local support when you need it.' },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(10,122,112,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(217,119,6,0.1) 0%, transparent 40%)`
      }} />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/20 border border-[#D97706]/30 mb-6">
            <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Why Choose Us</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-white text-4xl lg:text-5xl tracking-tight mb-5">
            The Solunar <span className="text-[#D97706]">Difference</span>
          </h2>
          <p className="font-inter text-[#94A3B8] text-base leading-relaxed">
            {/* TODO: CONFIRM REAL FIGURE — "500+ families and businesses" count placeholder. */}
            We combine technical excellence with genuine care for our customers. Here's why 500+ Pakistani families and businesses chose Solunar Energy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#1E3A5F]/40 transition-all duration-500 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D97706]/15 border border-[#D97706]/20 flex items-center justify-center mb-5 group-hover:bg-[#D97706]/25 transition-colors duration-500">
                <Icon className="w-6 h-6 text-[#D97706]" />
              </div>
              <h3 className="font-jakarta font-bold text-white text-base mb-3">{title}</h3>
              <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-center sm:text-left">
            <div className="font-jakarta font-bold text-white text-xl mb-1">Ready to switch to solar?</div>
            <div className="font-inter text-sm text-[#94A3B8]">Get a free site survey and customized quote — no obligation.</div>
          </div>
          <a
            href="#quote"
            className="flex-shrink-0 px-8 py-4 rounded-full bg-[#1E3A5F] text-white font-jakarta font-bold text-base hover:bg-[#1E3A5F]/90 transition-all duration-300 shadow-xl shadow-[#1E3A5F]/30 hover:scale-105"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}