import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Globe, User, Building2, Filter } from 'lucide-react';

export default function UnionsPage({ unions = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const regions = [
    "Todas as Regiões",
    "Capital",
    "Grande SP (ABCDMR)",
    "Região Metropolitana de Campinas",
    "Baixada Santista",
    "Vale do Paraíba",
    "Noroeste Paulista",
    "Central Paulista",
    "Alta Sorocabana / Oeste"
  ];

  const filteredUnions = unions.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      !searchTerm ||
      (u.name && u.name.toLowerCase().includes(term)) ||
      (u.city && u.city.toLowerCase().includes(term)) ||
      (u.category && u.category.toLowerCase().includes(term)) ||
      (u.cnpj && u.cnpj.includes(term)) ||
      (u.address && u.address.toLowerCase().includes(term)) ||
      (u.president && u.president.toLowerCase().includes(term));
    
    const matchesRegion = !selectedRegion || selectedRegion === "Todas as Regiões" || (u.region && u.region.toLowerCase().includes(selectedRegion.toLowerCase()));

    return matchesSearch && matchesRegion;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUnions.length / itemsPerPage));
  const currentUnions = filteredUnions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderCompactPagination = (currPg, totPgs, setPg) => {
    if (totPgs <= 1) return null;

    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totPgs; i++) {
      if (
        i === 1 ||
        i === totPgs ||
        (i >= currPg - delta && i <= currPg + delta)
      ) {
        pages.push(i);
      } else if (
        (i === currPg - delta - 1 && i > 1) ||
        (i === currPg + delta + 1 && i < totPgs)
      ) {
        pages.push('...');
      }
    }

    const filteredPages = pages.filter((item, index, array) => {
      return item !== '...' || array[index - 1] !== '...';
    });

    return (
      <div className="flex items-center gap-1.5 flex-wrap max-w-full overflow-x-auto py-1">
        <button
          disabled={currPg === 1}
          onClick={() => setPg(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm shrink-0"
        >
          ◄ Anterior
        </button>

        {filteredPages.map((pg, idx) => {
          if (pg === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-1 text-xs font-bold text-zinc-400 select-none shrink-0">
                ...
              </span>
            );
          }
          return (
            <button
              key={`pg-num-${pg}`}
              onClick={() => setPg(pg)}
              className={`w-8 h-8 rounded-xl text-xs font-black transition shrink-0 ${
                currPg === pg
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-black border border-zinc-300 hover:bg-zinc-100'
              }`}
            >
              {pg}
            </button>
          );
        })}

        <button
          disabled={currPg === totPgs}
          onClick={() => setPg(prev => Math.min(prev + 1, totPgs))}
          className="px-3 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm shrink-0"
        >
          Próxima ►
        </button>
      </div>
    );
  };

  return (
    <div className="container py-10 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-black text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4 border border-red-600">
        <span className="bg-red-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          Diretório Federativo Oficial
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Central dos 97 Sindicatos Filiados em SP</h1>
        <p className="text-zinc-300 text-base max-w-3xl font-medium">
          Consulte o sindicato representativo dos trabalhadores rodoviários da sua cidade ou região. Encontre CNPJ, telefones de atendimento, e-mails, endereços completos e o nome do Presidente oficial da entidade.
        </p>

        {/* Filter Bar */}
        <div className="grid md:grid-cols-12 gap-4 pt-4">
          <div className="md:col-span-8 relative">
            <Search size={20} className="absolute left-4 top-3.5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Pesquisar por município, nome do sindicato, CNPJ ou presidente (ex: Americana, Santos, CNPJ...)..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-800 focus:border-red-600 text-sm outline-none font-bold"
            />
          </div>

          <div className="md:col-span-4 relative">
            <Filter size={18} className="absolute left-4 top-3.5 text-zinc-400" />
            <select 
              value={selectedRegion} 
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-800 focus:border-red-600 text-sm outline-none appearance-none font-bold cursor-pointer"
            >
              {regions.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-zinc-600 font-bold">
        <span>Exibindo edições <strong>{((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredUnions.length)}</strong> de {unions.length} sindicatos oficiais filiados</span>
        {(searchTerm || selectedRegion) && (
          <button 
            onClick={() => { setSearchTerm(''); setSelectedRegion(''); setCurrentPage(1); }} 
            className="text-red-600 font-black underline text-xs uppercase"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Unions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUnions.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-md hover-lift flex flex-col justify-between space-y-4 hover:border-red-600">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  Nº {u.number || u.id.replace('u-', '')} • {u.region || 'São Paulo'}
                </span>
                <span className="text-xs font-black text-black flex items-center gap-1">
                  <MapPin size={13} className="text-red-600" /> {u.city}
                </span>
              </div>

              <h3 className="font-black text-black text-base leading-snug">
                {u.name}
              </h3>

              {u.cnpj && (
                <div className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-lg border border-zinc-200 inline-block">
                  <strong>CNPJ:</strong> {u.cnpj}
                </div>
              )}

              <div className="text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 font-medium">
                <strong>Categoria:</strong> {u.category}
              </div>

              <ul className="space-y-2 text-xs text-zinc-700 font-medium">
                <li className="flex items-center gap-2">
                  <User size={14} className="text-red-600 shrink-0" />
                  <span><strong>Presidente:</strong> {u.president}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-red-600 shrink-0" />
                  <span><strong>Fone:</strong> {u.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-red-600 shrink-0" />
                  <span className="truncate"><strong>E-mail:</strong> {u.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-red-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2"><strong>Endereço:</strong> {u.address}</span>
                </li>
              </ul>
            </div>

            {u.website && (
              <a 
                href={u.website} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Globe size={14} /> Acessar Portal do Sindicato
              </a>
            )}
          </div>
        ))}
      </div>

      {/* CONTROLES DE PAGINAÇÃO DE SINDICATOS */}
      {filteredUnions.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 shadow-sm max-w-full overflow-hidden">
          <span className="text-xs text-zinc-600 font-bold shrink-0">
            Página {currentPage} de {totalPages} • Total: {filteredUnions.length} sindicatos
          </span>

          {renderCompactPagination(currentPage, totalPages, setCurrentPage)}
        </div>
      )}
    </div>
  );
}
