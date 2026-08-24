import { CheckCircle2, Users, Globe, HeartHandshake } from 'lucide-react';

const values = [
  'Local Pakistani solar market expertise',
  'Professional AEDB-certified installation team',
  'Tier-1 solar panels and inverters only',
  'Comprehensive after-sales support',
  'Transparent pricing, no hidden costs',
  'Customized solar packages for every budget',
  'Net metering guidance and paperwork',
  // TODO: CONFIRM — service-area claim; confirm exact cities.
  'Serving Lahore and Islamabad/Rawalpindi',
];

const pillars = [
  { icon: Globe, title: 'Local Expertise', desc: "Deep understanding of Pakistan's electricity landscape, WAPDA/LESCO/FESCO grid requirements, and regional solar potential." },
  // TODO: CONFIRM REAL FIGURE — installation count; replace with verified number.
  { icon: Users, title: 'Experienced Team', desc: 'Our certified engineers have installed solar systems across residential, commercial, and industrial properties.' },
  { icon: HeartHandshake, title: 'After-Sales Care', desc: 'We stand behind every installation with maintenance contracts, performance monitoring, and rapid response support.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white section-rule relative overflow-hidden">
      {/* Light leak */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D97706]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80&fit=crop&fm=webp"
                alt="Solunar Energy professional installation team working on solar panels in Pakistan"
                className="w-full h-80 lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] p-5 w-44">
              {/* TODO: CONFIRM REAL FIGURE — installation count placeholder. Replace with verified number. */}
              <div className="font-jakarta font-extrabold text-3xl text-[#1E3A5F]">300+</div>
              <div className="font-inter text-xs text-[#475569] mt-1">Successful solar installations across Pakistan</div>
            </div>
            {/* Badge */}
            <div className="absolute -top-4 -left-4 bg-[#D97706] text-white rounded-2xl shadow-xl p-4 w-28 text-center">
              {/* TODO: CONFIRM REAL FIGURE — company age placeholder. Replace with verified number. */}
              <div className="font-jakarta font-extrabold text-2xl">15+</div>
              <div className="font-inter text-xs font-medium">Years in Solar</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
              <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">About Solunar Energy</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Your Trusted Solar <br />
              <span className="text-[#1E3A5F]">Energy Partner</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed mb-8">
              Solunar Energy is a Pakistan-based solar energy company on a mission to make clean, affordable electricity accessible to every home and business. We bring together cutting-edge technology, local expertise, and a genuine commitment to reducing Pakistan's energy crisis — one rooftop at a time.
            </p>

            {/* Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {values.map(v => (
                <div key={v} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#1E3A5F] flex-shrink-0 mt-0.5" />
                  <span className="font-inter text-sm text-[#475569]">{v}</span>
                </div>
              ))}
            </div>

            {/* Pillars */}
            <div className="space-y-4">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1E3A5F]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <div className="font-jakarta font-bold text-sm text-[#0F172A] mb-1">{title}</div>
                    <div className="font-inter text-sm text-[#475569] leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}