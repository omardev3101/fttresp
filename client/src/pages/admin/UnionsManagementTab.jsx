import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, Phone, Mail, Globe, User, Building2, Shield, Filter } from 'lucide-react';

export default function UnionsManagementTab({ unionsList = [], handleOpenModal, handleDelete }) {
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

  const filteredUnions = unionsList.filter((u) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      !searchTerm ||
      (u.name && u.name.toLowerCase().includes(term)) ||
      (u.city && u.city.toLowerCase().includes(term)) ||
      (u.category && u.category.toLowerCase().includes(term)) ||
      (u.cnpj && u.cnpj.includes(term)) ||
      (u.president && u.president.toLowerCase().includes(term));
    
    const matchesRegion = !selectedRegion || selectedRegion === "Todas as Regiões" || (u.region && u.region.toLowerCase().includes(selectedRegion.toLowerCase()));

    return matchesSearch && matchesRegion;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUnions.length / itemsPerPage));
  const currentUnions = filteredUnions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner & Action */}
      <div className="bg-black text-white p-6 sm:p-8 rounded-3xl border border-red-600 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Gestão Cadastral Federativa
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Gestão dos Sindicatos Filiados</h2>
          <p className="text-zinc-400 text-xs mt-1">
            Cadastre novos sindicatos ou edite os dados cadastrais (CNPJ, Presidente, Endereço, Fone, E-mail, Região).
          </p>
        </div>

        <button
          onClick={() => handleOpenModal(null)}
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-2 shrink-0"
        >
          <Plus size={16} /> Cadastrar Novo Sindicato
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 shadow-sm grid md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-8 relative">
          <Search size={16} className="absolute left-3.5 top-3 text-zinc-400" />
          <input 
            type="text"
            placeholder="Buscar por nome do sindicato, cidade, CNPJ ou presidente..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-300 text-xs font-bold text-black outline-none focus:border-red-600 shadow-inner"
          />
        </div>

        <div className="md:col-span-4 relative">
          <Filter size={14} className="absolute left-3.5 top-3.5 text-zinc-400" />
          <select 
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-zinc-300 text-xs font-bold text-black outline-none cursor-pointer"
          >
            {regions.map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
        <span>Exibindo <strong>{((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredUnions.length)}</strong> de {unionsList.length} sindicatos gravados</span>
        {(searchTerm || selectedRegion) && (
          <button 
            onClick={() => { setSearchTerm(''); setSelectedRegion(''); setCurrentPage(1); }} 
            className="text-red-600 font-black underline uppercase"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Unions Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentUnions.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm hover:border-red-600 transition flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Nº {u.number || u.id.replace('u-', '')} • {u.city}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase">{u.region}</span>
              </div>

              <h3 className="font-extrabold text-black text-sm leading-snug line-clamp-2">
                {u.name}
              </h3>

              {u.cnpj && (
                <div className="text-[10px] font-mono font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 inline-block">
                  CNPJ: {u.cnpj}
                </div>
              )}

              <div className="text-xs text-zinc-600 space-y-1 pt-1 border-t border-zinc-100">
                <div><strong>Presidente:</strong> {u.president || 'Não informado'}</div>
                <div><strong>Fone:</strong> {u.phone || 'Não informado'}</div>
                <div className="truncate"><strong>E-mail:</strong> {u.email || 'Não informado'}</div>
                <div className="line-clamp-2 text-[11px]"><strong>Endereço:</strong> {u.address || 'Não informado'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
              <button
                onClick={() => handleOpenModal(u)}
                className="flex-1 bg-black hover:bg-zinc-800 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Edit size={14} /> Editar
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                title="Excluir Sindicato"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredUnions.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 shadow-sm max-w-full overflow-hidden">
          <span className="text-xs text-zinc-600 font-bold shrink-0">
            Página {currentPage} de {totalPages} • Total: {filteredUnions.length} sindicatos
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm"
            >
              ◄ Anterior
            </button>
            <span className="text-xs font-black text-black px-2">{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm"
            >
              Próxima ►
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
