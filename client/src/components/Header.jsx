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
    {
      title: 'Direitos & Acordos',
      isMega: true,
      subItems: [
        { label: 'Pisos Salariais 2026', path: 'salary', icon: Award, badge: '2026' },
        { label: 'Convenções Coletivas', path: 'agreements', icon: FileText },
        { label: 'Simulador de Direitos', path: 'calculator', icon: Calculator }
      ]
    },
    {
      title: 'Mídia & Streaming',
      isMega: true,
      subItems: [
        { label: 'Web TV Ao Vivo', path: 'webtv', icon: Tv, badge: 'Ao Vivo' },
        { label: 'Rádio Web 24h & AutoDJ', path: 'radioweb', icon: Radio, badge: 'Continuous' },
        { label: 'Sindflix (Vídeos & Acervo)', path: 'webtv', icon: PlaySquare }
      ]
    },
    { title: 'Notícias', path: 'home' },
    { title: 'Contato', path: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md font-sans">
      {/* Topbar Superior */}
      <div className="bg-black text-white text-[11px] py-1.5 px-4 border-b border-red-600">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span><strong>Sede:</strong> {settings?.address || 'São Paulo - SP'}</span>
            <span className="hidden md:inline"><strong>Fone:</strong> {settings?.phone || '(11) 3217-7272'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Rádio Web 24h Ao Vivo
            </span>
            <button 
              onClick={() => handleNav('admin')}
              className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded font-black flex items-center gap-1 transition text-[10px]"
            >
              <Lock size={10} /> Operador CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md text-black border-b border-zinc-200 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNav('home')} 
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-zinc-300 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <img 
                src={settings?.logoUrl || "/logo_fttresp.png"} 
                alt="Logo Oficial FTTRESP" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight text-black flex items-center gap-1.5 leading-none">
                FTTRESP <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded font-black uppercase">SP</span>
              </div>
              <div className="text-zinc-600 text-[9px] tracking-wider uppercase font-bold mt-0.5">
                Federação dos Trabalhadores Rodoviários de SP
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
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
                    onClick={() => !item.isMega && handleNav(item.path)}
                    className={`px-3 py-2 rounded-xl text-xs font-black tracking-tight flex items-center gap-1 transition uppercase ${
                      active 
                        ? 'bg-red-600 text-white shadow-sm' 
                        : 'text-black hover:bg-zinc-100 hover:text-red-600'
                    }`}
                  >
                    {item.title}
                    {item.badge && (
                      <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded font-black">
                        {item.badge}
                      </span>
                    )}
                    {item.isMega && <ChevronDown size={14} className="text-zinc-400 group-hover:text-red-600" />}
                  </button>

                  {/* Mega Menu Dropdown */}
                  {item.isMega && openMega === item.title && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-zinc-200 shadow-2xl rounded-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-1">
                        {item.subItems.map((sub, idx) => {
                          const Icon = sub.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleNav(sub.path)}
                              className="w-full p-2.5 rounded-xl hover:bg-zinc-100 flex items-center justify-between text-left transition group/sub"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-zinc-100 text-red-600 group-hover/sub:bg-red-600 group-hover/sub:text-white transition">
                                  <Icon size={16} />
                                </div>
                                <span className="font-bold text-xs text-black group-hover/sub:text-red-600 transition">
                                  {sub.label}
                                </span>
                              </div>
                              {sub.badge && (
                                <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded uppercase">
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

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button 
              onClick={() => handleNav('webtv')}
              className="bg-black hover:bg-zinc-800 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-red-600"
            >
              <Tv size={14} className="text-red-600" /> Web TV Ao Vivo
            </button>
            <button 
              onClick={() => handleNav('contact')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-md hover:scale-105 transition flex items-center gap-1.5"
            >
              <PhoneCall size={14} /> Atendimento
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl bg-zinc-100 text-black hover:bg-zinc-200 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-zinc-200 p-4 space-y-3 font-sans shadow-2xl">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleNav(item.path)}
                  className="w-full text-left p-3 rounded-xl font-black text-xs text-black hover:bg-red-600 hover:text-white uppercase flex justify-between items-center transition"
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 space-y-2">
            <button 
              onClick={() => handleNav('webtv')}
              className="w-full bg-black text-white font-black text-xs py-3 rounded-xl flex items-center justify-center gap-2 border border-red-600"
            >
              <Tv size={16} className="text-red-600" /> Web TV FTTRESP Ao Vivo
            </button>
            <button 
              onClick={() => handleNav('admin')}
              className="w-full bg-red-600 text-white font-black text-xs py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Lock size={16} /> Acesso Operador CMS
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
