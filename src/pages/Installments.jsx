const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { defaultPackages } from '@/lib/package-data';
import {
  getBatteryOptions,
  getInverterSpecs,
  normalizeTier,
  getEstimatedPrice,
  isBatteryEnabled,
  calculateInstallment,
} from '@/lib/package-pricing';
import { trackWhatsAppClick } from '@/lib/analytics';
import { Loader2, Sun, MessageCircle, CreditCard, CalendarClock, BadgeCheck, ArrowRight, Shield, Wallet } from 'lucide-react';

const termOptions = [
  { months: 12, label: '1 Year' },
  { months: 24, label: '2 Years' },
];

const benefits = [
  { icon: Wallet, title: 'Just 20% Down', desc: 'No matter which package you choose, you pay only a 20% downpayment to get started.' },
  { icon: CalendarClock, title: '1-Year or 2-Year Plans', desc: 'Pick the plan that fits your budget — spread the remaining balance over 1 or 2 years.' },
  { icon: BadgeCheck, title: 'Same Packages, Same Quality', desc: 'Get Tier-1 panels and certified inverters with the same 3-Year Disaster Security Package.' },
  { icon: Shield, title: 'Backed by Protection', desc: 'Every installment package still includes our 3-Year Disaster Security Package covering fire, storm, hail, and earthquakes.' },
];

const steps = [
  { n: '01', title: 'Pay 20% down', desc: 'Every package starts with a fixed 20% downpayment — no matter which system you choose.' },
  { n: '02', title: 'Pick your plan', desc: 'Spread the remaining balance over a 1-year or 2-year plan, based on what fits your budget.' },
  { n: '03', title: 'Pay monthly', desc: 'Your monthly installment depends on the package and the plan you choose.' },
];

