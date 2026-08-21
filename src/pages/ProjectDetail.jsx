const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ArrowLeft, MapPin, Zap, Calendar, Loader2, Monitor } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const systemTypeColors = {
  'On-Grid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Hybrid': 'bg-amber-50 text-amber-700 border-amber-200',
  'Off-Grid': 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.Project.get(id)
      .then(data => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="pt-24 pb-24">
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1E3A5F] animate-spin" /></div>
        ) : !project ? (
          <div className="max-w-2xl mx-auto px-4 text-center py-24">
            <Monitor className="w-12 h-12 text-[#1E3A5F]/30 mx-auto mb-4" />
            <h1 className="font-jakarta font-bold text-[#0F172A] text-2xl mb-3">Project Not Found</h1>
            <p className="font-inter text-[#475569] mb-6">This project doesn't exist or has been removed.</p>
            <Link to="/#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3A5F] text-white font-jakarta font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-inter font-medium text-[#1E3A5F] hover:text-[#D97706] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>

            {project.images?.[0] && (
              <div className="rounded-2xl overflow-hidden mb-8 bg-[#F1F5F9]">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 lg:p-12 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {project.systemType && (
                  <span className={`px-3 py-1 rounded-full border text-xs font-inter font-semibold ${systemTypeColors[project.systemType] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                    {project.systemType}
                  </span>
                )}
                {project.completionDate && (
                  <span className="flex items-center gap-1 text-xs font-inter text-[#64748B]">
                    <Calendar className="w-3.5 h-3.5" /> Completed {new Date(project.completionDate).toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>

              <h1 className="font-jakarta font-extrabold text-[#0F172A] text-2xl lg:text-4xl tracking-tight leading-tight mb-6">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm font-inter text-[#64748B]">
                {project.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#1E3A5F]" /> {project.location}
                  </span>
                )}
                {project.systemSize && (
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#1E3A5F]" /> {project.systemSize}
                  </span>
                )}
              </div>

              {project.description && (
                <div className="border-t border-[#E2E8F0] pt-8">
                  <p className="font-inter text-[#475569] leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )}

              {project.details && (
                <div className="border-t border-[#E2E8F0] pt-8 mt-8">
                  <p className="font-inter text-[#475569] leading-relaxed whitespace-pre-line">
                    {project.details}
                  </p>
                </div>
              )}

              {project.images?.length > 1 && (
                <div className="border-t border-[#E2E8F0] pt-8 mt-8">
                  <h3 className="font-jakarta font-bold text-[#0F172A] text-lg mb-4">Project Gallery</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.images.slice(1).map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden bg-[#F1F5F9]">
                        <img src={img} alt={`${project.title} - Image ${i + 2}`} className="w-full h-48 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 bg-[#1E3A5F] rounded-2xl p-8 text-white text-center">
              <h3 className="font-jakarta font-extrabold text-xl mb-2">Want a Similar Setup?</h3>
              <p className="font-inter text-white/80 text-sm mb-5">Get a free site survey and customized quote from Solunar Energy today.</p>
              <a href="/#quote" className="inline-block px-8 py-3 rounded-full bg-white text-[#1E3A5F] font-jakarta font-bold text-sm hover:bg-white/90 transition-colors">
                Get Protected Solar Quote
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
