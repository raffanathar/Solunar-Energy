import { useState } from 'react';
import { Zap, Battery, Plug, Plus, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const categoryConfig = {
  Inverter: { icon: Zap, gradient: 'from-[#1E3A5F] to-[#0d9488]' },
  Battery: { icon: Battery, gradient: 'from-[#D97706] to-[#b45309]' },
  Accessory: { icon: Plug, gradient: 'from-[#0F172A] to-[#334155]' },
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const cfg = categoryConfig[product.category] || categoryConfig.Accessory;
  const Icon = cfg.icon;
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden card-hover group flex flex-col">
      <div className="relative aspect-square bg-[#F8FAFC] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center`}>
            <Icon className="w-16 h-16 text-white/80" />
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-inter font-semibold text-[#1E3A5F] border border-[#E2E8F0]">
          {product.category}
        </span>
        {product.brand && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#0F172A]/80 text-white text-[10px] font-inter font-medium uppercase tracking-wide">
            {product.brand}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-jakarta font-bold text-[#0F172A] text-sm leading-snug line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="font-inter text-xs text-[#94A3B8] mt-1 line-clamp-2">{product.description}</p>
        )}
        {product.specs && product.specs.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {product.specs.slice(0, 3).map((s, i) => (
              <li key={i} className="font-inter text-[11px] text-[#475569] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#1E3A5F]" />
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div>
            <div className="font-jakarta font-extrabold text-[#0F172A] text-lg">
              Rs {product.price ? product.price.toLocaleString() : 0}
            </div>
            {outOfStock ? (
              <span className="text-[10px] text-red-500 font-inter font-medium">Out of stock</span>
            ) : (
              <span className="text-[10px] text-[#94A3B8] font-inter">In stock</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-jakarta font-semibold transition-all ${
              outOfStock
                ? 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                : added
                ? 'bg-green-500 text-white'
                : 'bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]/90'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}