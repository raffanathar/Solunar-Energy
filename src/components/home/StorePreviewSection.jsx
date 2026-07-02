const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Loader2, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';

export default function StorePreviewSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Product.list('order', 4)
      .then(data => setProducts((data || []).filter(p => p.isActive !== false).slice(0, 4)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="store" className="py-24 lg:py-32 bg-[#F8FAFC] section-rule relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#0A7A70]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A7A70]/10 border border-[#0A7A70]/20 mb-5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#0A7A70]" />
              <span className="font-inter text-xs font-semibold text-[#0A7A70] tracking-wider uppercase">Solar Store</span>
            </div>
            <h2 className="font-jakarta font-extrabold text-[#0F172A] text-3xl lg:text-5xl leading-tight tracking-tight">
              Quality Components,<br />
              <span className="text-[#0A7A70]">Honest Prices</span>
            </h2>
            <p className="font-inter text-[#475569] text-base mt-4 max-w-lg leading-relaxed">
              Genuine inverters, batteries, and accessories from trusted brands. Add to cart and check out instantly via WhatsApp.
            </p>
          </div>
          <Link
            to="/store"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#E2E8F0] text-[#0A7A70] font-jakarta font-semibold text-sm hover:border-[#0A7A70]/40 hover:shadow-md transition-all whitespace-nowrap self-start sm:self-end"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 text-[#0A7A70] animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
            <p className="font-jakarta font-semibold text-[#0F172A]">Store coming soon</p>
            <p className="font-inter text-sm text-[#94A3B8] mt-1">We're stocking our shelves with quality solar components.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}