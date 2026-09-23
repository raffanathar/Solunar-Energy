// Shared solar package pricing constants and calculation functions.
// Single source of truth for both PackagesSection and Installments pages.

// Verified component pricing (Rs). Inverter + battery prices. Values flag
// null/absent as "not yet priced".
export const COMPONENT_PRICES = {
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
export const FIXED_TIER_TOTALS = {
  '3kW_basic': {
    '4kW|none': 291960,
  },
  '3kW': {
    '4kW|5kW': 499000,
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
export const BASE_SYSTEM_COST = {
  '10kW': 725000,
  '12kW': 900000,
  '15kW': 1140000, // ESTIMATE — extrapolated, not directly client-confirmed
  '20kW': 1520000, // ESTIMATE — extrapolated, not directly client-confirmed
};

// Flat earthing/SPD cost — applies ONLY to 10kW/12kW/15kW/20kW tiers.
export const EARTHING_FLAT = 50000;

// Mounting/elevated structure cost — applies ONLY to 10kW+ tiers.
// Per-panel rate = frame (Rs. 10,950 / 2 panels) + civil blocks (Rs. 1,650 × 2) + Z-clamps (Rs. 950 × 2) = Rs. 10,675/panel.
export const MOUNTING_PER_PANEL = 10675;
export const PANEL_COUNT = {
  '10kW': 14,
  '12kW': 18,
  '15kW': 22,
  '20kW': 28,
};

export function getBatteryOptions(pkg) {
  const line = pkg.components?.find(c => typeof c === 'string' && c.includes('Lithium Battery'));
  if (!line) return [];
  return line.replace(' Lithium Battery', '').split('/').map(s => s.trim()).filter(Boolean);
}

export function getInverterSpecs(pkg) {
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

export function normalizeTier(systemSize, pkgName) {
  if (!systemSize) return null;
  if (pkgName === '3kW Basic') return '3kW_basic';
  const m = String(systemSize).replace(/\s+/g, '').match(/(\d+)/);
  return m ? `${m[1]}kW` : null;
}

export function getEstimatedPrice(tier, selectedInverterKey, selectedBatteryKey) {
  if (!tier || !selectedInverterKey) return null;
  const batKey = selectedBatteryKey || 'none';
  if (FIXED_TIER_TOTALS[tier]) {
    const key = `${selectedInverterKey}|${batKey}`;
    return FIXED_TIER_TOTALS[tier][key] ?? null;
  }
  if (!selectedBatteryKey) return null;
  const base = BASE_SYSTEM_COST[tier];
  const inv = COMPONENT_PRICES.inverters[selectedInverterKey];
  const bat = COMPONENT_PRICES.batteries[selectedBatteryKey];
  if (typeof base !== 'number' || typeof inv !== 'number' || typeof bat !== 'number') return null;
  const mounting = PANEL_COUNT[tier] * MOUNTING_PER_PANEL;
  return base + inv + bat + EARTHING_FLAT + mounting;
}

export function isBatteryEnabled(tier, inverterKey, batteryKey) {
  if (FIXED_TIER_TOTALS[tier]) {
    return FIXED_TIER_TOTALS[tier][`${inverterKey}|${batteryKey}`] != null;
  }
  return COMPONENT_PRICES.batteries[batteryKey] != null;
}

export function calculateInstallment(systemPrice, planYears) {
  if (!systemPrice || typeof systemPrice !== 'number') return null;
  const downPayment = systemPrice * 0.20;
  const remaining = systemPrice - downPayment;
  const yearlyInterest = remaining * 0.24;

  let totalFinanced, months;
  if (planYears === 1) {
    totalFinanced = remaining + yearlyInterest;
    months = 12;
  } else if (planYears === 2) {
    totalFinanced = remaining + (yearlyInterest * 2);
    months = 24;
  }

  return {
    downPayment: Math.round(downPayment),
    monthlyInstallment: Math.round(totalFinanced / months),
  };
}
