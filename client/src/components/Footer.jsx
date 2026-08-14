import React from 'react';
import { Phone, Mail, MapPin, Radio, Tv } from 'lucide-react';

export default function Footer({ settings, setCurrentPage }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-6 pb-4 border-t border-slate-800 mt-8 font-sans">
      <div className="container grid md:grid-cols-3 gap-6 mb-4">
        
        {/* PARTE 1: INSTITUCIONAL FTTRESP */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img 
              src={settings?.logoUrl || "/logo_fttresp.png"} 
              alt="Logo Oficial FTTRESP" 
              className="w-9 h-9 object-contain"
            />
            <span className="font-extrabold text-white text-sm tracking-tight">FTTRESP SP</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Representando mais de 1,5 milhão de profissionais e 97 sindicatos filiados.
          </p>
        </div>

        {/* PARTE 2: AVISOS & LINKS RÁPIDOS */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs border-l-3 border-amber-500 pl-2 uppercase tracking-wider">Acesso Rápido</h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-400">
            <button onClick={() => setCurrentPage('home')} className="text-left hover:text-amber-400 transition truncate">• Início</button>
            <button onClick={() => setCurrentPage('unions')} className="text-left hover:text-amber-400 transition truncate">• 97 Sindicatos</button>
            <button onClick={() => setCurrentPage('salary')} className="text-left hover:text-amber-400 transition truncate">• Pisos Salariais</button>
            <button onClick={() => setCurrentPage('agreements')} className="text-left hover:text-amber-400 transition truncate">• Convenções</button>
            <button onClick={() => setCurrentPage('calculator')} className="text-left hover:text-amber-400 transition truncate">• Simulador Direitos</button>
            <button onClick={() => setCurrentPage('webtv')} className="text-left hover:text-amber-400 transition truncate">• Web TV Ao Vivo</button>
          </div>
        </div>

        {/* PARTE 3: ATENDIMENTO SEDE & MÍDIAS */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs border-l-3 border-amber-500 pl-2 uppercase tracking-wider">Atendimento Sede FTTRESP</h4>
          <ul className="space-y-1 text-xs text-slate-400">
            <li className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="text-amber-400 shrink-0" />
              <span className="truncate">{settings?.address || 'Av. Duque de Caxias, 108 - Santa Efigênia - São Paulo/SP'}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Phone size={13} className="text-amber-400 shrink-0" /> {settings?.phone || '(11) 3217-7272 / (11) 3437-7320'}
              </span>
            </li>
          </ul>

          <div className="flex items-center gap-2 pt-1">
            <button 
              onClick={() => setCurrentPage('webtv')} 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1 transition"
            >
              <Tv size={12} /> Web TV
            </button>
            <button 
              onClick={() => setCurrentPage('radioweb')} 
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1 transition border border-slate-700"
            >
              <Radio size={12} /> Rádio Web 24h
            </button>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="container border-t border-slate-900 pt-3 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-1">
        <div>
          {settings?.copyright || '© 2016 Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Todos os direitos reservados'}
        </div>
        <div className="text-slate-400 font-semibold">
          Desenvolvido por <strong className="text-amber-400">PES Tecnologia Ltda.</strong>
        </div>
      </div>
    </footer>
  );
}
