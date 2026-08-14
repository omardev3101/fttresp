import React from 'react';
import { Users, Building2, Award, ShieldCheck, Scale, Heart } from 'lucide-react';

export default function StatCounter() {
  const stats = [
    { number: "1.5M+", label: "Trabalhadores Representados", sub: "Motoristas e Rodoviários em todo SP", icon: Users },
    { number: "97", label: "Sindicatos Filiados", sub: "Rede Federativa em todo o Estado", icon: Building2 },
    { number: "70+", label: "Anos de História", sub: "Pioneirismo em Lutas Trabalhistas", icon: Award },
    { number: "100%", label: "Defesa dos Direitos", sub: "Pisos, PPR, Convenções e Saúde", icon: ShieldCheck }
  ];

  return (
    <section className="bg-slate-900 text-white py-14 border-y border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="text-center space-y-2 group">
              <div className="w-14 h-14 rounded-2xl gradient-gold text-slate-950 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition">
                <Icon size={28} />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">{item.number}</div>
              <div className="text-sm font-extrabold text-white uppercase">{item.label}</div>
              <div className="text-xs text-slate-400">{item.sub}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
