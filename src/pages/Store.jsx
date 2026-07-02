const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ProductCard from '@/components/store/ProductCard';
import { Loader2, ShoppingBag, Zap, Battery, Plug, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Products', icon: ShoppingBag },
  { id: 'Inverter', label: 'Inverters', icon: Zap },
  { id: 'Battery', label: 'Batteries', icon: Battery },
  { id: 'Accessory', label: 'Accessories', icon: Plug },
];

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('all');

  useEffect(() => {
    db.entities.Product.list('order', 100)
      .then(data => setProducts((data || []).filter(p => p.isActive !== false)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#0A7A70] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #D97706 0, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#D97706] text-xs font-inter font-semibold uppercase tracking-wider mb-4">
            <ShoppingBag className="w-3.5 h-3.5" /> Solar Store
          </span>
          <h1 className="font-jakarta font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Inverters & Batteries
          </h1>
          <p className="font-inter text-[#CBD5E1] text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Genuine solar components at competitive prices. Add items to your cart and check out instantly via WhatsApp.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
          {categories.map(c => {
            const Icon = c.icon;
            const isActiveCat = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-jakarta font-semibold transition-all ${
                  isActiveCat
                    ? 'bg-[#0A7A70] text-white shadow-md'
                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#0A7A70]/40 hover:text-[#0A7A70]'
                }`}
              >
                <Icon className="w-4 h-4" /> {c.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 text-[#0A7A70] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-jakarta font-semibold text-[#0F172A]">No products found</p>
            <p className="font-inter text-sm text-[#94A3B8] mt-1">Check back soon — we're adding new stock regularly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* CTA strip */}
        <div className="mt-14 bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-jakarta font-bold text-white text-lg">Not sure what you need?</h3>
            <p className="font-inter text-sm text-[#94A3B8] mt-1">Get a free site survey and a custom system recommendation.</p>
          </div>
          <Link to="/#quote" className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A7A70] text-white font-jakarta font-semibold text-sm hover:bg-[#0A7A70]/90 transition-colors whitespace-nowrap">
            Get Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}