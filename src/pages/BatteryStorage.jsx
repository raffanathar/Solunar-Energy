import { Link } from 'react-router-dom';
import { Zap, Gauge, Thermometer, BatteryCharging, Activity, SlidersHorizontal, TrendingDown, CloudOff, Sun, ShieldCheck, Repeat, HelpCircle, Plus, ArrowRight, CalendarCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import * as Accordion from '@radix-ui/react-accordion';

const reliabilityItems = [
  {
    icon: Zap,
    title: '10ms Seamless Switching',
    desc: 'Switches between on-grid and off-grid power in 10 milliseconds — fast enough that connected equipment never notices the transition.',
  },
  {
    icon: BatteryCharging,
    title: '100% Usable Capacity',
    desc: 'Full depth of discharge means you get everything you paid for out of every charge cycle — no wasted capacity sitting unused.',
  },
  {
    icon: Thermometer,
    title: 'Liquid-Cooled Stability',
    desc: 'Active liquid cooling holds battery temperature to within roughly 2°C across the unit\u2019s operating life, protecting performance and lifespan.',
  },
  {
    icon: Gauge,
    title: 'Zero Power Loss',
    desc: 'Efficient temperature and frequency control keeps the system operating without power loss, even under continuous industrial load.',
  },
];

const useCases = [
  {
    icon: SlidersHorizontal,
    title: 'Demand Control',
    desc: 'Automatically manage peak electricity demand to avoid costly demand charges.',
  },
  {
    icon: TrendingDown,
    title: 'Peak Shaving',
    desc: 'Draw from stored battery power during expensive peak-rate hours instead of the grid.',
  },
  {
    icon: CloudOff,
    title: '0-Export Control',
    desc: 'Keep excess solar generation on-site instead of exporting it, where regulations require it.',
  },
  {
    icon: Sun,
    title: 'Self-Consumption',
    desc: 'Maximize use of your own solar generation before ever pulling from the grid.',
  },
  {
    icon: ShieldCheck,
    title: 'Backup Power',
    desc: 'Keep critical systems — vaults, servers, production lines — running through outages.',
  },
  {
    icon: Repeat,
    title: 'Peak-Valley Energy Arbitrage',
    desc: 'Charge during low-cost off-peak hours, discharge during high-cost peak hours.',
  },
];

const howItWorks = [
  {
    n: '01',
    title: 'Configure From The Touchscreen',
    desc: 'The built-in EMS (Energy Management System) is configured directly from the unit\u2019s touchscreen — no separate software or technician visit needed for routine settings changes.',
  },
  {
    n: '02',
    title: 'Monitored Remotely, Around the Clock',
    desc: 'Operating data is transmitted to the cloud, so performance can be tracked and issues flagged before they become downtime.',
  },
  {
    n: '03',
    title: 'Compartmentalized Safety',
    desc: 'Each battery compartment is isolated with its own preventive alarm system, containing any issue before it can spread.',
  },
];

const specRows = [
  { label: 'Usable Capacity', value: '[XX] kWh' },
  { label: 'Rated Power Output', value: '[XX] kW' },
  { label: 'Depth of Discharge', value: '100%' },
  { label: 'Round-Trip Efficiency', value: '[XX]%' },
  { label: 'Switching Time (on/off-grid)', value: '10 ms' },
  { label: 'Cooling Type', value: 'Liquid-cooled' },
  { label: 'Warranty', value: '[X] years' },
  { label: 'Cycle Life', value: '[XX,000] cycles' },
];

const faqs = [
  {
    q: 'What is a Battery Energy Storage System (BESS)?',
    a: 'A BESS stores electricity — from solar or the grid — so it can be used later, whether that\u2019s during a power cut, during expensive peak-rate hours, or to reduce how much power you draw from the grid at any given time.',
  },
  {
    q: 'Can this be added to an existing solar installation?',
    a: 'Yes. The system integrates with new or existing solar setups and can also operate independently of solar where backup power or grid arbitrage is the main goal.',
  },
  {
    q: 'Does this work during a total grid outage?',
    a: 'Yes — the system supplies stable power in both on-grid and off-grid modes, switching automatically in milliseconds.',
  },
  {
    q: 'What maintenance does it require?',
    a: '[Placeholder — confirm maintenance schedule/requirements before publishing]',
    placeholder: true,
  },
  {
    q: 'How long does installation take?',
    a: '[Placeholder — confirm typical install timeline before publishing]',
    placeholder: true,
  },
  {
    q: 'Is financing available for commercial/industrial BESS installations?',
    a: '[Placeholder — confirm before publishing whether the existing installment plan terms apply to BESS or if separate commercial financing terms exist]',
    placeholder: true,
  },
];

function PlaceholderTag() {
  return (
    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-[#FEF9C3] border border-[#FDE68A] text-[10px] font-jakarta font-semibold uppercase tracking-wider text-[#92400E]">
      Placeholder
    </span>
  );
}

export default function BatteryStorage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E3A5F] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 60%, #D97706 0, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-inter font-semibold uppercase tracking-wider mb-5">
            <BatteryCharging className="w-3.5 h-3.5" /> Commercial & Industrial Solution
          </span>
          <h1 className="font-jakarta font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Power That Doesn&apos;t Wait <span className="text-[#D97706]">For The Grid</span>
          </h1>
          <p className="font-inter text-[#CBD5E1] text-sm sm:text-base mt-3 max-w-3xl mx-auto">
            Battery storage engineered for factories, banks, and commercial sites that can&apos;t afford downtime or wasted energy — store it, shave peak costs, and keep critical operations running when the grid can&apos;t.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote-bess"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-xl shadow-[#D97706]/25 hover:scale-[1.02]"
            >
              Get BESS Quote <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/battery-storage#use-cases"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-jakarta font-bold text-sm hover:bg-white/10 transition-all duration-300"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Built For Reliability */}
      <section className="py-16 lg:py-24 bg-white section-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
              <Activity className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Engineered Dependability</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Built For Reliability, <span className="text-[#1E3A5F]">Not Just Capacity</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              Every claim below reflects the engineering inside the unit — not a spec sheet promise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reliabilityItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#1E3A5F]/30 hover:bg-white transition-all duration-500">
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

      {/* One System, Every Use Case */}
      <section id="use-cases" className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
              <Zap className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Use Cases</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              One System, <span className="text-[#1E3A5F]">Every Use Case</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              Whether you&apos;re running a factory floor or a bank branch, the same unit adapts to how you use power.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#D97706]/10 border border-[#D97706]/20 flex items-center justify-center group-hover:bg-[#D97706]/20 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-[#D97706]" />
                  </span>
                  <h3 className="font-jakarta font-bold text-[#0F172A] text-base">{title}</h3>
                </div>
                <p className="font-inter text-sm text-[#475569] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple to Run, Easy to Trust */}
      <section className="py-16 lg:py-24 bg-white section-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
              <Activity className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">How It Works</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Simple to Run, <span className="text-[#1E3A5F]">Easy to Trust</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              A commercial battery system should be set-and-forget reliable. Here&apos;s how this one manages itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorks.map((s) => (
              <div key={s.n} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 card-hover">
                <span className="inline-flex w-11 h-11 rounded-xl bg-[#1E3A5F] text-white font-jakarta font-extrabold text-sm items-center justify-center mb-4">{s.n}</span>
                <h3 className="font-jakarta font-bold text-[#0F172A] text-base mb-2">{s.title}</h3>
                <p className="font-inter text-sm text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
              <Activity className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Specifications</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Technical <span className="text-[#1E3A5F]">Specifications</span>
            </h2>
          </div>

          <div className="mb-6 rounded-xl bg-[#FEF9C3] border border-dashed border-[#F59E0B]/60 px-4 sm:px-6 py-3 text-center">
            <span className="font-inter text-xs sm:text-sm text-[#92400E] leading-relaxed">
              <span className="font-jakarta font-bold">*</span> Specifications below are placeholders pending final confirmation.
            </span>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="px-6 py-4 font-jakarta font-bold text-xs uppercase tracking-wider text-[#1E3A5F]">Spec</th>
                  <th className="px-6 py-4 font-jakarta font-bold text-xs uppercase tracking-wider text-[#1E3A5F]">Value</th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => {
                  const isPlaceholder = row.value.includes('[');
                  return (
                    <tr key={row.label} className={`${i % 2 === 0 ? 'bg-[#FAFBFC]' : 'bg-white'} ${isPlaceholder ? '' : ''}`}>
                      <td className="px-6 py-4 font-inter text-sm text-[#475569] border-b border-[#F1F5F9]">{row.label}</td>
                      <td className={`px-6 py-4 border-b border-[#F1F5F9] ${isPlaceholder ? 'bg-[#FEF9C3]' : ''}`}>
                        <span className={`font-jakarta font-bold text-sm ${isPlaceholder ? 'text-[#92400E]' : 'text-[#0F172A]'}`}>
                          {row.value}
                          {isPlaceholder && <PlaceholderTag />}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white section-rule">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Common Questions</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Frequently Asked <span className="text-[#1E3A5F]">Questions</span>
            </h2>
          </div>

          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map(({ q, a, placeholder }, i) => (
              <Accordion.Item
                key={q}
                value={`faq-${i}`}
                className="group bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden data-[state=open]:border-[#1E3A5F]/40 data-[state=open]:shadow-md data-[state=open]:shadow-[#1E3A5F]/5 transition-all duration-300"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-jakarta font-bold text-[#0F172A] text-base">{q}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-[#1E3A5F] group-data-[state=open]:text-white">
                      <Plus className="w-4 h-4" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  <div className="px-6 pb-6">
                    {placeholder ? (
                      <p className="font-inter text-sm text-[#92400E] leading-relaxed bg-[#FEF9C3] border border-dashed border-[#F59E0B]/60 rounded-lg px-3 py-2.5">
                        {a}
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-white border border-[#FDE68A] text-[10px] font-jakarta font-semibold uppercase tracking-wider text-[#92400E]">
                          Placeholder
                        </span>
                      </p>
                    ) : (
                      <p className="font-inter text-sm text-[#475569] leading-relaxed">{a}</p>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="quote-bess" className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#0F172A] rounded-2xl p-8 sm:p-12">
            <div className="text-center sm:text-left">
              <div className="font-jakarta font-bold text-white text-2xl mb-2">Ready to Stop Losing Money to the Grid?</div>
              <p className="font-inter text-sm text-[#94A3B8]">
                Get a free site survey and a customized BESS quote for your facility — no obligation.
              </p>
            </div>
            <a
              href={`https://wa.me/923250200632?text=${encodeURIComponent('Hi! I want a BESS (Battery Energy Storage System) quote for my facility.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-xl shadow-[#D97706]/25 hover:scale-105"
            >
              <CalendarCheck className="w-4 h-4" /> Get BESS Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}