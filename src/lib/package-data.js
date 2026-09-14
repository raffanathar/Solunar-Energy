// Shared default solar package data used by the homepage Packages section
// and the Installments page fallback when no SolarPackage records exist in the CMS.
// Battery-size price lookup per package (Rs). Fill in a value for a battery size to
// show its price on the package card; leave null to display "Contact for latest price".
export const packageBatteryPrices = {
  '3kW Home Starter': {},
  '6kW Home Premium': { '5kW': null, '7.5kW': null },
  '8kW Comfort': { '5kW': null, '7.5kW': null, '15kW': null },
  '10kW Commercial': { '5kW': null, '7.5kW': null, '15kW': null },
  '12kW Premium': { '7.5kW': null, '15kW': null, '22kW': null },
  '15kW Business': { '15kW': null, '22kW': null, '30kW': null },
  '20kW Business': { '22kW': null, '30kW': null, '50kW': null },
  'Custom Industrial': {},
};
export const defaultPackages = [
  {
    id: 'p1', name: '3kW Home Starter', systemSize: '3 kW', bestFor: 'Small Homes & Apartments',
    monthlyUnits: '380–430 units/month', coveragePercent: 60,
    components: ['5 × 720W N-type Bifacial Panels', '4kW Hybrid/On-grid/Off-grid Inverter', 'Mounting/Elevated Structure', 'Net-billing Support', '5kW Lithium Battery'],
  },
  {
    id: 'p2', name: '6kW Home Premium', systemSize: '6 kW', bestFor: 'Medium Homes',
    monthlyUnits: '700–780 units/month', coveragePercent: 80,
    components: ['9 × 720W N-type Bifacial Panels', '6kW Hybrid/On-grid/Off-grid Inverter IP21/IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '5kW/7.5kW Lithium Battery'],
    highlight: true,
  },
  {
    id: 'p3', name: '8kW Comfort', systemSize: '8 kW', bestFor: 'Large Homes & Offices',
    monthlyUnits: '900–1,120 units/month', coveragePercent: 90,
    components: ['12 × 720W N-type Bifacial Panels', '8kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '5kW/7.5kW/15kW Lithium Battery'],
  },
  {
    id: 'p4', name: '10kW Commercial', systemSize: '10 kW', bestFor: 'Offices & Shops',
    monthlyUnits: '1,050–1,200 units/month', coveragePercent: 90,
    components: ['14 × 720W N-type Bifacial Panels', '10kW Hybrid/On-grid/Off-grid Inverter IP21/IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '5kW/7.5kW/15kW Lithium Battery'],
  },
  {
    id: 'p5', name: '12kW Premium', systemSize: '12 kW', bestFor: 'Large Offices & Small Factories',
    monthlyUnits: '1,300–1,600 units/month', coveragePercent: 95,
    components: ['18 × 720W N-type Bifacial Panels', '10kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '7.5kW/15kW/22kW Lithium Battery'],
  },
  {
    id: 'p6', name: '15kW Business', systemSize: '15 kW', bestFor: 'Factories & Large Offices',
    monthlyUnits: '1,650–2,000 units/month', coveragePercent: 95,
    components: ['22 × 720W N-type Bifacial Panels', '15kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '15kW/22kW/30kW Lithium Battery'],
  },
  {
    id: 'p7', name: '20kW Business', systemSize: '20 kW', bestFor: 'Factories, Large Homes & Large Offices',
    monthlyUnits: '2,100–2,500 units/month', coveragePercent: 95,
    components: ['28 × 720W N-type Bifacial Panels', '20kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '22kW/30kW/50kW Lithium Battery'],
  },
  {
    id: 'p8', name: 'Custom Industrial', systemSize: 'Custom', bestFor: 'Factories, Farms & Large Industries',
    monthlyUnits: 'Based on load analysis', coveragePercent: 100,
    components: ['Tier-1 Panels (LONGi/JA Solar)', 'Industrial Grade Inverters', 'Custom Engineering Design', 'Full Project Management'],
  },
];