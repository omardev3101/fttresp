import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Tag, Search } from 'lucide-react';

export default function AgreementsPage({ agreements }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedYear, setSelectedYear] = useState('Todos');
  const [previewPdf, setPreviewPdf] = useState(null);

  const categories = ['Todos', 'Carga', 'Passageiros Urbano', 'Fretamento', 'Entregadores/App'];
  const years = ['Todos', '2026', '2025', '2024'];

  const filtered = agreements.filter((a) => {
    const matchCat = selectedCategory === 'Todos' || a.category === selectedCategory;
    const matchYear = selectedYear === 'Todos' || String(a.year) === selectedYear;
    return matchCat && matchYear;
  });

  return (
    <div className="container py-10 space-y-8">
      {/* Header Banner */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Repositório Jurídico Digital
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Convenções e Acordos Coletivos de Trabalho</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Acesse a íntegra dos documentos normativos, pisos salariais, cláusulas sociais e benefícios pactuados pela FTTRESP para a categoria rodoviária.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-bold px-2">Setor:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  selectedCategory === c ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-bold px-2">Ano:</span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  selectedYear === y ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Modal Viewer if opened */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-amber-400 truncate">{previewPdf.title}</h3>
              <button onClick={() => setPreviewPdf(null)} className="bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded text-xs font-bold">
                Fechar Visualizador ✕
              </button>
            </div>
            <div className="aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
              <iframe src={previewPdf.fileUrl} title={previewPdf.title} className="w-full h-full border-none" />
            </div>
          </div>
        </div>
      )}

      {/* Agreements List */}
      <div className="space-y-4">
        {filtered.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover-lift flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-amber-500/10 text-amber-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  {a.category}
                </span>
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <Calendar size={14} /> Vigência: {a.effectiveDate}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-lg">
                {a.title}
              </h3>

              <p className="text-slate-600 text-sm max-w-3xl">
                {a.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setPreviewPdf(a)} 
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
              >
                <Eye size={16} /> Visualizar PDF na Tela
              </button>
              <a 
                href={a.fileUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="gradient-gold text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:scale-105 transition"
              >
                <Download size={16} /> Baixar PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
