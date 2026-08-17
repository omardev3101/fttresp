import React, { useState } from 'react';
import { 
  Tv, Clock, Type, Megaphone, Monitor, Activity, Plus, Edit, Trash2, Settings 
} from 'lucide-react';

export default function TvManagementTab({ 
  channelsList = [], 
  handleOpenModal, 
  handleToggleHomeTransmit, 
  handleToggleStatus, 
  handleDelete 
}) {
  const [tvSubTab, setTvSubTab] = useState('CONTEUDO');
  const [tickerSpeed, setTickerSpeed] = useState('medium');

  return (
    <div className="space-y-6 font-sans">
      {/* CABEÇALHO DO PAINEL GESTÃO DE TV */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <h2 className="text-3xl font-black text-black tracking-tight uppercase">GESTÃO DE TV</h2>
        <p className="text-zinc-600 text-sm font-medium mt-1">
          Administre o conteúdo visual, terminais de exibição e programação da TV FTTRESP.
        </p>
      </div>

      {/* 6 CARTOES MODELO DE ATALHOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* CARD 1: MÉTRICAS DA TV */}
        <div 
          onClick={() => setTvSubTab('METRICAS')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            tvSubTab === 'METRICAS' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">MÉTRICAS DA TV</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">AUDIÊNCIA E ENGAJAMENTO</p>
          </div>
        </div>

        {/* CARD 2: CONTEÚDO TV */}
        <div 
          onClick={() => setTvSubTab('CONTEUDO')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            tvSubTab === 'CONTEUDO' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black">
            <Tv size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">CONTEÚDO TV</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">VÍDEOS, LIVES E CANAIS</p>
          </div>
        </div>

        {/* CARD 3: GRADE DE HORÁRIOS */}
        <div 
          onClick={() => setTvSubTab('GRADE')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            tvSubTab === 'GRADE' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">GRADE DE HORÁRIOS</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">PROGRAMAR TRANSMISSÕES</p>
          </div>
        </div>

        {/* CARD 4: LETREIROS */}
        <div 
          onClick={() => setTvSubTab('LETREIROS')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            tvSubTab === 'LETREIROS' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            <Type size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">LETREIROS</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">MENSAGENS EM TEMPO REAL</p>
          </div>
        </div>

        {/* CARD 5: PATROCÍNIOS */}
        <div 
          onClick={() => setTvSubTab('PATROCINIOS')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            tvSubTab === 'PATROCINIOS' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            <Megaphone size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">PATROCÍNIOS</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">ANÚNCIOS E BANNERS</p>
          </div>
        </div>

        {/* CARD 6: TERMINAIS TV */}
        <div 
          onClick={() => setTvSubTab('TERMINAIS')}
          className={`bg-white p-6 rounded-3xl border shadow-md hover-lift cursor-pointer space-y-3 flex flex-col items-center text-center transition ${
            tvSubTab === 'TERMINAIS' ? 'border-2 border-red-600 shadow-xl' : 'border-zinc-200 hover:border-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black flex items-center justify-center font-black">
            <Monitor size={24} />
          </div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-wider">TERMINAIS TV</h3>
            <p className="text-zinc-500 text-[11px] font-semibold mt-0.5">GERENCIAR TELAS E LOBBIES</p>
          </div>
        </div>
      </div>

      {/* SEÇÃO DINÂMICA DO SUB-MÓDULO SELECIONADO */}
      {tvSubTab === 'METRICAS' && (
        <div className="space-y-6">
          {/* 4 CARDS DE KPI DE AUDIÊNCIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">TELESPECTADORES AGORA</span>
              <div className="text-3xl font-black text-black">0</div>
              <span className="text-[10px] font-extrabold text-red-600 uppercase">● Ao Vivo</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">TOTAL VISUALIZAÇÕES</span>
              <div className="text-3xl font-black text-black">70.258</div>
              <span className="text-[10px] font-extrabold text-zinc-500 uppercase">Acumulado</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">CURTIDAS TOTAIS</span>
              <div className="text-3xl font-black text-black">11</div>
              <span className="text-[10px] font-extrabold text-red-600 uppercase">♥ Engajamento</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">COMPARTILHAMENTOS</span>
              <div className="text-3xl font-black text-black">2</div>
              <span className="text-[10px] font-extrabold text-zinc-500 uppercase">Alcance Global</span>
            </div>
          </div>

          {/* ORIGEM E STATUS DOS TERMINAIS */}
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-black uppercase flex items-center gap-2">
                <Activity size={16} className="text-red-600" /> Origem do Tráfego
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-zinc-50 rounded-xl">
                  <span className="font-bold text-zinc-600">Terminais (Dispositivos)</span>
                  <span className="font-black text-black">0</span>
                </div>
                <div className="flex justify-between p-2.5 bg-zinc-50 rounded-xl">
                  <span className="font-bold text-zinc-600">Web Player / Portal</span>
                  <span className="font-black text-black">0</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm space-y-3 flex flex-col justify-center items-center text-center">
              <Monitor size={32} className="text-zinc-300" />
              <h3 className="text-xs font-black text-black uppercase">Status dos Terminais</h3>
              <p className="text-[11px] text-zinc-400 font-bold uppercase">Nenhum terminal corporativo transmitindo no momento.</p>
            </div>
          </div>

          {/* TOP CONTEÚDOS POR ENGAJAMENTO */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-black uppercase flex items-center gap-2">
              <Tv size={16} className="text-red-600" /> Top Conteúdos por Engajamento
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-600 uppercase font-black tracking-wider border-b border-zinc-200">
                    <th className="py-2.5 px-4">MÍDIA / VÍDEO</th>
                    <th className="py-2.5 px-4 text-center">VIEWS</th>
                    <th className="py-2.5 px-4 text-center">LIKES</th>
                    <th className="py-2.5 px-4 text-right">SHARES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-medium text-black">
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-bold">SBT AO VIVO (Transmissão Oficial)</td>
                    <td className="py-3 px-4 text-center font-black text-red-600">62.770</td>
                    <td className="py-3 px-4 text-center font-bold text-zinc-600">♥ 5</td>
                    <td className="py-3 px-4 text-right font-bold text-zinc-600">2</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-bold">Transmissão FTTRESP Ao Vivo</td>
                    <td className="py-3 px-4 text-center font-black text-red-600">7.500</td>
                    <td className="py-3 px-4 text-center font-bold text-zinc-600">♥ 5</td>
                    <td className="py-3 px-4 text-right font-bold text-zinc-600">4</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-bold">Entrega do Acordo Coletivo 2026</td>
                    <td className="py-3 px-4 text-center font-black text-red-600">535</td>
                    <td className="py-3 px-4 text-center font-bold text-zinc-600">♥ 1</td>
                    <td className="py-3 px-4 text-right font-bold text-zinc-600">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tvSubTab === 'CONTEUDO' && (
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-black uppercase">TV FTTRESP — INTERAÇÃO E GESTÃO DE CONTEÚDO EM VÍDEO</h3>
              <p className="text-zinc-500 text-xs font-semibold">Gerencie vídeos, transmissões ao vivo e exibição na HomePage.</p>
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-black hover:bg-zinc-800 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Plus size={16} /> + Novo Vídeo / Live
            </button>
          </div>

          {/* GRID DE CARDS DE VÍDEOS (MODELO IMAGEM 2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channelsList.map((ch, idx) => (
              <div key={ch.id || `v-card-${idx}`} className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-md space-y-3 flex flex-col justify-between hover-lift">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <iframe 
                    src={ch.defaultVideoUrl} 
                    title={ch.name} 
                    className="w-full h-full pointer-events-none opacity-90"
                  ></iframe>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase shadow">
                      {ch.badge || 'AO VIVO'}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="bg-zinc-100 text-black font-black px-2 py-0.5 rounded uppercase">PUBLICADO</span>
                    <span className="text-zinc-400 font-bold">14/08/2026</span>
                  </div>
                  <h4 className="font-black text-sm text-black line-clamp-2 uppercase">{ch.name}</h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{ch.currentShow}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-100 text-xs font-bold text-zinc-600">
                    <span>👁️ {ch.views || 535} views</span>
                    <span>♥ {ch.likes || 12} likes</span>
                  </div>

                  {/* TOGGLE TRANSMITIR NA HOME */}
                  <button
                    onClick={() => handleToggleHomeTransmit(ch)}
                    className={`w-full mt-2 py-2 rounded-xl text-xs font-black uppercase transition ${
                      ch.showOnHome !== false
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {ch.showOnHome !== false ? '✓ Transmitindo na Home' : '✗ Oculto da Home'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tvSubTab === 'GRADE' && (
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-black uppercase">GRADE DE PROGRAMAÇÃO</h3>
              <p className="text-zinc-500 text-xs font-semibold">Agende vídeos e conteúdos para horários específicos nos terminais.</p>
            </div>
            <button 
              onClick={() => alert('Nova programação agendada!')}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Plus size={16} /> + Nova Programação
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black text-white uppercase font-black tracking-wider border-b border-zinc-800">
                  <th className="py-3 px-4">TÍTULO / VÍDEO</th>
                  <th className="py-3 px-4 text-center">ALVO</th>
                  <th className="py-3 px-4 text-center">HORÁRIO / PERÍODO</th>
                  <th className="py-3 px-4 text-right">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-black">
                <tr className="hover:bg-zinc-50">
                  <td className="py-4 px-4 font-bold text-center text-zinc-400" colSpan="4">
                    NENHUMA PROGRAMAÇÃO AGENDADA.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tvSubTab === 'LETREIROS' && (
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-black uppercase">GESTÃO DE LETREIROS — MENSAGENS EM TEMPO REAL</h3>
              <p className="text-zinc-500 text-xs font-semibold">Configure mensagens em movimento e ajuste a velocidade do ticker.</p>
            </div>
            <button 
              onClick={() => alert('Novo letreiro adicionado!')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Plus size={16} /> + Novo Letreiro
            </button>
          </div>

          {/* SELETOR DE VELOCIDADE DO LETREIRO (MARQUEE SPEED) */}
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-black text-xs uppercase text-black">Velocidade de Rolagem do Ticker (Marquee Speed):</span>
              <p className="text-[11px] text-zinc-500 font-medium">Ajuste o tempo de passagem do texto em movimento na TV.</p>
            </div>
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-zinc-300">
              <button 
                onClick={() => setTickerSpeed('slow')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase transition ${
                  tickerSpeed === 'slow' ? 'bg-red-600 text-white shadow-sm' : 'bg-zinc-100 text-black hover:bg-zinc-200'
                }`}
              >
                Lenta (25s)
              </button>
              <button 
                onClick={() => setTickerSpeed('medium')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase transition ${
                  tickerSpeed === 'medium' ? 'bg-red-600 text-white shadow-sm' : 'bg-zinc-100 text-black hover:bg-zinc-200'
                }`}
              >
                Média (15s)
              </button>
              <button 
                onClick={() => setTickerSpeed('fast')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase transition ${
                  tickerSpeed === 'fast' ? 'bg-red-600 text-white shadow-sm' : 'bg-zinc-100 text-black hover:bg-zinc-200'
                }`}
              >
                Rápida (8s)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black text-white uppercase font-black tracking-wider border-b border-zinc-800">
                  <th className="py-3 px-4">TÍTULO / MENSAGEM</th>
                  <th className="py-3 px-4 text-center">ALVO</th>
                  <th className="py-3 px-4 text-center">HORÁRIO / STATUS</th>
                  <th className="py-3 px-4 text-right">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-black">
                <tr className="hover:bg-zinc-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                        <Type size={16} />
                      </div>
                      <div>
                        <div className="font-extrabold text-xs text-black">01 - FILIE-SE AO SINDICATO DOS TRABALHADORES</div>
                        <div className="text-[10px] text-zinc-500 font-mono">UNIDOS SOMOS MAIS FORTES! GARANTA SEUS DIREITOS E CONQUISTAS.</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-blue-50 text-blue-600 font-black text-[10px] px-2.5 py-1 rounded-lg uppercase">
                      TODAS AS TELAS
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="text-xs font-bold text-black">08:00 - 22:00</div>
                    <span className="text-[10px] font-black text-red-600 uppercase">● ATIVO AGORA ({tickerSpeed.toUpperCase()})</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="p-1.5 rounded-lg bg-black text-white hover:bg-red-600 transition">
                      <Edit size={14} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tvSubTab === 'PATROCINIOS' && (
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
            <h3 className="text-xl font-black text-black uppercase">PATROCÍNIOS E MARCAS PARCEIRAS</h3>
            <button className="bg-red-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md">
              + Novo Patrocinador
            </button>
          </div>
          <p className="text-xs text-zinc-500 font-medium">Banners e vinhetas comerciais exibidos nos intervalos da TV FTTRESP.</p>
        </div>
      )}

      {tvSubTab === 'TERMINAIS' && (
        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-black uppercase">GERENCIAR TELAS / MONITORES</h3>
              <p className="text-zinc-500 text-xs font-semibold">Controle de exibição digital nas sedes, subsedes e garagens.</p>
            </div>
            <button 
              onClick={() => alert('Novo monitor cadastrado!')}
              className="bg-black hover:bg-zinc-800 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Monitor size={16} /> + Novo Dispositivo
            </button>
          </div>

          {/* GRID DE CARDS DE DISPOSITIVOS (MODELO IMAGEM 5) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'RECEPÇÃO', idUrl: 'ID DA URL: RECEPCAO', count: '1 vídeos na sequência' },
              { name: 'PRESIDÊNCIA', idUrl: 'ID DA URL: PRESIDENTE', count: '2 vídeos na sequência' },
              { name: 'OMAR', idUrl: 'ID DA URL: OMAR', count: '1 vídeos na sequência' },
              { name: 'PATY', idUrl: 'ID DA URL: PATY', count: '1 vídeos na sequência' },
              { name: 'TV FTTRESP', idUrl: 'ID DA URL: SINDMOTORISTAS', count: '2 vídeos na sequência' }
            ].map((dev, idx) => (
              <div key={`dev-${idx}`} className="bg-white rounded-3xl border border-zinc-200 p-5 shadow-sm space-y-4 hover-lift">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center font-black">
                    <Monitor size={20} />
                  </div>
                  <div className="flex gap-1.5">
                    <button className="p-1 rounded-lg text-zinc-400 hover:text-black"><Settings size={14} /></button>
                    <button className="p-1 rounded-lg text-zinc-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-base text-black uppercase">{dev.name}</h4>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase">{dev.idUrl}</span>
                </div>

                <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center text-xs font-bold text-zinc-600">
                  📺 {dev.count}
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-zinc-100 text-xs">
                  <span className="text-[10px] font-black text-zinc-400 uppercase">● STATUS ONLINE</span>
                  <button className="text-red-600 font-black text-xs hover:underline">ABRIR PLAYER</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
