import React, { useState, useEffect } from 'react';
import { Clock, Sun, CloudRain, Thermometer, Radio, Tv } from 'lucide-react';

export default function TVOverlay({ currentChannel, newsList }) {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [cityIndex, setCityIndex] = useState(0);

  const spCities = [
    { city: "São Paulo", temp: "23°C", cond: "Ensolarado" },
    { city: "Campinas", temp: "25°C", cond: "Parcialmente Nublado" },
    { city: "Santos", temp: "26°C", cond: "Sol com Nuvens" },
    { city: "Ribeirão Preto", temp: "28°C", cond: "Ensolarado" },
    { city: "Sorocaba", temp: "24°C", cond: "Claro" },
    { city: "S. José dos Campos", temp: "22°C", cond: "Fresco" }
  ];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR'));
      setDateStr(now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cityInterval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % spCities.length);
    }, 4000);
    return () => clearInterval(cityInterval);
  }, []);

  const currentCity = spCities[cityIndex];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
      {/* Top Overlay Bar */}
      <div className="flex justify-between items-start gap-4">
        {/* Logo & Channel Tag */}
        <div className="bg-slate-950/85 backdrop-blur-md text-white p-3 rounded-xl border border-white/10 shadow-xl pointer-events-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
            TV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">{currentChannel?.name || "TV FTTRESP"}</span>
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span> AO VIVO
              </span>
            </div>
            <div className="text-xs text-amber-400 font-semibold">{currentChannel?.currentShow || "Programação Oficial"}</div>
          </div>
        </div>

        {/* Real-time Clock & Weather Widget */}
        <div className="bg-slate-950/85 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-white/10 shadow-xl pointer-events-auto flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold">{dateStr}</div>
            <div className="text-lg font-black font-mono text-amber-400 leading-none flex items-center gap-1">
              <Clock size={14} /> {time}
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <Sun size={20} className="text-amber-400 animate-spin-slow" />
            <div>
              <div className="text-xs font-bold text-white leading-none">{currentCity.city}</div>
              <div className="text-xs text-amber-400 font-extrabold">{currentCity.temp} • {currentCity.cond}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom News Ticker (Lower Thirds) */}
      <div className="bg-slate-950/90 backdrop-blur-md text-white rounded-xl border border-white/10 shadow-2xl overflow-hidden pointer-events-auto flex items-center">
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 font-black text-xs uppercase tracking-wider shrink-0 flex items-center gap-2">
          <Tv size={16} /> NOTÍCIAS FTTRESP
        </div>
        <div className="overflow-hidden py-2 px-4 whitespace-nowrap text-xs font-semibold text-slate-200">
          <span className="inline-block animate-marquee">
            {newsList && newsList.length > 0
              ? newsList.map(n => `🚨 ${n.title} — ${n.summary}`).join('   ||   ')
              : "FTTRESP em defesa dos 1,5 milhão de trabalhadores rodoviários de SP — Convenções Coletivas atualizadas no portal."
            }
          </span>
        </div>
      </div>
    </div>
  );
}
