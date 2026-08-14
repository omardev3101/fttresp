import React from 'react';
import { Users, Building2, Award, ShieldCheck } from 'lucide-react';

export default function StatCounter() {
  const stats = [
    { number: "1.5M+", label: "Trabalhadores Representados", sub: "Motoristas e Rodoviários em SP", icon: Users },
    { number: "97", label: "Sindicatos Filiados", sub: "Rede Federativa em todo o Estado", icon: Building2 },
    { number: "70+", label: "Anos de História", sub: "Lutas e Conquistas Trabalhistas", icon: Award },
    { number: "100%", label: "Defesa dos Direitos", sub: "Pisos, PPR, Convenções e Saúde", icon: ShieldCheck }
  ];

  return (
    <section className="bg-slate-900 text-white py-6 border-y border-slate-800 relative overflow-hidden">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="text-center space-y-1 group">
              <div className="w-10 h-10 rounded-xl gradient-gold text-slate-950 flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition">
                <Icon size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">{item.number}</div>
              <div className="text-xs font-extrabold text-white uppercase">{item.label}</div>
              <div className="text-[11px] text-slate-400">{item.sub}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