export default function Installments() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.SolarPackage.list('order', 10)
      .then(data => {
        setPackages(data.length > 0 ? data.filter(p => p.isActive !== false) : defaultPackages);
      })
      .catch(() => setPackages(defaultPackages))
      .finally(() => setLoading(false));
  }, []);

  const display = packages.length > 0 ? packages : defaultPackages;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E3A5F] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 60%, #D97706 0, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-inter font-semibold uppercase tracking-wider mb-4">
            <CreditCard className="w-3.5 h-3.5" /> Easy Installments
          </span>
          <h1 className="font-jakarta font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Solar on <span className="text-[#D97706]">Easy Monthly Payments</span>
          </h1>
          <p className="font-inter text-[#CBD5E1] text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Switch to solar with just a 20% downpayment. No matter which package you choose, spread the rest over a 1-year or 2-year plan.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/923250200632?text=${encodeURIComponent('Assalam-o-Alaikum, I want to know about solar installment plans.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('installments_hero')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-xl shadow-[#D97706]/25 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" /> Get Installment Details
            </a>
            <Link
              to="/#packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-jakarta font-bold text-sm hover:bg-white/10 transition-all duration-300"
            >
              View All Solar Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-16 lg:py-20 bg-white section-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-3xl lg:text-4xl tracking-tight mb-4">
              Why Pay <span className="text-[#1E3A5F]">Everything Upfront?</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              Installments make solar affordable for homes and businesses. Same systems, same quality — just a payment plan that works for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#1E3A5F]/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 border border-[#D97706]/20 flex items-center justify-center mb-5 group-hover:bg-[#D97706]/20 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-[#D97706]" />
                </div>
                <h3 className="font-jakarta font-bold text-[#0F172A] text-base mb-3">{title}</h3>
                <p className="font-inter text-sm text-[#475569] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-3xl lg:text-4xl tracking-tight mb-4">
              How It <span className="text-[#1E3A5F]">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className="relative bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-11 h-11 rounded-xl bg-[#1E3A5F] text-white font-jakarta font-extrabold text-sm flex items-center justify-center">{s.n}</span>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-[#94A3B8]" />
                  )}
                </div>
                <h3 className="font-jakarta font-bold text-[#0F172A] text-base mb-2">{s.title}</h3>
                <p className="font-inter text-sm text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installment packages */}
      <section className="py-16 lg:py-24 bg-white section-rule relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D97706]/6 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
              <Sun className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Installment Packages</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Choose Your System, <span className="text-[#1E3A5F]">Pay Monthly</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              Pay 20% down on any package, then choose a 1-year or 2-year plan. Your monthly installment depends on the package and plan you pick.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#1E3A5F] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {display.map(p => (
                <InstallmentCard key={p.id} pkg={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-jakarta font-bold text-white text-xl mb-2">Ready to switch to solar?</h3>
              <p className="font-inter text-sm text-[#94A3B8]">Get a free site survey and a personalized installment plan — no obligation.</p>
            </div>
            <a
              href={`https://wa.me/923250200632?text=${encodeURIComponent('Assalam-o-Alaikum, I want a quote for a solar system with easy installments.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('installments_cta')}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D97706] text-white font-jakarta font-semibold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-lg shadow-[#D97706]/25"
            >
              <MessageCircle className="w-4 h-4" /> Get Installment Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function InstallmentCard({ pkg }) {
  const batteryOptions = getBatteryOptions(pkg);
  const inverterSpecs = getInverterSpecs(pkg);
  const multiBattery = batteryOptions.length > 1;
  const multiInverter = inverterSpecs.length > 1;

  const tier = normalizeTier(pkg.systemSize, pkg.name);
  const isCustom = !tier || pkg.systemSize === 'Custom';

  const [inverterIndex, setInverterIndex] = useState(0);
  const inverterKey = inverterSpecs[inverterIndex] ? inverterSpecs[inverterIndex].key : null;

  const enabledBatteries = batteryOptions.filter(o => isBatteryEnabled(tier, inverterKey, o));
  const [battery, setBattery] = useState(enabledBatteries[0] || null);

  const handleInverterChange = (i) => {
    setInverterIndex(i);
    const newInvKey = inverterSpecs[i]?.key;
    if (tier && !isBatteryEnabled(tier, newInvKey, battery)) {
      const nextBattery = batteryOptions.find(o => isBatteryEnabled(tier, newInvKey, o));
      if (nextBattery) setBattery(nextBattery);
    }
  };

  const liveTotal = getEstimatedPrice(tier, inverterKey, battery);

  const [term, setTerm] = useState(12);
  const planYears = term === 24 ? 2 : 1;
  const installment = (!isCustom && liveTotal !== null)
    ? calculateInstallment(liveTotal, planYears)
    : null;

  const batteryDetail = battery ? ` with a ${battery} lithium battery` : '';
  const installmentDetail = installment
    ? ` on a ${term === 24 ? '2-Year' : '1-Year'} installment plan (Rs. ${installment.downPayment.toLocaleString()} down, Rs. ${installment.monthlyInstallment.toLocaleString()}/month)`
    : '';
  const whatsappMsg = encodeURIComponent(
    `Assalam-o-Alaikum, I'm interested in the ${pkg.name} (${pkg.systemSize}) solar package${batteryDetail}${installmentDetail}. Please share more details.`
  );

  const componentFilter = c =>
    typeof c !== 'string' ||
    !(
      (multiInverter && c.includes('Inverter')) ||
      (multiBattery && c.includes('Lithium Battery'))
    );

  return (
    <div className={`relative group bg-white rounded-2xl border-2 p-6 card-hover flex flex-col ${
      pkg.highlight ? 'border-[#1E3A5F] shadow-xl shadow-[#1E3A5F]/10' : 'border-[#E2E8F0]'
    }`}>
      {pkg.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-[#1E3A5F] text-white text-xs font-jakarta font-bold shadow-md whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-jakarta font-extrabold text-3xl text-[#0F172A] mb-1">{pkg.systemSize}</div>
          <div className="font-jakarta font-bold text-base text-[#1E3A5F]">{pkg.name}</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 flex items-center justify-center">
          <Sun className="w-6 h-6 text-[#D97706]" />
        </div>
      </div>

      <div className="text-xs font-inter font-semibold text-[#475569] uppercase tracking-wider mb-2">Best For</div>
      <div className="font-inter text-sm text-[#0F172A] font-medium mb-4">{pkg.bestFor}</div>

      {/* Power Gauge */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-inter text-xs text-[#475569]">Load Coverage</span>
          <span className="font-jakarta font-bold text-xs text-[#1E3A5F]">{pkg.coveragePercent}%</span>
        </div>
        <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#D97706] rounded-full transition-all duration-1000"
            style={{ width: `${pkg.coveragePercent}%` }}
          />
        </div>
      </div>

      <div className="mb-5 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
        <div className="text-xs font-inter font-semibold text-[#475569] uppercase tracking-wider mb-1">Unit Consumption</div>
        <div className="font-jakarta font-bold text-sm text-[#D97706]">{pkg.monthlyUnits}</div>
      </div>

      <ul className="space-y-2 mb-4 flex-1">
        {pkg.components.filter(componentFilter).map((c, i) => (
          <li key={i} className="flex items-center gap-2 text-sm font-inter text-[#475569]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] flex-shrink-0" />
            {c}
          </li>
        ))}
      </ul>

      {multiInverter && (
        <div className="mb-4">
          <div className="text-xs font-inter font-semibold text-[#475569] uppercase tracking-wider mb-2">Inverter</div>
          <div className="flex flex-wrap gap-1.5">
            {inverterSpecs.map((spec, i) => (
              <button
                key={spec.key}
                type="button"
                onClick={() => handleInverterChange(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-jakarta font-semibold border transition-all duration-300 ${
                  inverterIndex === i
                    ? 'bg-[#D97706] border-[#D97706] text-white shadow-md shadow-[#D97706]/25'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#D97706]/50 hover:text-[#1E3A5F]'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {multiBattery && (
        <div className="mb-4">
          <div className="text-xs font-inter font-semibold text-[#475569] uppercase tracking-wider mb-2">Battery Size</div>
          <div className="flex flex-wrap gap-1.5">
            {batteryOptions.map(opt => {
              const hasPrice = isBatteryEnabled(tier, inverterKey, opt);
              return hasPrice ? (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBattery(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-jakarta font-semibold border transition-all duration-300 ${
                    battery === opt
                      ? 'bg-[#D97706] border-[#D97706] text-white shadow-md shadow-[#D97706]/25'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#D97706]/50 hover:text-[#1E3A5F]'
                  }`}
                >
                  {opt}
                </button>
              ) : (
                <span
                  key={opt}
                  title="Price pending — contact us"
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-jakarta font-semibold border bg-[#F1F5F9] border-[#E2E8F0] text-[#94A3B8] opacity-60 cursor-not-allowed select-none"
                >
                  {opt}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Main price display */}
      <div className="w-full py-2.5 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
        <div className="font-jakarta font-bold text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0A1F44] mb-0.5">
          Estimated Total System Price
        </div>
        {liveTotal !== null ? (
          <>
            <div className="font-jakarta font-extrabold text-xl text-[#D4AF37]">Rs. {liveTotal.toLocaleString()}*</div>
            <div className="font-inter text-[10px] leading-snug text-[#64748B] mt-0.5">
              *Tentative estimate. Subject to change; final price confirmed after free site survey.
            </div>
          </>
        ) : (
          <div className="font-inter text-xs font-medium italic text-[#475569] py-1">Contact for latest price</div>
        )}
      </div>

      {/* Installment term selector (hidden for custom card) */}
      {!isCustom && liveTotal !== null && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-inter text-xs text-[#475569]">Installment Plan</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {termOptions.map(t => (
              <button
                key={t.months}
                type="button"
                onClick={() => setTerm(t.months)}
                className={`py-2 rounded-lg border text-xs font-inter font-semibold transition-all duration-200 ${
                  term === t.months
                    ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                    : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#1E3A5F]/40'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Installment summary */}
      {installment ? (
        <div className="installment-summary mb-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
          <span className="installment-line block font-jakarta font-bold text-xs sm:text-sm text-[#0A1F44]">
            Rs. {installment.downPayment.toLocaleString()} down — then Rs. {installment.monthlyInstallment.toLocaleString()}/month
          </span>
          <span className="installment-disclaimer block font-inter text-[10px] leading-snug text-[#64748B] mt-1">
            *Based on tentative estimated system price. Subject to change; final plan confirmed after site survey.
          </span>
        </div>
      ) : (
        <div className="installment-summary mb-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
          <span className="installment-line block font-jakarta font-bold text-xs sm:text-sm text-[#0A1F44]">
            Contact for Custom Installment Plan
          </span>
        </div>
      )}

      <a
        href={`https://wa.me/923250200632?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(`installment_${pkg.name}`)}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#D97706]/25"
      >
        <MessageCircle className="w-4 h-4" />
        Get Installment Plan
      </a>
    </div>
  );
}