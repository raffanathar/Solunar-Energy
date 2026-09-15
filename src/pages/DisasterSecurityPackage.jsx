import { Link } from 'react-router-dom';
import { Shield, Flame, Wind, CloudHail, Activity, ArrowRight, HelpCircle, Plus, Zap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import * as Accordion from '@radix-ui/react-accordion';

const coverageItems = [
  {
    icon: Flame,
    title: 'Fire',
    desc: 'Damage to your solar system caused by accidental or external fire is covered, so the cost of repairs or replacement is handled for you.',
  },
  {
    icon: Wind,
    title: 'Storm',
    desc: 'Storm-force winds, flying debris, and heavy rain events that damage panels, inverters, or mounting are covered under the package.',
  },
  {
    icon: CloudHail,
    title: 'Hail',
    desc: 'Hailstones can crack panels and dent mounting structures. Physical damage from hailstorms is covered, including panel replacement.',
  },
  {
    icon: Activity,
    title: 'Earthquake',
    desc: 'Structural damage to your solar installation caused by seismic activity is covered, so your investment stays protected through tremors.',
  },
];

const howItWorks = [
  {
    n: '01',
    title: 'Notify us as soon as damage occurs',
    desc: 'Contact Solunar Energy through WhatsApp, phone, or email within 7 days of damage. Report the incident and share clear photos of the affected equipment.',
  },
  {
    n: '02',
    title: 'We assess and document the claim',
    desc: 'Our team reviews your report, verifies the cause of loss, and arranges a technical assessment of the damaged system.',
  },
  {
    n: '03',
    title: 'Repair or replacement arranged',
    desc: 'Once the claim is approved, we arrange repair or replacement of the covered equipment under the package terms, so your system is restored promptly.',
  },
];

const terms = [
  {
    q: 'Which systems qualify for this package?',
    a: 'The 3-Year Disaster Security Package is included at no extra cost with any Solunar solar installation priced at Rs. 10 lac (1,000,000) or more. Systems below this value are not eligible for this package. Contact us if you\'d like to confirm whether your planned system qualifies.',
  },
  {
    q: 'What is NOT covered?',
    a: 'The package does not cover routine wear and tear, gradual deterioration, damage caused by intentional acts, negligence in maintenance, unauthorized modifications, or pre-existing defects. Systems that are not maintained or serviced per our recommended schedule may not qualify for cover.',
  },
  {
    q: 'Is there any depreciation on claims?',
    a: 'Claims are settled based on the age of the equipment at the time of loss. Over the 3-year period, a modest depreciation schedule applies to the replacement value, which decreases as the system ages. Your exact settlement amount is confirmed at the time of claim.',
  },
  {
    q: 'What documentation do I need to file a claim?',
    a: 'You will need your original purchase/installation invoice, your customer details, a written description of what happened, and clear photos or video of the damaged equipment. Our team helps you prepare every document so the process is as simple as possible.',
  },
  {
    q: 'How long does a claim take to resolve?',
    a: 'We aim to acknowledge every claim within 24-48 hours of receipt. Assessment and resolution time depends on the complexity of the damage, but we make every effort to complete the process as quickly as possible.',
  },
  {
    q: 'Are there any other material terms I should know?',
    a: 'Cover is limited to the equipment installed by Solunar Energy and remains valid for 3 years from the installation date provided the system is maintained and used as intended. Any open changes to the terms are always communicated in writing before they affect your cover.',
  },
];

const faqs = [
  {
    q: 'What happens after 3 years?',
    a: 'After the 3-year period ends, the Disaster Security Package cover for new events stops. We continue to offer annual maintenance contracts and performance monitoring so your system stays healthy long after the protection period.',
  },
  {
    q: 'Is this the same as insurance?',
    a: 'Solunar\'s Disaster Security Package is a protection program arranged for every installation, delivered as part of the 3-year package that comes with your system. It is a genuine third-party-backed protection designed specifically around solar equipment.',
  },
  {
    q: 'How do I file a claim?',
    a: 'Contact us on WhatsApp, phone, or email within 7 days of the damage. Share photos of the affected equipment and a short description of what happened. We guide you through every step of the claim and documentation process.',
  },
  {
    q: 'Does this cover theft?',
    a: 'No. The Disaster Security Package covers physical damage from fire, storm, hail, and earthquake. Theft and vandalism are not part of the cover — speak to our team if you need advice on additional protection.',
  },
  {
    q: 'Is there any depreciation on claims?',
    a: 'Yes, a modest depreciation schedule applies over the 3-year period based on the age of the equipment. Your settlement amount is calculated transparently and confirmed with you at the time of claim.',
  },
  {
    q: 'Does the package include damage to my building structure?',
    a: 'No. Cover is limited to the solar equipment installed by Solunar Energy — panels, inverter, and mounting. Building structure or other property is not covered, but we help you document structural damage separately if it occurs.',
  },
  {
    q: 'How is this coverage structured?',
    a: 'Your Disaster Security Package is facilitated through a Takaful (Shariah-compliant protection) arrangement with a licensed partner. This means your coverage is backed by an independent, regulated protection provider — not just a company promise. Full terms are shared with you at the time of signing.',
  },
];

export default function DisasterSecurityPackage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E3A5F] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 60%, #D97706 0, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706] text-xs font-inter font-semibold uppercase tracking-wider mb-5">
            <Shield className="w-3.5 h-3.5" /> Included With Qualifying Installations
          </span>
          <h1 className="font-jakarta font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            The 3-Year <span className="text-[#D97706]">Disaster Security Package</span>
          </h1>
          <p className="font-inter text-[#CBD5E1] text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Complete protection for your solar investment against fire, storm, hail, and earthquake damage.
          </p>
          <p className="font-inter text-[#94A3B8] text-xs sm:text-sm mt-3 max-w-2xl mx-auto">
            Included with every solar installation of Rs. 10 lac (1,000,000) or more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quote-dsp"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 shadow-xl shadow-[#D97706]/25 hover:scale-[1.02]"
            >
              Get Protected Solar Quote <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/#packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-jakarta font-bold text-sm hover:bg-white/10 transition-all duration-300"
            >
              View Solar Packages
            </Link>
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="py-16 lg:py-24 bg-white section-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
              <Shield className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">What's Covered</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Protection Against <span className="text-[#1E3A5F]">Natural Disasters</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              Four covered perils — each designed to keep your solar investment safe no matter what nature throws at it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coverageItems.map(({ icon: Icon, title, desc }) => (
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

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
              <Zap className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">How It Works</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Simple When You <span className="text-[#1E3A5F]">Need It Most</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              Solunar's Disaster Security Package is genuine, backed protection included with every installation — not a promise on paper. Here's how the process works if damage ever occurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorks.map((s) => (
              <div key={s.n} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 card-hover">
                <span className="inline-flex w-11 h-11 rounded-xl bg-[#1E3A5F] text-white font-jakarta font-extrabold text-sm items-center justify-center mb-4">{s.n}</span>
                <h3 className="font-jakarta font-bold text-[#0F172A] text-base mb-2">{s.title}</h3>
                <p className="font-inter text-sm text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Exclusions */}
      <section className="py-16 lg:py-24 bg-white section-rule">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-[#1E3A5F]" />
              <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Terms & Exclusions</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Clear, Honest <span className="text-[#1E3A5F]">Terms</span>
            </h2>
            <p className="font-inter text-[#475569] text-base leading-relaxed">
              We want you to fully understand your cover before purchasing. Here's what the package includes — and what it doesn't.
            </p>
          </div>

          <Accordion.Root type="single" collapsible className="space-y-3">
            {terms.map(({ q, a }, i) => (
              <Accordion.Item
                key={q}
                value={`term-${i}`}
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
                    <p className="font-inter text-sm text-[#475569] leading-relaxed">{a}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Common Questions</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
              Frequently Asked <span className="text-[#1E3A5F]">Questions</span>
            </h2>
          </div>

          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <Accordion.Item
                key={q}
                value={`faq-${i}`}
                className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden data-[state=open]:border-[#1E3A5F]/40 data-[state=open]:shadow-md data-[state=open]:shadow-[#1E3A5F]/5 transition-all duration-300"
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
                    <p className="font-inter text-sm text-[#475569] leading-relaxed">{a}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="quote-dsp" className="py-16 lg:py-24 bg-white section-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#0F172A] rounded-2xl p-8 sm:p-12">
            <div className="text-center sm:text-left">
              <div className="font-jakarta font-bold text-white text-2xl mb-2">Ready to switch to protected solar?</div>
              <p className="font-inter text-sm text-[#94A3B8]">
                Get a free site survey and a customized quote, complete with the 3-Year Disaster Security Package — no obligation.
              </p>
            </div>
            <a
              href="#quote"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1E3A5F] text-white font-jakarta font-bold text-base hover:bg-[#1E3A5F]/90 transition-all duration-300 shadow-xl shadow-[#1E3A5F]/30 hover:scale-105"
            >
              Get Protected Solar Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}