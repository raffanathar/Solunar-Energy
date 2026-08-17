const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Sun, Loader2, MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

// TODO: CONFIRM — the defaultPackages below contain estimated monthly unit outputs,
// load-coverage percentages, and component lists that are NOT verified against real
// pricing/engineering data. They are fallbacks shown only when no SolarPackage records
// exist in the CMS. Confirm/update each figure before publishing.
const defaultPackages = [
  {
    id: 'p1', name: '3kW Home Starter', systemSize: '3 kW', bestFor: 'Small Homes & Apartments',
    monthlyUnits: '360–420 units/month', coveragePercent: 60,
    components: ['6 × 500W Mono Panels', 'Deye 3kW Hybrid Inverter', '100Ah Lithium Battery', 'Net Meter Ready'],
  },
  {
    id: 'p2', name: '5kW Home Premium', systemSize: '5 kW', bestFor: 'Medium Homes',
    monthlyUnits: '600–720 units/month', coveragePercent: 80,
    components: ['10 × 500W Mono Panels', 'Solis 5kW On-Grid Inverter', 'Complete Mounting Structure', 'Net Meter & Monitoring'],
    highlight: true,
  },
  {
    id: 'p3', name: '10kW Commercial', systemSize: '10 kW', bestFor: 'Offices & Shops',
    monthlyUnits: '1,200–1,400 units/month', coveragePercent: 90,
    components: ['20 × 500W Bifacial Panels', 'Huawei 10kW Inverter', 'Professional Mounting', 'Remote Monitoring System'],
  },
  {
    id: 'p4', name: '15kW Business', systemSize: '15 kW', bestFor: 'Factories & Large Offices',
    monthlyUnits: '1,800–2,100 units/month', coveragePercent: 95,
    components: ['30 × 500W Bifacial Panels', '15kW 3-Phase Inverter', 'Steel Mounting Structure', 'SCADA Monitoring'],
  },
  {
    id: 'p5', name: 'Custom Industrial', systemSize: 'Custom', bestFor: 'Factories, Farms & Large Industries',
    monthlyUnits: 'Based on load analysis', coveragePercent: 100,
    components: ['Tier-1 Panels (LONGi/JA Solar)', 'Industrial Grade Inverters', 'Custom Engineering Design', 'Full Project Management'],
  },
];

function PackageCard({ pkg }) {
  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in the ${pkg.name} (${pkg.systemSize}) solar package. Please share the latest price.`);

  return (
    <div className={`relative group bg-white rounded-2xl border-2 p-6 card-hover flex flex-col ${
      pkg.highlight
        ? 'border-[#1E3A5F] shadow-xl shadow-[#1E3A5F]/10'
        : 'border-[#E2E8F0]'
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
        <div className="text-xs font-inter font-semibold text-[#475569] uppercase tracking-wider mb-1">Monthly Generation</div>
        <div className="font-jakarta font-bold text-sm text-[#D97706]">{pkg.monthlyUnits}</div>
      </div>

      <ul className="space-y-2 mb-6 flex-1">
        {pkg.components.map((c, i) => (
          <li key={i} className="flex items-center gap-2 text-sm font-inter text-[#475569]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] flex-shrink-0" />
            {c}
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <div className="w-full text-center py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-inter text-[#475569] italic">
          Contact for latest price
        </div>
        <a
          href={`https://wa.me/923250200632?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`package_${pkg.name}`)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#D97706]/25"
        >
          <MessageCircle className="w-4 h-4" />
          Get Price
        </a>
      </div>
    </div>
  );
}

export default function PackagesSection() {
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
    <section id="packages" className="py-24 lg:py-32 bg-white section-rule relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D97706]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 mb-6">
            <Sun className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="font-inter text-xs font-semibold text-[#D97706] tracking-wider uppercase">Solar Packages</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
            Choose Your <span className="text-[#1E3A5F]">Solar System</span>
          </h2>
          <p className="font-inter text-[#475569] text-base leading-relaxed">
            Transparent packages designed for every budget and need. Prices vary — contact us for the latest quote tailored to your exact requirements.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#1E3A5F] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {display.map(p => <PackageCard key={p.id} pkg={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}