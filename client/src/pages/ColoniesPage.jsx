import React from 'react';
import { Sun, MapPin, Users, Heart, Phone, Calendar } from 'lucide-react';

export default function ColoniesPage() {
  const colonies = [
    {
      name: "Colônia de Férias de Praia Grande (Litoral Sul SP)",
      location: "Praia Grande - SP (Vila Mirim)",
      description: "Apartamentos equipados a 50 metros da praia, restaurante próprio, piscinas adulto e infantil, salão de jogos e área de lazer familiar.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      phone: "(11) 3228-5000 / Ramal Lazer"
    },
    {
      name: "Colônia de Férias de Caraguatatuba (Litoral Norte SP)",
      location: "Caraguatatuba - SP",
      description: "Ampla estrutura de hospedagem para a família rodoviária com café da manhã incluso, quadra poliesportiva e fácil acesso às praias do Litoral Norte.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      phone: "(11) 3228-5000 / Ramal Lazer"
    },
    {
      name: "Clube de Campo e Lazer do Interior (Sorocaba / Campinas)",
      location: "Região de Sorocaba e Campinas - SP",
      description: "Quiosques com churrasqueiras, campos de futebol society, parque aquático infantil e lanchonetes para finais de semana.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
      phone: "(11) 3228-5000 / Ramal Lazer"
    }
  ];

  return (
    <div className="container py-12 space-y-10">
      {/* Header */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Lazer & Bem-Estar da Família Rodoviária
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Colônias de Férias & Clubes parceiros</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Reservas com tarifas preferenciais para os trabalhadores associados aos 97 sindicatos filiados da FTTRESP.
        </p>
      </div>

      {/* Colonies Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {colonies.map((c, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover-lift flex flex-col justify-between">
            <div>
              <div className="relative aspect-video overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-slate-950/80 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                  {c.location}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{c.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{c.description}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-3">
              <div className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold">
                <Phone size={14} className="text-amber-600" /> Reservas: {c.phone}
              </div>
              <button className="w-full gradient-gold text-slate-950 font-black text-xs py-3 rounded-xl shadow-md">
                Solicitar Reserva de Férias
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
