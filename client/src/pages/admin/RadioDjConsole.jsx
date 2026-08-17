import React, { useState } from 'react';
import { Play, Pause, Disc, Mic, Volume2, Radio, Zap, Music, Clock } from 'lucide-react';

export default function RadioDjConsole() {
  const [micActive, setMicActive] = useState(false);
  const [deckAPlaying, setDeckAPlaying] = useState(false);
  const [deckBPlaying, setDeckBPlaying] = useState(false);
  const [crossfader, setCrossfader] = useState(50);
  const [musicVolume, setMusicVolume] = useState(100);
  const [micVolume, setMicVolume] = useState(80);

  const jinglesList = [
    { id: 'j-1', name: 'VINHETA FTTRESP 1', type: 'Vinheta' },
    { id: 'j-2', name: 'HORA CERTA', type: 'Hora Certa' },
    { id: 'j-3', name: 'JINGLE RODOVIÁRIO', type: 'Jingle' },
    { id: 'j-4', name: 'APLAUSOS & FESTA', type: 'Efeito' },
    { id: 'j-5', name: 'SIRENE DE ALERTA', type: 'Efeito' },
    { id: 'j-6', name: 'CHAMADA CAMPANHA 2026', type: 'Vinheta' }
  ];

  const playJingle = (name) => {
    alert(`⚡ Executando Vinheta ao vivo: ${name}`);
  };

  return (
    <div className="bg-black text-white p-6 rounded-3xl border border-red-600 shadow-2xl space-y-6 font-sans">
      
      {/* TOP BAR PAINEL DJ PRO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-black text-red-500 uppercase tracking-wider">Mesa de Mixagem ao Vivo</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">PAINEL DJ PRO — CONSOLE DE MIXAGEM & LOCUÇÃO</h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMicActive(!micActive)}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition shadow-lg ${
              micActive 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <Mic size={16} /> {micActive ? '🔴 MICROFONE NO AR (LOCUÇÃO)' : '⚪ INICIAR LOCUÇÃO'}
          </button>

          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs px-3 py-2 rounded-xl">
            STANDBY
          </span>
        </div>
      </div>

      {/* TRACK NO AR ATUAL */}
      <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black animate-spin-slow">
            <Disc size={20} />
          </div>
          <div>
            <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-wider">TOCANDO AGORA NO STREAMING</span>
            <div className="text-sm font-black text-white">VEM ME AMAR - FORRÓ DO MUÍDO [MÚSICA NOVA!]</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-400 font-bold">
          <span>FAIXA ANTERIOR: <em>NENHUMA</em></span>
          <span>PRÓXIMA DA FILA: <em>FIM DA PLAYLIST</em></span>
        </div>
      </div>

      {/* DECKS DE VINIL A E B (MODELO IMAGEM 3) */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* DECK A */}
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <span className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> DECK A (MASTER)
            </span>
            <span className="text-xl font-black font-mono text-white">124.5 <small className="text-xs text-zinc-400">BPM</small></span>
          </div>

          <div className="flex items-center justify-center py-4">
            <div className={`w-36 h-36 rounded-full bg-black border-4 border-red-600 flex items-center justify-center shadow-2xl relative ${deckAPlaying ? 'animate-spin' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-xs">
                FTTRESP
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button 
              onClick={() => setDeckAPlaying(!deckAPlaying)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition ${
                deckAPlaying ? 'bg-red-600 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {deckAPlaying ? <Pause size={14} /> : <Play size={14} />} {deckAPlaying ? 'PAUSAR DECK A' : 'TOCAR DECK A'}
            </button>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700">SYNC</button>
              <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700">CUE</button>
            </div>
          </div>
        </div>

        {/* DECK B */}
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <span className="text-xs font-black text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> DECK B (STANDBY)
            </span>
            <span className="text-xl font-black font-mono text-white">128.0 <small className="text-xs text-zinc-400">BPM</small></span>
          </div>

          <div className="flex items-center justify-center py-4">
            <div className={`w-36 h-36 rounded-full bg-black border-4 border-blue-500 flex items-center justify-center shadow-2xl relative ${deckBPlaying ? 'animate-spin' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                SUB-DECK
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button 
              onClick={() => setDeckBPlaying(!deckBPlaying)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition ${
                deckBPlaying ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {deckBPlaying ? <Pause size={14} /> : <Play size={14} />} {deckBPlaying ? 'PAUSAR DECK B' : 'TOCAR DECK B'}
            </button>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700">SYNC</button>
              <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700">CUE</button>
            </div>
          </div>
        </div>

      </div>

      {/* CONSOLE DE MIXAGEM & CROSSFADER */}
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Volume2 size={16} className="text-red-500" /> Console de Mixagem & Faders de Volume
        </h3>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-[11px] text-zinc-400 uppercase mb-2">Volume da Música: {musicVolume}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={musicVolume}
              onChange={(e) => setMusicVolume(e.target.value)}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] text-zinc-400 uppercase mb-2 text-center">Crossfader (Deck A ◄ ► Deck B): {crossfader}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={crossfader}
              onChange={(e) => setCrossfader(e.target.value)}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] text-zinc-400 uppercase mb-2">Ganho do Microfone: {micVolume}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={micVolume}
              onChange={(e) => setMicVolume(e.target.value)}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* SOUNDBOARD / PAD DE VINHETAS (MODELO IMAGEM 3) */}
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-red-500" /> Soundboard de Vinhetas Instantâneas & Efeitos
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {jinglesList.map((j) => (
            <button
              key={j.id}
              onClick={() => playJingle(j.name)}
              className="bg-zinc-800 hover:bg-red-600 text-white p-3.5 rounded-2xl border border-zinc-700 text-xs font-black uppercase text-center transition hover:scale-105 shadow-md space-y-1"
            >
              <div className="text-[10px] text-red-400 font-mono">{j.type}</div>
              <div className="line-clamp-1">{j.name}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
