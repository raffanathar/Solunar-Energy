const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { Home, Building2, Factory, Zap, Cpu, Battery, Wrench, Search, ArrowRight, Loader2 } from 'lucide-react';

const iconMap = {
  Home, Building2, Factory, Zap, Cpu, Battery, Wrench, Search,
};

const defaultServices = [
  // TODO: CONFIRM REAL FIGURE — savings placeholder below is user-provided ("up to 70–80%*"); replace with verified data if available.
  { id: 'd1', icon: 'Home', title: 'Residential Solar Installation', description: 'Complete rooftop solar solutions for homes. Reduce your WAPDA bills by up to 70–80%* with our premium residential packages.' },
  { id: 'd2', icon: 'Building2', title: 'Commercial Solar Installation', description: 'Office, retail, and commercial building solar systems designed for maximum ROI and energy independence.' },
  { id: 'd3', icon: 'Factory', title: 'Industrial Solar Solutions', description: 'Heavy-duty solar systems for factories, warehouses, and industrial facilities. Manage large power loads efficiently.' },
  { id: 'd4', icon: 'Zap', title: 'On-Grid Solar Systems', description: 'Connect to the national grid and earn through net metering. Ideal for areas with reliable grid supply.' },
  { id: 'd5', icon: 'Cpu', title: 'Hybrid Solar Systems', description: 'Best of both worlds — grid-tied with battery backup. Reliable power even during load-shedding.' },
  { id: 'd6', icon: 'Battery', title: 'Off-Grid Solar Systems', description: 'Completely independent solar power systems with battery storage. Perfect for remote farms and rural areas.' },
  { id: 'd7', icon: 'Wrench', title: 'Solar System Maintenance', description: 'Expert servicing, cleaning, monitoring, and repair for all solar installations. Maximize your system performance.' },
  { id: 'd8', icon: 'Search', title: 'Solar Consultation & Survey', description: 'Free professional site assessment and customized energy audit to design the perfect solar solution for you.' },
];

function ServiceCard({ service }) {
  const IconComp = iconMap[service.icon] || Zap;
  return (
    <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 card-hover flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center mb-5 group-hover:bg-[#1E3A5F] transition-colors duration-500">
        <IconComp className="w-6 h-6 text-[#1E3A5F] group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="font-jakarta font-bold text-[#0F172A] text-lg mb-3 leading-snug">{service.title}</h3>
      <p className="font-inter text-sm text-[#475569] leading-relaxed flex-1 mb-5">{service.description}</p>
      <a
        href="#quote"
        className="inline-flex items-center gap-2 text-sm font-jakarta font-semibold text-[#1E3A5F] hover:text-[#D97706] transition-colors duration-300 group/btn"
      >
        Request Quote
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
      </a>
    </div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Service.list('order', 20)
      .then(data => {
        setServices(data.length > 0 ? data.filter(s => s.isActive !== false) : defaultServices);
      })
      .catch(() => setServices(defaultServices))
      .finally(() => setLoading(false));
  }, []);

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F8FAFC] section-rule relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#1E3A5F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
            <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Our Services</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-5">
            Complete Solar Solutions <br />
            <span className="text-[#1E3A5F]">For Every Need</span>
          </h2>
          <p className="font-inter text-[#475569] text-base leading-relaxed">
            From residential rooftops to industrial complexes, Solunar Energy designs, supplies, and installs customized solar systems across Pakistan.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#1E3A5F] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayServices.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        )}
      </div>
    </section>
  );
}