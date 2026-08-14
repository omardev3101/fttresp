import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Globe, User, Building2, Filter } from 'lucide-react';

export default function UnionsPage({ unions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const regions = [
    "Todas as Regiões",
    "Capital",
    "Grande SP (ABCDMR)",
    "Região Metropolitana de Campinas",
    "Baixada Santista",
    "Interior (Ribeirão Preto)",
    "Interior (Sorocaba)",
    "Vale do Paraíba"
  ];

  const filteredUnions = unions.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = !selectedRegion || selectedRegion === "Todas as Regiões" || u.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container py-10 space-y-8">
      {/* Header Banner */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Diretório Federativo Oficial
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Central dos 97 Sindicatos Filiados em SP</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Consulte o sindicato representativo dos trabalhadores rodoviários da sua cidade ou região. Encontre telefones de atendimento, e-mails, endereços da sede e site oficial.
        </p>

        {/* Filter Bar */}
        <div className="grid md:grid-cols-12 gap-4 pt-4">
          <div className="md:col-span-8 relative">
            <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar por município, nome do sindicato ou setor (ex: Campinas, Santos, Cargas)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/90 text-white border border-slate-700 focus:border-amber-400 text-sm outline-none"
            />
          </div>

          <div className="md:col-span-4 relative">
            <Filter size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/90 text-white border border-slate-700 focus:border-amber-400 text-sm outline-none appearance-none"
            >
              {regions.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-slate-600 font-medium">
        <span>Exibindo <strong>{filteredUnions.length}</strong> de {unions.length} sindicatos parceiros registrados</span>
        {searchTerm && <button onClick={() => { setSearchTerm(''); setSelectedRegion(''); }} className="text-amber-600 font-bold underline">Limpar Filtros</button>}
      </div>

      {/* Unions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnions.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover-lift flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500/10 text-amber-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {u.region}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <MapPin size={13} /> {u.city}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                {u.name}
              </h3>

              <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium">
                <strong>Categoria:</strong> {u.category}
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <User size={14} className="text-slate-400 shrink-0" />
                  <span><strong>Presidente:</strong> {u.president}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span><strong>Fone:</strong> {u.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate"><strong>E-mail:</strong> {u.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2"><strong>Endereço:</strong> {u.address}</span>
                </li>
              </ul>
            </div>

            {u.website && (
              <a 
                href={u.website} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Globe size={14} /> Acessar Site do Sindicato
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
