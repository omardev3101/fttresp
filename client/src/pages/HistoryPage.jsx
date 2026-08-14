import React from 'react';
import { Award, ShieldCheck, History, Users, Building2, CheckCircle2 } from 'lucide-react';

export default function HistoryPage() {
  const milestones = [
    { year: "Década de 1950", title: "Fundação da FTTRESP", desc: "Unificação dos primeiros sindicatos de condutores e rodoviários do estado de SP para negociar condições de trabalho unificadas." },
    { year: "Década de 1980", title: "Conquistas do Piso Salarial e PPR", desc: "Grandes paralisações estaduais resultam no reconhecimento da jornada especial dos motoristas e implantação da Participação nos Lucros." },
    { year: "Década de 2000", title: "Expansão para 97 Sindicatos Filiados", desc: "Adoção da rede federativa cobrindo a Capital, Grande SP, Baixada Santista, Campinas, Vale do Paraíba e todo o Interior." },
    { year: "Ano 2026", title: "Era Digital & Streaming", desc: "Lançamento da Plataforma Web TV Multi-Canais, Rádio Web 24h, Repositório Digital de Convenções e Painel CMS." }
  ];

  return (
    <div className="container py-12 space-y-12">
      {/* Header */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Trajetória de Luta em SP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">História & Conquistas da FTTRESP</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Mais de 70 anos construindo a história do transporte rodoviário paulista, representando motoristas de cargas, passageiros urbanos, intermunicipais, fretamento e entregadores.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 text-center">Marcos Históricos da Federação</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-3 relative hover-lift">
              <div className="bg-amber-500/10 text-amber-700 text-xs font-black px-3 py-1 rounded-full w-fit uppercase">
                {m.year}
              </div>
              <h3 className="font-extrabold text-slate-900 text-xl">{m.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
