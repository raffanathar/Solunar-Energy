const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Loader2, MessageCircle, CreditCard, ArrowRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';
import { defaultPackages } from '@/lib/package-data';

// Verified component pricing (Rs). Inverter + battery prices. Values flag
// null/absent as "not yet priced".
const COMPONENT_PRICES = {
  inverters: {
    '4kW': 75000,
    '6kW_IP21': 130000,
    '6kW_IP65': 215000,
    '8kW': 315000,
    '10kW_IP21': 210000,
    '10kW_IP65': 370000,
    '12kW': 525000,
    '15kW': 670000,
    '20kW': 870000,
  },
  batteries: {
    '2.5kW': 130000,
    '5kW': 230000,
    '7.5kW': 330000,
    '15kW': 580000,
    '30kW': 1160000,
    '45kW': 1740000,
    // '22kW' NOT AVAILABLE — disable wherever it appears, never add here. '45kW' is the max priced battery.
  },
};

// Exact client-confirmed totals for 3kW, 6kW, 8kW. NO earthing, NO mounting on
// these tiers. Lookup key = "{inverterKey}|{batteryKey}".
const FIXED_TIER_TOTALS = {
  '3kW': {
    '4kW|5kW': 497000,
  },
  '6kW': {
    '6kW_IP21|5kW': 820000,
    '6kW_IP21|7.5kW': 920000,
    '6kW_IP65|5kW': 905000,
    '6kW_IP65|7.5kW': 1005000,
  },
  '8kW': {
    '8kW|5kW': 1155000,
    '8kW|7.5kW': 1257000,
    '8kW|15kW': 1510000,
  },
};

// Base cost = panels + electrical + installation, EXCLUDING inverter, battery,
// earthing, mounting. Only 10kW+ tiers use the derived formula.
const BASE_SYSTEM_COST = {
  '10kW': 715000,
  '12kW': 900000,
  '15kW': 1140000,  // ESTIMATE — extrapolated, not directly client-confirmed
  '20kW': 1520000,  // ESTIMATE — extrapolated, not directly client-confirmed
};

// Flat earthing/SPD cost — applies ONLY to 10kW/12kW/15kW/20kW tiers.
const EARTHING_FLAT = 50000;

// Mounting/elevated structure cost — applies ONLY to 10kW+ tiers.
// Per-panel rate = frame (₹10,950 / 2 panels) + civil blocks (₹1,650 × 2) + Z-clamps (₹950 × 2) = ₹10,675/panel.
const MOUNTING_PER_PANEL = 10675;
const PANEL_COUNT = {
  '10kW': 14,
  '12kW': 18,
  '15kW': 22,
  '20kW': 28,
};

// TODO: CONFIRM — the defaultPackages below contain estimated monthly unit outputs,
// load-coverage percentages, and component lists that are NOT verified against real
// pricing/engineering data. They are fallbacks shown only when no SolarPackage records
// exist in the CMS. Confirm/update each figure before publishing.
function getBatteryOptions(pkg) {
  const line = pkg.components?.find(c => typeof c === 'string' && c.includes('Lithium Battery'));
  if (!line) return [];
  return line.replace(' Lithium Battery', '').split('/').map(s => s.trim()).filter(Boolean);
}

function getInverterSpecs(pkg) {
  const line = pkg.components?.find(c => typeof c === 'string' && c.includes('Inverter'));
  if (!line) return [];
  const sizeMatch = line.match(/(\d+(?:\.\d+)?)kW/);
  if (!sizeMatch) return [];
  const size = `${sizeMatch[1]}kW`;
  if (line.includes('IP21/IP65')) {
    return [
      { key: `${size}_IP21`, label: 'IP21' },
      { key: `${size}_IP65`, label: 'IP65' },
    ];
  }
  return [{ key: size, label: null }];
}

function normalizeTier(systemSize) {
  if (!systemSize) return null;
  const m = String(systemSize).replace(/\s+/g, '').match(/(\d+)/);
  return m ? `${m[1]}kW` : null;
}

