import React, { useState, useEffect } from 'react';
import { Tv, Play, Calendar, Clock, ShieldCheck, Volume2, Share2, Layers, Award } from 'lucide-react';
import TVOverlay from '../components/TVOverlay';

export default function WebTVPage({ tvChannels, tvSchedules, news }) {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showAd, setShowAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);

  useEffect(() => {
    if (tvChannels && tvChannels.length > 0 && !selectedChannel) {
      setSelectedChannel(tvChannels[0]);
    }
  }, [tvChannels]);

  const handleChannelSelect = (ch) => {
    setSelectedChannel(ch);
    setShowAd(true);
    setAdCountdown(5);
  };

  useEffect(() => {
    let timer;
    if (showAd && adCountdown > 0) {
      timer = setInterval(() => setAdCountdown((prev) => prev - 1), 1000);
    } else if (showAd && adCountdown === 0) {
      setShowAd(false);
    }
    return () => clearInterval(timer);
  }, [showAd, adCountdown]);

  const activeSchedules = tvSchedules?.filter(s => s.channelId === selectedChannel?.id) || [];

  return (
    <div className="container py-10 space-y-10">
      {/* Header Banner */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Plataforma Web TV Multi-Canais 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">TV FTTRESP — Transmissão e Grade Digital</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Assista à grade completa da televisão corporativa rodoviária. Transmissão de assembleias ao vivo, jornais do setor, cobertura dos 97 sindicatos e programas de treinamento.
        </p>

        {/* Channel Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {tvChannels.map((ch) => {
            const active = selectedChannel?.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleChannelSelect(ch)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                  active 
                    ? 'gradient-gold text-slate-950 shadow-lg scale-105 font-extrabold' 
                    : 'bg-slate-950/80 text-white border border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Tv size={16} />
                <span>{ch.name}</span>
                {ch.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${active ? 'bg-slate-950 text-amber-400' : 'bg-red-600 text-white'}`}>
                    {ch.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Player + Overlay */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Video Box */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden border-2 border-slate-800 shadow-2xl">
            {/* Pre-roll Ad Overlay */}
            {showAd ? (
              <div className="absolute inset-0 bg-slate-950 z-30 flex flex-col items-center justify-center p-6 text-white text-center space-y-4">
                <div className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Patrocínio Especial FTTRESP
                </div>
                <h3 className="text-2xl font-black text-white">Anúncio Institucional Patrocinado</h3>
                <p className="text-slate-400 text-sm max-w-md">Iniciando a transmissão do canal {selectedChannel?.name}...</p>
                <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-amber-400 font-mono">
                  O vídeo iniciará em {adCountdown} segundos
                </div>
              </div>
            ) : (
              <>
                <TVOverlay currentChannel={selectedChannel} newsList={news} />
                {selectedChannel?.defaultVideoUrl ? (
                  <iframe 
                    src={`${selectedChannel.defaultVideoUrl}?autoplay=1&mute=0`}
                    title={selectedChannel.name}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    Sinal ao vivo não disponível no momento.
                  </div>
                )}
              </>
            )}
          </div>

          {/* Video Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-slate-900 text-xl">{selectedChannel?.name}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Sinal Digital 1080p</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{selectedChannel?.description}</p>
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
                <Calendar size={18} /> Grade de Programação Semanal
              </h3>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">Loop 24h</span>
            </div>

            <div className="space-y-3">
              {activeSchedules.length > 0 ? (
                activeSchedules.map((s) => (
                  <div key={s.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 hover:border-amber-500/50 transition">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-400 font-bold">{s.dayOfWeek}</span>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">{s.time}</span>
                    </div>
                    <div className="font-extrabold text-sm text-white">{s.title}</div>
                    <p className="text-xs text-slate-400 leading-snug">{s.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-6 text-center">
                  Grade contínua de programação em reprodução automática.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
