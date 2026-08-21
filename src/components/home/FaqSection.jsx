import * as Accordion from '@radix-ui/react-accordion';
import { Plus, HelpCircle } from 'lucide-react';

// FAQ content intentionally avoids quoting specific prices, net-metering
// tariff rates, or savings percentages — those change and must be confirmed
// by the company before being published. See summary of flagged claims.
const faqs = [
  {
    q: 'What is the difference between on-grid, hybrid, and off-grid solar?',
    a: 'On-grid systems are connected to the national grid and export surplus power (net metering). Hybrid systems add battery storage so you keep using solar power during load-shedding. Off-grid systems are fully independent of the grid — ideal for remote farms and areas with no grid supply.',
  },
  {
    q: 'Will my solar system work during load-shedding?',
    a: 'A standard on-grid system switches off during a power cut for safety. If you need backup during load-shedding, a hybrid system with a battery is the right choice — it keeps your home or business running automatically. Tell us your load requirements and we will size the correct battery for you.',
  },
  {
    q: 'How does net metering work in Pakistan?',
    a: 'With net metering, the surplus power your system generates during the day is exported to the grid and credited on your bill. Regulations and compensation rates follow the latest DISCO rules. Solunar Energy handles the complete net metering application and paperwork with your local DISCO (LESCO, FESCO, etc.) for you.',
  },
  {
    q: 'Which panels and inverters do you install?',
    a: 'We install only Tier-1 equipment: LONGi, JA Solar, and other globally certified Tier-1 panels, paired with Huawei, Deye, Solis, and SMA inverters — trusted brands with proven reliability in Pakistan\'s climate.',
  },
  {
    q: 'What warranty and after-sales support do you provide?',
    a: 'Every Solunar Energy installation is backed by our 3-Year Solar Protection Package. Protection is arranged through our takaful partner and is subject to applicable policy terms, exclusions, limits, and customer contribution/depreciation. The package covers your system against severe weather, hail, fire, and earthquakes. We also offer annual maintenance contracts, performance monitoring, and on-site support after installation.',
  },
  {
    q: 'How do I get a protected solar quote?',
    a: 'Complete the 3-step quote form above or send us a WhatsApp message. Our team will contact you, arrange a free site survey, and design a system sized to your actual electricity usage — complete with the 3-Year Solar Protection Package.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white section-rule relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#1E3A5F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Common Questions</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
            Frequently Asked <span className="text-[#1E3A5F]">Questions</span>
          </h2>
          <p className="font-inter text-[#475569] text-base leading-relaxed">
            Everything you need to know before switching to solar. Still have a question? Contact us on WhatsApp — we're happy to help.
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <Accordion.Item
              key={q}
              value={`item-${i}`}
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

        <div className="mt-10 text-center">
          <a
            href={`https://wa.me/923250200632?text=${encodeURIComponent('Assalam-o-Alaikum, I want a quotation for a solar system with the 3-year protection package.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#1E3A5F] text-[#1E3A5F] font-jakarta font-bold text-sm hover:bg-[#1E3A5F]/5 transition-all duration-300"
          >
            Still have questions? WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
