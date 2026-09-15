import { Link } from 'react-router-dom';
import { BatteryCharging, ArrowRight } from 'lucide-react';

export default function BatteryStorageTeaserSection() {
  return (
    <section className="py-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E3A5F] rounded-3xl p-8 sm:p-12">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #D97706 0, transparent 40%)' }} />

          <div className="relative grid lg:grid-cols-[1.5fr_auto] gap-8 items-center">
            <div className="flex items-start gap-5">
              <span className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-2xl bg-[#D97706]/20 border border-[#D97706]/40 items-center justify-center">
                <BatteryCharging className="w-7 h-7 text-[#D97706]" />
              </span>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D97706] text-white text-[10px] font-jakarta font-bold uppercase tracking-wider">
                    New
                  </span>
                  <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">
                    Commercial &amp; Industrial Battery Storage
                  </span>
                </div>
                <h2 className="font-jakarta font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
                  Store Power. Cut Peak Costs. Never Go Dark.
                </h2>
                <p className="font-inter text-[#CBD5E1] text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  Running a factory or commercial building? Store power, cut peak-hour costs, and keep critical systems running through outages.
                </p>
                <Link
                  to="/battery-storage"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-lg shadow-[#D97706]/25 hover:scale-[1.02]"
                >
                  Explore Battery Storage <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}