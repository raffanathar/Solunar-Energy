import { Phone, Mail, MapPin, MessageCircle, Clock, ChevronRight } from 'lucide-react';

const serviceAreas = ['Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Karachi', 'Gujranwala', 'Sialkot', 'Peshawar', 'Quetta', 'Hyderabad', 'Bahawalpur'];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white section-rule relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#0A7A70]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A7A70]/10 border border-[#0A7A70]/20 mb-6">
            <span className="font-inter text-xs font-semibold text-[#0A7A70] tracking-wider uppercase">Contact Us</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
            Get In <span className="text-[#0A7A70]">Touch</span>
          </h2>
          <p className="font-inter text-[#475569] text-base leading-relaxed">
            Our solar energy experts are available 6 days a week. Contact us via WhatsApp, phone, or email — we'll respond within hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: contact info */}
          <div>
            <div className="space-y-5 mb-10">
              {[
                { icon: Phone, label: 'Phone', value: '+92 321 4407701', href: 'tel:+923214407701', color: '#0A7A70' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+92 321 4407701', href: 'https://wa.me/923214407701', color: '#25D366' },
                { icon: Mail, label: 'Email', value: 'info@solunarenergy.pk', href: 'mailto:info@solunarenergy.pk', color: '#0A7A70' },
                { icon: MapPin, label: 'Address', value: 'Main Office, Lahore, Pakistan', href: '#', color: '#D97706' },
                { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM', href: null, color: '#0A7A70' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0A7A70]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <div className="font-inter text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="font-inter text-sm font-medium text-[#0F172A] hover:text-[#0A7A70] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="font-inter text-sm font-medium text-[#0F172A]">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/923214407701?text=Hello!%20I%20want%20to%20inquire%20about%20solar%20installation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-jakarta font-bold text-base hover:bg-[#25D366]/90 transition-all duration-300 shadow-xl shadow-[#25D366]/25 hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Chat on WhatsApp Now
            </a>
          </div>

          {/* Right: service areas + map placeholder */}
          <div>
            <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-7 mb-6">
              <h3 className="font-jakarta font-bold text-[#0F172A] text-lg mb-5">Service Areas Across Pakistan</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {serviceAreas.map(city => (
                  <div key={city} className="flex items-center gap-2 py-2">
                    <ChevronRight className="w-3.5 h-3.5 text-[#0A7A70] flex-shrink-0" />
                    <span className="font-inter text-sm text-[#475569]">{city}</span>
                  </div>
                ))}
              </div>
              <p className="font-inter text-xs text-[#94A3B8] mt-4">+ Other cities across Pakistan. Contact us to confirm availability in your area.</p>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden h-56 bg-gradient-to-br from-[#0A7A70]/5 to-[#F8FAFC] flex flex-col items-center justify-center">
              <MapPin className="w-10 h-10 text-[#0A7A70]/30 mb-3" />
              <p className="font-inter text-sm text-[#94A3B8] text-center px-4">
                Office location map<br />
                <span className="text-xs">Google Maps embed will be added here</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}