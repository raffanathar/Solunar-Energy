import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Store', href: '/store' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
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
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#0A7A70] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-jakarta font-800 text-lg text-[#0F172A] leading-none block">
                Solunar
              </span>
              <span className="font-inter text-xs text-[#0A7A70] font-medium tracking-wider uppercase leading-none block">
                Energy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="px-3 py-2 text-sm font-inter font-medium text-[#475569] hover:text-[#0A7A70] transition-colors duration-200 rounded-lg hover:bg-[#0A7A70]/5"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#475569] hover:text-[#0A7A70] hover:bg-[#0A7A70]/5 transition-colors"
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
              href="tel:+923214407701"
              className="flex items-center gap-2 text-sm font-inter font-medium text-[#475569] hover:text-[#0A7A70] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +92 321 4407701
            </a>
            <a
              href="#quote"
              className="px-5 py-2.5 rounded-full bg-[#0A7A70] text-white text-sm font-jakarta font-semibold hover:bg-[#0A7A70]/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#0A7A70]/20"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0F172A] hover:bg-[#F1F5F9] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-[#E2E8F0] shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(l => (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-inter font-medium text-[#475569] hover:text-[#0A7A70] hover:bg-[#F8FAFC] rounded-xl transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setIsOpen(true); }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-inter font-medium text-[#0A7A70] hover:bg-[#F8FAFC] rounded-xl transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> View Cart {count > 0 && `(${count})`}
            </button>
            <div className="pt-3 border-t border-[#E2E8F0] mt-3 space-y-2">
              <a
                href="tel:+923214407701"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#475569]"
              >
                <Phone className="w-4 h-4" /> +92 321 4407701
              </a>
              <a
                href="#quote"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-full bg-[#0A7A70] text-white font-jakarta font-semibold text-sm"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}