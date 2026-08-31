import { ArrowRight, MessageCircle, Zap, Shield, Award } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

// TODO: CONFIRM REAL FIGURES — the following stats are unverified placeholders.
// Replace each value with verified data before launch.
const stats = [
  { value: '300+', label: 'Projects Installed' }, // TODO: CONFIRM REAL FIGURE — real installation count
  { value: '15+', label: 'Years Experience' }, // TODO: CONFIRM REAL FIGURE — company age
  { value: '3 Year', label: 'Protection Package' }, // TODO: CONFIRM REAL FIGURE — matches 3-Year Solar Protection Package
  { value: '70–80%*', label: 'Avg Bill Savings' }, // TODO: CONFIRM REAL FIGURE — user-provided placeholder until real data
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFC]"
    >
      {/* Background gradient shards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#1E3A5F]/8 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#D97706]/6 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1E3A5F]/4 rounded-full blur-3xl" />
        {/* Geometric shards */}
        <div className="absolute top-0 right-0 w-[50%] h-full">
          <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-full"
                style={{
                  background: `linear-gradient(${160 + i * 10}deg, rgba(10,122,112,${0.05 + i * 0.02}) 0%, transparent 100%)`,
                  clipPath: `polygon(${i % 2 === 0 ? '0 0, 100% 15%, 100% 100%, 0 85%' : '0 15%, 100% 0, 100% 85%, 0 100%'})`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&fit=crop&fm=webp"
          alt="Solar panels installed on a modern building in Pakistan at golden hour"
          className="w-full h-full object-cover opacity-25 lg:opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/60 lg:via-[#F8FAFC]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-2xl xl:max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-8">
            <Zap className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">
                Trusted Solar Partner
            </span>
          </div>

          <h1 className="font-jakarta font-extrabold text-[#0F172A] leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Pakistan's Leading<br />
            <span className="text-[#1E3A5F] relative">
              Disaster-Protected Solar
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none">
                <path d="M0 8 Q100 2 200 8 Q300 14 400 8" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D97706]/10 border border-[#D97706]/30 mb-6">
            <Shield className="w-4 h-4 text-[#D97706]" />
            <span className="font-inter text-sm font-semibold text-[#B45309] tracking-wide uppercase">
              Covered Against Fire, Hail, Earthquakes &amp; Storms
            </span>
          </div>

          <p className="font-inter text-lg text-[#475569] leading-relaxed mb-4 max-w-xl">
            Zero worry about the unexpected. Every Solunar Energy installation is backed by a 3-Year Solar Protection Package, arranged through our takaful partner, covering your system against fire, storm, hail, and earthquakes. Save up to 70–80%* on your electricity bills while your investment stays protected — not exposed. Power your home, business, or industry with absolute peace of mind.
          </p>
          <p className="font-inter text-xs text-[#94A3B8] mb-10 max-w-xl">
            *Savings estimates vary by location, electricity usage, and system size. Your exact savings are confirmed after a free site survey.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: Shield, text: 'Qualified Installers' },
              { icon: Award, text: 'Quality Installation' },
              { icon: Zap, text: 'Net Metering Support' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-inter font-medium text-[#475569]">
                <Icon className="w-4 h-4 text-[#1E3A5F]" />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1E3A5F] text-white font-jakarta font-bold text-base hover:bg-[#1E3A5F]/90 transition-all duration-500 shadow-xl shadow-[#1E3A5F]/25 hover:shadow-[#1E3A5F]/40 hover:scale-[1.02] group"
            >
              Get Protected Solar Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href={`https://wa.me/923250200632?text=${encodeURIComponent('Assalam-o-Alaikum, I want a quotation for a solar system with the 3-year protection package.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('hero')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#25D366] text-[#25D366] font-jakarta font-bold text-base hover:bg-[#25D366]/8 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp for Solar Assessment
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#E2E8F0] bg-white/70 backdrop-blur-sm rounded-2xl border border-[#E2E8F0] p-6 lg:p-0 shadow-sm">
          {stats.map((s, i) => (
            <div key={i} className="lg:px-8 lg:py-6 text-center lg:text-left">
              <div className="font-jakarta font-extrabold text-3xl text-[#1E3A5F] mb-1">{s.value}</div>
              <div className="font-inter text-sm text-[#475569]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}