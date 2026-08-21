import { useEffect, useState } from 'react';
import { MessageCircle, Zap } from 'lucide-react';
import { trackWhatsAppClick, trackCTA } from '@/lib/analytics';

const WHATSAPP_URL = `https://wa.me/923250200632?text=${encodeURIComponent('Assalam-o-Alaikum, I want a quotation for a solar system with the 3-year protection package.')}`;

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-2 gap-2 p-3 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('sticky_mobile')}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-jakarta font-bold text-sm active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          WhatsApp
        </a>
        <a
          href="#quote"
          onClick={() => trackCTA('sticky_mobile_quote')}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3A5F] text-white font-jakarta font-bold text-sm active:scale-[0.98] transition-transform"
        >
          <Zap className="w-4 h-4" />
          Get Protected Solar Quote
        </a>
      </div>
    </div>
  );
}
