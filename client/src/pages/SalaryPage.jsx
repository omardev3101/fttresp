import React, { useState } from 'react';
import { DollarSign, Calculator, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import RightsCalculatorPage from './RightsCalculatorPage';

export default function SalaryPage() {
  const [activeSubTab, setActiveSubTab] = useState('piso');

  const salaryTable = [
    { category: "Motorista de Transporte Rodoviário de Cargas (Geral)", floor: "R$ 3.450,00", hrExtra: "R$ 23,52", dailyAllowance: "R$ 38,50 / dia", PPR: "R$ 1.850,00 / ano" },
    { category: "Motorista de Transporte Coletivo Urbano de Passageiros", floor: "R$ 3.820,00", hrExtra: "R$ 26,05", dailyAllowance: "R$ 42,00 / dia", PPR: "R$ 2.100,00 / ano" },
    { category: "Motorista de Fretamento e Turismo", floor: "R$ 3.380,00", hrExtra: "R$ 23,04", dailyAllowance: "R$ 45,00 / pernoite", PPR: "R$ 1.600,00 / ano" },
    { category: "Motorista de Carreta / Bi-Trem / Bitrem Graneleiro", floor: "R$ 4.250,00", hrExtra: "R$ 28,97", dailyAllowance: "R$ 48,00 / dia", PPR: "R$ 2.400,00 / ano" },
    { category: "Entregadores Motorizados (Moto / Cargas Leves)", floor: "R$ 2.650,00", hrExtra: "R$ 18,06", dailyAllowance: "Taxa km R$ 2,50", PPR: "R$ 1.200,00 / ano" }
  ];

  return (
    <div className="container py-12 space-y-10">
      {/* Header */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Pisos Salariais & Tabela Normativa 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Pisos Salariais & Direitos Rodoviários de SP</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Valores de referência pactuados pela FTTRESP e sindicatos filiados para as diversas modalidades do transporte no Estado de São Paulo.
        </p>

        {/* Sub Navigation */}
        <div className="flex items-center gap-3 pt-4">
          <button 
            onClick={() => setActiveSubTab('piso')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${
              activeSubTab === 'piso' ? 'gradient-gold text-slate-950 font-black shadow-md' : 'bg-slate-950 text-white border border-slate-700'
            }`}
          >
            <DollarSign size={16} /> Tabela de Pisos Salariais
          </button>
          <button 
            onClick={() => setActiveSubTab('simulador')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${
              activeSubTab === 'simulador' ? 'gradient-gold text-slate-950 font-black shadow-md' : 'bg-slate-950 text-white border border-slate-700'
            }`}
          >
            <Calculator size={16} /> Simulador de Rendimentos
          </button>
        </div>
      </div>

      {activeSubTab === 'piso' ? (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <DollarSign className="text-amber-600" size={22} /> Tabela de Referência da Categoria Rodoviária (SP 2026)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-extrabold">
                    <th className="p-4 rounded-tl-xl">Categoria Profissional</th>
                    <th className="p-4">Piso Salarial Base</th>
                    <th className="p-4">Hora Extra 50%</th>
                    <th className="p-4">Diária de Viagem / Vale</th>
                    <th className="p-4 rounded-tr-xl">PPR / PLR Anual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {salaryTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-slate-900">{row.category}</td>
                      <td className="p-4 text-emerald-700 font-extrabold font-mono">{row.floor}</td>
                      <td className="p-4 font-mono">{row.hrExtra}</td>
                      <td className="p-4 font-mono">{row.dailyAllowance}</td>
                      <td className="p-4 text-amber-700 font-bold font-mono">{row.PPR}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <RightsCalculatorPage />
      )}
    </div>
  );
}
