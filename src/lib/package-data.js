// Shared default solar package data used by the homepage Packages section
// and the Installments page fallback when no SolarPackage records exist in the CMS.
export const defaultPackages = [
  {
    id: 'p0', name: '3kW Basic', systemSize: '3kW', bestFor: 'Very Small Homes & Single Rooms',
    monthlyUnits: 'Based on load analysis', coveragePercent: null,
    components: ['4 × 720W N-type Bifacial Panels', '4kW Hybrid/On-grid/Off-grid Inverter'],
  },
  {
    id: 'p1', name: '3kW Home Starter', systemSize: '3 kW', bestFor: 'Small Homes & Apartments',
    monthlyUnits: '380–430 units/month', coveragePercent: 60,
    components: ['5 × 720W N-type Bifacial Panels', '4kW Hybrid/On-grid/Off-grid Inverter', 'Net-billing Support', '5kW Lithium Battery'],
  },
  {
    id: 'p2', name: '6kW Home Premium', systemSize: '6 kW', bestFor: 'Medium Homes',
    monthlyUnits: '700–780 units/month', coveragePercent: 80,
    components: ['9 × 720W N-type Bifacial Panels', '6kW Hybrid/On-grid/Off-grid Inverter IP21/IP65', 'Net-billing Support', '5kW/7.5kW Lithium Battery'],
    highlight: true,
  },
  {
    id: 'p3', name: '8kW Comfort', systemSize: '8 kW', bestFor: 'Large Homes & Offices',
    monthlyUnits: '900–1,120 units/month', coveragePercent: 90,
    components: ['12 × 720W N-type Bifacial Panels', '8kW Hybrid/On-grid/Off-grid Inverter IP65', 'Net-billing Support', '5kW/7.5kW/15kW Lithium Battery'],
  },
  {
    id: 'p4', name: '10kW Commercial', systemSize: '10 kW', bestFor: 'Offices & Shops',
    monthlyUnits: '1,050–1,200 units/month', coveragePercent: 90,
    components: ['14 × 720W N-type Bifacial Panels', '10kW Hybrid/On-grid/Off-grid Inverter IP21/IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '5kW/7.5kW/15kW Lithium Battery'],
  },
  {
    id: 'p5', name: '12kW Premium', systemSize: '12 kW', bestFor: 'Large Offices & Small Factories',
    monthlyUnits: '1,300–1,600 units/month', coveragePercent: 95,
    components: ['18 × 720W N-type Bifacial Panels', '12kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '7.5kW/15kW/22kW/30kW Lithium Battery'],
  },
  {
    id: 'p6', name: '15kW Business', systemSize: '15 kW', bestFor: 'Factories & Large Offices',
    monthlyUnits: '1,650–2,000 units/month', coveragePercent: 95,
    components: ['22 × 720W N-type Bifacial Panels', '15kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '15kW/22kW/30kW Lithium Battery'],
  },
  {
    id: 'p7', name: '20kW Business', systemSize: '20 kW', bestFor: 'Factories, Large Homes & Large Offices',
    monthlyUnits: '2,100–2,500 units/month', coveragePercent: 95,
    components: ['28 × 720W N-type Bifacial Panels', '20kW Hybrid/On-grid/Off-grid Inverter IP65', 'Mounting/Elevated Structure', 'Net-billing Support', '22kW/30kW/45kW Lithium Battery'],
  },
  {
    id: 'p8', name: 'Custom Industrial', systemSize: 'Custom', bestFor: 'Factories, Farms & Large Industries',
    monthlyUnits: 'Based on load analysis', coveragePercent: 100,
    components: ['N-type Bifacial Panels', 'Industrial Grade Inverters', 'Custom Engineering Design', 'Full Project Management'],
  },
];