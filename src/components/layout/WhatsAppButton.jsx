import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '923214407701';
  const message = encodeURIComponent('Hello! I am interested in a solar panel installation. Please share more details about your packages.');
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 hover:shadow-[#25D366]/60"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </a>
  );
}