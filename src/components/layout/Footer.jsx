import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const serviceLinks = [
  'Residential Solar', 'Commercial Solar', 'Industrial Solar',
  'On-Grid Systems', 'Hybrid Systems', 'Off-Grid Systems',
  'Solar Maintenance', 'Site Survey'
];
const quickLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Why Choose Us', href: '/#why-us' },
  { label: 'Customer Reviews', href: '/#reviews' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-0.5 mb-5">
              <img src="/logo-quotation.png" alt="Solunar Energy" className="h-10 w-auto object-contain" />
              <div>
                <span className="font-jakarta font-extrabold text-lg text-white leading-none block">Solunar</span>
                <span className="font-inter text-xs text-[#1E3A5F] font-medium tracking-wider uppercase leading-none block">Energy</span>
              </div>
            </div>
            <p className="font-inter text-sm text-[#94A3B8] leading-relaxed mb-6">
              Pakistan's trusted solar energy partner. Delivering affordable, efficient, and long-lasting solar solutions for homes, businesses, and industries across the country.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F]/20 hover:border-[#1E3A5F]/30 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-jakarta font-bold text-sm tracking-widest uppercase text-[#94A3B8] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="font-inter text-sm text-[#CBD5E1] hover:text-[#1E3A5F] transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-jakarta font-bold text-sm tracking-widest uppercase text-[#94A3B8] mb-5">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(s => (
                <li key={s}>
                  <a href="/#services" className="font-inter text-sm text-[#CBD5E1] hover:text-[#1E3A5F] transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-jakarta font-bold text-sm tracking-widest uppercase text-[#94A3B8] mb-5">Contact</h4>
            <div className="space-y-4">
              <a href="tel:+923250200632" className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-[#1E3A5F] mt-0.5 flex-shrink-0" />
                <span className="font-inter text-sm text-[#CBD5E1] group-hover:text-white transition-colors">+92 325 0200632</span>
              </a>
              <a href="mailto:info@solunarenergy.pk" className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-[#1E3A5F] mt-0.5 flex-shrink-0" />
                <span className="font-inter text-sm text-[#CBD5E1] group-hover:text-white transition-colors">info@solunarenergy.pk</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1E3A5F] mt-0.5 flex-shrink-0" />
                <span className="font-inter text-sm text-[#CBD5E1]">Lahore, Pakistan</span>
              </div>
            </div>
            <div className="mt-5">
              <h5 className="font-inter text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Solar Energy Keywords</h5>
              <p className="font-inter text-xs text-[#475569] leading-relaxed">
                Solar company Pakistan · Solar panel installation Pakistan · Net metering Pakistan · Home solar system Pakistan
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-[#475569]">
            © 2026 Solunar Energy. All Rights Reserved.
          </p>
          <p className="font-inter text-xs text-[#334155]">
            Best Solar Company in Pakistan · Commercial Solar System Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}