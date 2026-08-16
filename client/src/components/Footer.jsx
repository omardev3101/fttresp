import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';

export default function Footer({ setCurrentPage, settings }) {
  return (
    <footer className="bg-black text-white pt-10 pb-6 border-t-4 border-red-600 font-sans">
      <div className="container space-y-8">
        
        {/* RODAPÉ DIVIDIDO EM 3 PARTES COMPACTAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-800">
          
          {/* PARTE 1: INSTITUCIONAL FTTRESP */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-300 p-1 flex items-center justify-center shrink-0 shadow-md">
                <img 
                  src={settings?.logoUrl || "/logo_fttresp.png"} 
                  alt="Logo Oficial FTTRESP" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-white text-base tracking-tight">FTTRESP SP</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Representando mais de 1,5 milhão de profissionais e 97 sindicatos filiados.
            </p>
          </div>

          {/* PARTE 2: ACESSO RÁPIDO AOS SERVIÇOS */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-red-500 uppercase tracking-wider">Acesso Rápido</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-semibold text-zinc-300">
              <li>
                <button onClick={() => setCurrentPage('unions')} className="hover:text-red-500 transition text-left">
                  • 97 Sindicatos SP
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('salary')} className="hover:text-red-500 transition text-left">
                  • Pisos Salariais
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('agreements')} className="hover:text-red-500 transition text-left">
                  • Convenções PDF
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('webtv')} className="hover:text-red-500 transition text-left">
                  • Web TV Ao Vivo
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('calculator')} className="hover:text-red-500 transition text-left">
                  • Simulador Direitos
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-red-500 transition text-left">
                  • Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* PARTE 3: ATENDIMENTO DA SEDE */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-red-500 uppercase tracking-wider">Atendimento Sede</h4>
            <div className="space-y-2 text-xs text-zinc-300 font-medium">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>{settings?.address || 'Av. Duque de Caxias, 108 - Santa Efigênia - São Paulo/SP'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-red-500 shrink-0" />
                <span>{settings?.phone || 'Tels.: (11) 3217-7272 / (11) 3437-7320'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-red-500 shrink-0" />
                <span>{settings?.workingHours || 'Segunda a Sexta: 08:00 às 17:00'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* COPYRIGHT E DIREITOS RESERVADOS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500 font-bold">
          <div>
            {settings?.copyright || '© 2016 Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Todos os direitos reservados.'}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-red-600" />
            <span className="text-zinc-400">Portal Oficial FTTRESP</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