function getEstimatedPrice(tier, selectedInverterKey, selectedBatteryKey) {
  if (!tier || !selectedInverterKey || !selectedBatteryKey) return null;
  if (FIXED_TIER_TOTALS[tier]) {
    const key = `${selectedInverterKey}|${selectedBatteryKey}`;
    return FIXED_TIER_TOTALS[tier][key] ?? null;
  }
  const base = BASE_SYSTEM_COST[tier];
  const inv = COMPONENT_PRICES.inverters[selectedInverterKey];
  const bat = COMPONENT_PRICES.batteries[selectedBatteryKey];
  if (typeof base !== 'number' || typeof inv !== 'number' || typeof bat !== 'number') return null;
  const mounting = PANEL_COUNT[tier] * MOUNTING_PER_PANEL;
  return base + inv + bat + EARTHING_FLAT + mounting;
}

function isBatteryEnabled(tier, inverterKey, batteryKey) {
  if (FIXED_TIER_TOTALS[tier]) {
    return FIXED_TIER_TOTALS[tier][`${inverterKey}|${batteryKey}`] != null;
  }
  return COMPONENT_PRICES.batteries[batteryKey] != null;
}

function PackageCard({ pkg }) {
  const batteryOptions = getBatteryOptions(pkg);
  const inverterSpecs = getInverterSpecs(pkg);
  const multiBattery = batteryOptions.length > 1;
  const multiInverter = inverterSpecs.length > 1;

  const tier = normalizeTier(pkg.systemSize);
  const [inverterIndex, setInverterIndex] = useState(0);
  const inverterKey = inverterSpecs[inverterIndex] ? inverterSpecs[inverterIndex].key : null;

  const enabledBatteries = batteryOptions.filter(o => isBatteryEnabled(tier, inverterKey, o));
  const [battery, setBattery] = useState(enabledBatteries[0] || null);

  const liveTotal = getEstimatedPrice(tier, inverterKey, battery);

  const batteryDetail = battery ? ` with a ${battery} lithium battery` : '';
  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in the ${pkg.name} (${pkg.systemSize}) solar package${batteryDetail}. Please share the latest price.`);

  const componentFilter = c =>
    typeof c !== 'string' ||
    !(
      (multiInverter && c.includes('Inverter')) ||
      (multiBattery && c.includes('Lithium Battery'))
    );

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
                onClick={() => setInverterIndex(i)}
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

      <div className="space-y-2">
        <div className="w-full py-2.5 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
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
        <a
          href={`https://wa.me/923250200632?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`package_${pkg.name}`)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D97706] text-white font-jakarta font-bold text-sm hover:bg-[#D97706]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#D97706]/25"
        >
          <MessageCircle className="w-4 h-4" />
          Get Quote
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

        {/* Installments banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#EA580C]/8 border border-[#EA580C]/25 rounded-2xl p-5 sm:p-6 mb-10">
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EA580C]/15 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#EA580C]" />
            </span>
            <div>
              <div className="font-jakarta font-bold text-[#0F172A] text-sm sm:text-base mb-1">
                Every package — just 20% down
              </div>
              <div className="font-inter text-xs sm:text-sm text-[#475569] leading-relaxed">
                No matter which package you choose, you pay only a 20% downpayment. Then pick a 1-year or 2-year plan to spread the remaining balance — your monthly installment depends on the plan you select.
              </div>
            </div>
          </div>
          <Link
            to="/installments"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#EA580C] text-white font-jakarta font-semibold text-sm hover:bg-[#EA580C]/90 transition-all duration-300 shadow-md shadow-[#EA580C]/20 whitespace-nowrap"
          >
            Learn More About Installments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pricing disclaimer banner */}
        <div className="mb-8 rounded-xl bg-[#0A1F44] px-4 sm:px-6 py-3 text-center">
          <span className="font-inter text-xs sm:text-sm text-white leading-relaxed">
            <span className="text-[#D4AF37] font-jakarta font-bold">*</span> All prices shown are tentative estimates and subject to change without notice. Final pricing confirmed at time of site survey and quote.
          </span>
        </div>

        {/* BESS teaser banner */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#1E3A5F]/25 bg-[#1E3A5F]/5 px-4 sm:px-6 py-3">
          <span className="font-inter text-xs sm:text-sm text-[#1E3A5F] text-center sm:text-left leading-relaxed">
            Running an industrial site or commercial building?{' '}
            <Link to="/battery-storage" className="font-jakarta font-bold text-[#D97706] hover:underline">
              Explore our Battery Storage solutions &rarr;
            </Link>
          </span>
          <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D97706] text-white text-[10px] font-jakarta font-bold uppercase tracking-wider">
            New
          </span>
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