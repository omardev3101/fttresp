import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Radio, Tv } from 'lucide-react';

export default function Footer({ settings, setCurrentPage }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-20">
      <div className="container grid-4 gap-8 mb-12">
        {/* Coluna 1: Sobre */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center font-black text-slate-950 text-lg">
              F
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">FTTRESP</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Representando mais de 1,5 milhão de profissionais e 97 sindicatos filiados.
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage('webtv')} 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
            >
              <Tv size={14} /> Web TV Ao Vivo
            </button>
            <button 
              onClick={() => setCurrentPage('radioweb')} 
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
            >
              <Radio size={14} /> Rádio Web 24h
            </button>
          </div>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-l-4 border-amber-500 pl-3">Links Institucionais</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-amber-400 transition">Página Inicial</button></li>
            <li><button onClick={() => setCurrentPage('unions')} className="hover:text-amber-400 transition">Central dos 97 Sindicatos</button></li>
            <li><button onClick={() => setCurrentPage('agreements')} className="hover:text-amber-400 transition">Convenções Coletivas</button></li>
            <li><button onClick={() => setCurrentPage('calculator')} className="hover:text-amber-400 transition">Simulador de Direitos</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-amber-400 transition">Canal de Denúncias Anônimas</button></li>
          </ul>
        </div>

        {/* Coluna 3: Categorias Atendidas */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-l-4 border-amber-500 pl-3">Setores Atendidos</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>• Transporte Rodoviário de Cargas</li>
            <li>• Transporte Urbano de Passageiros</li>
            <li>• Transporte Intermunicipal e Estaduais</li>
            <li>• Fretamento e Turismo</li>
            <li>• Entregadores e Transportes de App</li>
          </ul>
        </div>

        {/* Coluna 4: Contato Sede */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 border-l-4 border-amber-500 pl-3">Atendimento à Categoria</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{settings?.address || 'Rua do Carmo, 56 - Centro, São Paulo - SP'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={18} className="text-amber-400 shrink-0" />
              <span>{settings?.phone || '(11) 3228-5000'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={18} className="text-amber-400 shrink-0" />
              <span>{settings?.email || 'contato@fttresp.org.br'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container border-t border-slate-900 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          © 2026 FTTRESP - Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-2 font-semibold text-slate-400">
          <span>Criado por <strong>PES Tecnologia Ltda.</strong></span>
        </div>
      </div>
    </footer>
  );
}
