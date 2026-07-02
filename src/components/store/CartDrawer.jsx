import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCart } from '@/lib/cart-context';
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '923214407701';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, count, clear } = useCart();

  const checkout = () => {
    if (!items.length) return;
    const lines = items
      .map((i, idx) => `${idx + 1}. ${i.name} ×${i.qty} — Rs ${(i.price * i.qty).toLocaleString()}`)
      .join('\n');
    const message = `Hello Solunar Energy! I'd like to place an order:\n\n${lines}\n\n*Total: Rs ${total.toLocaleString()}*\n\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
        <SheetHeader className="px-5 pr-12 py-4 border-b border-[#E2E8F0] flex flex-row items-center justify-between space-y-0 sm:flex-row sm:space-y-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0A7A70]" />
            <SheetTitle className="font-jakarta font-bold text-[#0F172A] text-base">
              Your Cart ({count})
            </SheetTitle>
          </div>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-xs font-inter text-[#94A3B8] hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
          <SheetDescription className="sr-only">Shopping cart</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-[#94A3B8]" />
            </div>
            <p className="font-jakarta font-semibold text-[#0F172A]">Your cart is empty</p>
            <p className="font-inter text-sm text-[#94A3B8]">
              Browse our inverters and batteries and add items to your cart.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 px-5 py-2.5 rounded-full bg-[#0A7A70] text-white font-jakarta font-semibold text-sm hover:bg-[#0A7A70]/90 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]"
                >
                  <div className="w-16 h-16 rounded-lg bg-white border border-[#E2E8F0] flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#0A7A70]/10 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-[#0A7A70]/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-jakarta font-semibold text-[#0F172A] text-sm leading-snug line-clamp-2">
                      {item.name}
                    </div>
                    <div className="font-jakarta font-bold text-[#0A7A70] text-sm mt-0.5">
                      Rs {item.price.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-jakarta font-semibold text-sm w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#94A3B8] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E2E8F0] px-5 py-4 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm text-[#475569]">Subtotal</span>
                <span className="font-jakarta font-extrabold text-[#0F172A] text-lg">
                  Rs {total.toLocaleString()}
                </span>
              </div>
              <p className="font-inter text-xs text-[#94A3B8]">
                Shipping & taxes confirmed on WhatsApp.
              </p>
              <button
                onClick={checkout}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-jakarta font-bold text-sm hover:bg-[#1ebe5b] transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white" /> Checkout via WhatsApp
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}