import React, { useState } from 'react';
import { LayoutGrid, Activity, Music, Clock, Volume2, Radio, Play, Pause, Users, Database, Globe } from 'lucide-react';
import RadioDjConsole from './RadioDjConsole';
import RadioDiscoteca from './RadioDiscoteca';
import RadioGrade247 from './RadioGrade247';

export default function RadioManagementTab({ tracksList = [], refreshTracks }) {
  const [radioSubTab, setRadioSubTab] = useState('DASHBOARD');

  return (
    <div className="space-y-6 font-sans">
      
      {/* CABEÇALHO DO PAINEL GESTÃO DE RÁDIO */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <h2 className="text-3xl font-black text-black tracking-tight uppercase">GESTÃO DE RÁDIO</h2>
        <p className="text-zinc-600 text-sm font-medium mt-1">
          Console central para controle de streaming, biblioteca musical e locução ao vivo.
        </p>
      </div>

      {/* 4 CARTOES NAVEGAÇÃO PRINCIPAL (MODELO IMAGEM 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* CARD 1: DASHBOARD */}
        <div 
          onClick={() => setRadioSubTab('DASHBOARD')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            radioSubTab === 'DASHBOARD' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">DASHBOARD</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">ESTATÍSTICAS E MONITOR</p>
          </div>
        </div>

        {/* CARD 2: PAINEL DJ */}
        <div 
          onClick={() => setRadioSubTab('PAINEL_DJ')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            radioSubTab === 'PAINEL_DJ' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">PAINEL DJ</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">MIXAGEM E LOCUÇÃO</p>
          </div>
        </div>

        {/* CARD 3: DISCOTECA */}
        <div 
          onClick={() => setRadioSubTab('DISCOTECA')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            radioSubTab === 'DISCOTECA' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <Music size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">DISCOTECA</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">BIBLIOTECA DE ÁUDIO</p>
          </div>
        </div>

        {/* CARD 4: GRADE DA RÁDIO */}
        <div 
          onClick={() => setRadioSubTab('GRADE')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            radioSubTab === 'GRADE' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">GRADE DA RÁDIO</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">AUTO DJ E AGENDAMENTOS</p>
          </div>
        </div>

      </div>

      {/* RENDERIZAÇÃO DA SUB-VISÃO SELECIONADA */}
      {radioSubTab === 'DASHBOARD' && (
        <div className="bg-black text-white p-6 rounded-3xl border border-zinc-800 shadow-2xl space-y-6">
          
          {/* 4 CARDS DE KPI (MODELO IMAGEM 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                <Users size={14} className="text-blue-500" /> OUVINTES AGORA
              </div>
              <div className="text-3xl font-black text-white">1</div>
              <span className="text-[10px] font-extrabold text-red-500 uppercase">● Ao Vivo</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                <Music size={14} className="text-red-500" /> MÚSICAS NO AR
              </div>
              <div className="text-3xl font-black text-white">40</div>
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase">Playlist Ativa</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                <Database size={14} className="text-emerald-500" /> ESPAÇO EM DISCO
              </div>
              <div className="text-3xl font-black text-white">0.0 MB</div>
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase">Servidor OK</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                <Globe size={14} className="text-purple-500" /> TRÁFEGO MENSAL
              </div>
              <div className="text-3xl font-black text-white">1.5 GB</div>
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase">Banda Acumulada</span>
            </div>
          </div>

          {/* BARRA EXECUTANDO AGORA */}
          <div className="grid md:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase font-black">RECÉM EXECUTADA</span>
              <div className="text-zinc-300 font-bold">NENHUMA ANTERIOR</div>
            </div>

            <div className="bg-zinc-900 p-3 rounded-2xl border border-red-600 bg-red-950/20">
              <span className="text-[10px] text-red-500 uppercase font-black">EXECUTANDO AGORA (NO AR)</span>
              <div className="text-white font-black truncate">VEM ME AMAR - FORRÓ DO MUÍDO [MUSICA NOVA!]</div>
            </div>

            <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
              <span className="text-[10px] text-emerald-500 uppercase font-black">PRÓXIMA DA FILA</span>
              <div className="text-zinc-300 font-bold">FIM DA PLAYLIST</div>
            </div>
          </div>

          {/* MONITOR GLOBAL E AUDIÊNCIA LOCAL (MODELO IMAGEM 2) */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* MONITOR GLOBAL DA RÁDIO */}
            <div className="lg:col-span-8 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-emerald-500/20 text-emerald-400 font-black text-[10px] px-2.5 py-1 rounded-lg uppercase">
                    ● TRANSMISSÃO ONLINE
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mt-1">MONITOR GLOBAL DA RÁDIO</h3>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setRadioSubTab('GRADE')}
                    className="px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-black uppercase hover:bg-zinc-700"
                  >
                    GRADE
                  </button>
                  <button 
                    onClick={() => setRadioSubTab('PAINEL_DJ')}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-black uppercase hover:bg-red-700 shadow-md"
                  >
                    ABRIR CONSOLE DJ
                  </button>
                </div>
              </div>

              {/* EQUALIZADOR DINÂMICO DE ONDAS */}
              <div className="h-28 flex items-end justify-between gap-1 py-2">
                {[40, 65, 30, 85, 95, 45, 60, 75, 100, 80, 50, 70, 90, 35, 60, 85, 95, 40, 65, 80, 55, 75, 90, 100, 45, 60, 80, 70, 50, 65, 85].map((h, idx) => (
                  <div 
                    key={`wave-${idx}`}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-red-600 rounded-t-sm transition-all duration-300 opacity-90 hover:opacity-100"
                  ></div>
                ))}
              </div>

              <div className="bg-black p-4 rounded-2xl border border-zinc-800 space-y-2">
                <div className="flex justify-between text-xs text-zinc-400 font-bold">
                  <span>TOCANDO AGORA: <strong>VEM ME AMAR - FORRÓ DO MUÍDO</strong></span>
                  <span className="font-mono text-red-500">-0:09</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div className="w-4/5 h-full bg-red-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* AUDIÊNCIA LOCAL DA RÁDIO */}
            <div className="lg:col-span-4 bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-xs font-black uppercase text-zinc-400 flex items-center gap-1.5">
                <Globe size={14} className="text-red-500" /> AUDIÊNCIA LOCAL AO VIVO
              </h3>

              {/* CIRCULO DE SINTONIA DA RÁDIO */}
              <div className="relative w-40 h-40 rounded-full border-4 border-red-600 flex flex-col items-center justify-center shadow-2xl bg-black">
                <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase absolute top-4">
                  AO VIVO
                </span>
                <span className="text-5xl font-black text-white mt-2">1</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Pessoa Sintonizada</span>
              </div>

              <p className="text-[11px] text-zinc-500 font-semibold">Qualidade: 128kbps / Stereo</p>
            </div>

          </div>

        </div>
      )}

      {radioSubTab === 'PAINEL_DJ' && <RadioDjConsole />}

      {radioSubTab === 'DISCOTECA' && (
        <RadioDiscoteca tracksList={tracksList} refreshTracks={refreshTracks} />
      )}

      {radioSubTab === 'GRADE' && <RadioGrade247 />}

    </div>
  );
}
