const db = globalThis.__B44_DB__ || {}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Zap, Sun, Calendar, ChevronRight, Loader2 } from 'lucide-react'

const systemTypeColors = {
  'On-Grid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Hybrid': 'bg-amber-50 text-amber-700 border-amber-200',
  'Off-Grid': 'bg-blue-50 text-blue-700 border-blue-200',
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.entities.Project.list('sort_order', 20)
      .then(data => setProjects((data || []).filter(p => p.isActive !== false)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading && projects.length === 0) {
    return (
      <section className="py-24 lg:py-32 bg-white">
        <div className="flex justify-center"><Loader2 className="w-6 h-6 text-[#1E3A5F] animate-spin" /></div>
      </section>
    )
  }

  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#F8FAFC] section-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 mb-6">
            <Sun className="w-3.5 h-3.5 text-[#1E3A5F]" />
            <span className="font-inter text-xs font-semibold text-[#1E3A5F] tracking-wider uppercase">Our Projects</span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[#0F172A] text-4xl lg:text-5xl tracking-tight mb-4">
            Recently <span className="text-[#1E3A5F]">Completed</span>
          </h2>
          <p className="font-inter text-[#475569] text-base max-w-2xl mx-auto">
            Real installations across Pakistan — from homes and offices to factories and farms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <Link key={p.id} to={`/project/${p.id}`} className="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:border-[#1E3A5F]/20 transition-all duration-500 block">
              <div className="relative h-52 overflow-hidden bg-[#F1F5F9]">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sun className="w-12 h-12 text-[#1E3A5F]/20" />
                  </div>
                )}
                {p.systemType && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full border text-xs font-inter font-semibold ${systemTypeColors[p.systemType] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                    {p.systemType}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-jakarta font-bold text-[#0F172A] text-base mb-2 line-clamp-2 group-hover:text-[#1E3A5F] transition-colors">
                  {p.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3 text-xs font-inter text-[#64748B]">
                  {p.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {p.location}
                    </span>
                  )}
                  {p.systemSize && (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {p.systemSize}
                    </span>
                  )}
                  {p.completionDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(p.completionDate).toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>

                {p.description && (
                  <p className="font-inter text-sm text-[#475569] leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                  <span className="inline-flex items-center gap-1 text-sm font-inter font-medium text-[#1E3A5F] group-hover:gap-2 transition-all">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
