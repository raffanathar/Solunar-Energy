import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { trackCTA } from '@/lib/analytics';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Store', href: '/store' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

const packagesDropdown = [
  { label: 'Solar Packages', href: '/#packages' },
  { label: 'Installment Packages', href: '/installments' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { count, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0.5 group">
            <img
              src="/logo-quotation.png"
              alt="Solunar Energy"
              className="h-9 lg:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            />
            <div>
              <span className="font-jakarta font-800 text-lg text-[#0F172A] leading-none block">
                Solunar
              </span>
              <span className="font-inter text-xs text-[#1E3A5F] font-medium tracking-wider uppercase leading-none block">
                Energy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => l.label === 'Packages' ? (
              <div key={l.label} className="relative group">
                <Link
                  to={l.href}
                  className="px-2.5 py-2 text-sm font-inter font-medium text-[#475569] hover:text-[#1E3A5F] transition-colors duration-200 rounded-lg hover:bg-[#1E3A5F]/5 inline-flex items-center gap-1 whitespace-nowrap"
                >
                  {l.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg shadow-[#0F172A]/8 py-2 min-w-[200px]">
                    {packagesDropdown.map(item => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-4 py-2.5 text-sm font-inter font-medium text-[#475569] hover:text-[#1E3A5F] hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className="px-2.5 py-2 text-sm font-inter font-medium text-[#475569] hover:text-[#1E3A5F] transition-colors duration-200 rounded-lg hover:bg-[#1E3A5F]/5 whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#475569] hover:text-[#1E3A5F] hover:bg-[#1E3A5F]/5 transition-colors flex-shrink-0"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#D97706] text-white text-[10px] font-jakarta font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <a
              href="tel:+923250200632"
              className="flex items-center gap-2 text-sm font-inter font-medium text-[#475569] hover:text-[#1E3A5F] transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              +92 325 0200632
            </a>
            <a
              href="#quote"
              onClick={() => trackCTA('navbar_quote')}
              className="px-5 py-2.5 rounded-full bg-[#1E3A5F] text-white text-sm font-jakarta font-semibold hover:bg-[#1E3A5F]/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#1E3A5F]/20 whitespace-nowrap"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile: always-visible CTA + toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#quote"
              onClick={() => trackCTA('navbar_mobile_quote')}
              className="px-4 py-2 rounded-full bg-[#1E3A5F] text-white text-xs font-jakarta font-semibold shadow-md shadow-[#1E3A5F]/20"
            >
              Protected Quote
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[#0F172A] hover:bg-[#F1F5F9] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-[#E2E8F0] shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <div key={l.label}>
                <Link
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-inter font-medium text-[#475569] hover:text-[#1E3A5F] hover:bg-[#F8FAFC] rounded-xl transition-colors"
                >
                  {l.label}
                </Link>
                {l.label === 'Packages' && (
                  <div className="ml-4 pl-4 border-l border-[#E2E8F0] space-y-0.5">
                    {packagesDropdown.map(item => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-inter font-medium text-[#64748B] hover:text-[#1E3A5F] hover:bg-[#F8FAFC] rounded-xl transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setIsOpen(true); }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-inter font-medium text-[#1E3A5F] hover:bg-[#F8FAFC] rounded-xl transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> View Cart {count > 0 && `(${count})`}
            </button>
            <div className="pt-3 border-t border-[#E2E8F0] mt-3 space-y-2">
              <a
                href="tel:+923250200632"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#475569]"
              >
                <Phone className="w-4 h-4" /> +92 325 0200632
              </a>
              <a
                href="#quote"
                onClick={() => { setMobileOpen(false); trackCTA('navbar_mobile_menu_quote'); }}
                className="block w-full text-center px-4 py-3 rounded-full bg-[#1E3A5F] text-white font-jakarta font-semibold text-sm"
              >
              Get Protected Solar Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}