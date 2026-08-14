import React, { useState } from 'react';
import { ChevronDown, Menu, X, Radio, Tv, Building2, FileText, PhoneCall, ShieldAlert, Calculator, Lock, Award, UserCheck, PlaySquare } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, settings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);

  const handleNav = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
    setOpenMega(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { title: 'Início', path: 'home' },
    {
      title: 'A Federação',
      isMega: true,
      subItems: [
        { label: 'História & Conquistas', path: 'history', icon: Award },
        { label: 'Palavra do Presidente', path: 'president', icon: UserCheck },
        { label: 'Diretoria Executiva', path: 'history', icon: Building2 },
        { label: 'Sede e Subsedes', path: 'contact', icon: PhoneCall }
      ]
    },
    { title: '97 Sindicatos', path: 'unions', badge: 'SP' },
    { title: 'Pisos Salariais', path: 'salary', badge: '2026' },
    { title: 'Convenções', path: 'agreements' },
    {
      title: 'Mídia & Streaming',
      isMega: true,
      subItems: [
        { label: 'Web TV Multi-Canais', path: 'webtv', icon: Tv, badge: 'Ao Vivo' },
        { label: 'Sindflix (Vídeos)', path: 'webtv', icon: PlaySquare },
        { label: 'Rádio Web 24h & AutoDJ', path: 'radioweb', icon: Radio, badge: 'Continuous' }
      ]
    },
    { title: 'Simulador de Direitos', path: 'calculator' },
    { title: 'Notícias', path: 'home' },
    { title: 'Contato', path: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md font-sans">
      {/* Topbar Superior */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span><strong>Sede:</strong> {settings?.address || 'São Paulo - SP'}</span>
            <span className="hidden md:inline"><strong>Fone:</strong> {settings?.phone || '(11) 3228-5000'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Rádio Web 24h Ao Vivo
            </span>
            <button 
              onClick={() => handleNav('admin')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-2 py-0.5 rounded font-bold flex items-center gap-1 transition text-[10px]"
            >
              <Lock size={10} /> Operador CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 py-1.5">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNav('home')} 
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <img 
              src={settings?.logoUrl || "/logo_fttresp.png"} 
              alt="Logo Oficial FTTRESP" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition"
            />
            <div>
              <div className="font-black text-lg tracking-tight text-slate-950 flex items-center gap-1.5 leading-none">
                FTTRESP <span className="gradient-gold text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-black">SP</span>
              </div>
              <div className="text-slate-500 text-[9px] tracking-wider uppercase font-bold mt-0.5">
                Federação dos Trabalhadores Rodoviários de SP
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item, index) => {
              const active = currentPage === item.path;
              return (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => item.isMega && setOpenMega(item.title)}
                  onMouseLeave={() => item.isMega && setOpenMega(null)}
                >
                  <button
                    onClick={() => {
                      if (item.isMega) {
                        setOpenMega(openMega === item.title ? null : item.title);
                      } else if (item.path) {
                        handleNav(item.path);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-tight flex items-center gap-1 transition ${
                      active 
                        ? 'bg-amber-500 text-slate-950 font-black shadow-sm' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[8px] bg-slate-900 text-amber-400 px-1 py-0.1 rounded font-black">
                        {item.badge}
                      </span>
                    )}
                    {item.isMega && <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />}
                  </button>

                  {/* Mega Menu Dropdown */}
                  {item.isMega && (
                    <div className={`absolute top-full left-0 pt-1 transition-all duration-200 z-50 ${
                      openMega === item.title ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      <div className="bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 p-3 w-64 space-y-1">
                        {item.subItems.map((sub, idx) => {
                          const SubIcon = sub.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleNav(sub.path)}
                              className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-amber-400 transition"
                            >
                              <div className="flex items-center gap-2">
                                {SubIcon && <SubIcon size={14} className="text-amber-400" />}
                                <span>{sub.label}</span>
                              </div>
                              {sub.badge && (
                                <span className="bg-red-600 text-white text-[8px] px-1 py-0.1 rounded font-black uppercase">
                                  {sub.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-1.5 rounded-lg bg-slate-900 text-amber-400"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-slate-900 text-white border-t border-slate-800 py-3 px-3 space-y-1">
          {navItems.map((item, idx) => (
            <div key={idx}>
              <button
                onClick={() => item.path && handleNav(item.path)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between hover:bg-slate-800"
              >
                <span>{item.title}</span>
                {item.badge && <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-black">{item.badge}</span>}
              </button>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
