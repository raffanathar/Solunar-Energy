import { Link } from 'react-router-dom';
import { CreditCard, MessageCircle, ArrowRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function InstallmentsTeaserSection() {
  return (
    <section className="py-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E3A5F] rounded-3xl p-8 sm:p-12">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #D97706 0, transparent 40%)' }} />

          <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-inter font-semibold uppercase tracking-wider mb-5">
                <CreditCard className="w-3.5 h-3.5" /> Easy Installments
              </div>
              <h2 className="font-jakarta font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
                Switch to Solar Without Paying Everything Upfront
              </h2>
              <p className="font-inter text-[#CBD5E1] text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Pick any solar package and spread the cost over easy monthly installments. Ask us about our flexible plans — same quality, same protection.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/installments"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-lg shadow-[#D97706]/25 hover:scale-[1.02]"
                >
                  View Installment Packages <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/923250200632?text=${encodeURIComponent('Assalam-o-Alaikum, I want to know about solar installment plans.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('installments_teaser')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 text-white font-jakarta font-bold text-sm hover:bg-white/10 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-xl bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#D97706]" />
                </span>
                <div>
                  <div className="font-jakarta font-bold text-white text-sm">Flexible Payment Plans</div>
                  <div className="font-inter text-xs text-[#94A3B8]">No need to pay the full amount upfront</div>
                </div>
              </div>
              <div className="space-y-2.5">
                {['Low down payment', '12, 24 or 36-month terms', 'Same 3-Year Disaster Security Package'].map(t => (
                  <div key={t} className="flex items-center gap-2 font-inter text-sm text-[#CBD5E1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}