import React, { useState } from 'react';
import { Clock, Plus, Move, Disc, Trash2, CheckCircle2, Play } from 'lucide-react';

export default function RadioGrade247() {
  const [scheduleList, setScheduleList] = useState([
    { id: 'sch-1', time: '00:00 - 06:00', program: 'MADRUGADA RODOVIÁRIA', genre: 'Samba & Sertanejo', status: 'Auto-DJ Ativo' },
    { id: 'sch-2', time: '06:00 - 09:00', program: 'BOM DIA TRABALHADOR', genre: 'Notícias & Músicas', status: 'Programa ao Vivo' },
    { id: 'sch-3', time: '09:00 - 12:00', program: 'VOZ DA CATEGORIA FTTRESP', genre: 'Entrevistas & Debates', status: 'Ao Vivo' },
    { id: 'sch-4', time: '12:00 - 14:00', program: 'HORA DO ALMOÇO MUSICAL', genre: 'Músicas Variadas', status: 'Auto-DJ Ativo' },
    { id: 'sch-5', time: '14:00 - 18:00', program: 'TARDE TOTAL RÁDIO FTTRESP', genre: 'Pop & Forró', status: 'Auto-DJ Ativo' },
    { id: 'sch-6', time: '18:00 - 20:00', program: 'INFORMATIVO SINDICAL', genre: 'Jornalismo & Direitos', status: 'Programa ao Vivo' },
    { id: 'sch-7', time: '20:00 - 00:00', program: 'NOITE DE SUCESSOS', genre: 'As Melhores do Ano', status: 'Auto-DJ Ativo' }
  ]);

  const [playlistPills, setPlaylistPills] = useState([
    { id: 'pill-1', title: '01 - VEM ME AMAR (FORRÓ DO MUÍDO)', type: 'Música', duration: '4:11' },
    { id: 'pill-2', title: '02 - VINHETA RÁDIO FTTRESP 24H', type: 'Vinheta', duration: '0:15' },
    { id: 'pill-3', title: '03 - ANJO PINTADO (FORRÓ DO MUÍDO)', type: 'Música', duration: '3:45' },
    { id: 'pill-4', title: '04 - HORA CERTA FTTRESP', type: 'Hora Certa', duration: '0:08' },
    { id: 'pill-5', title: '05 - COMERCIAL FILIAÇÃO SINDICAL', type: 'Comercial', duration: '0:30' }
  ]);

  // MOVER PÍLULAS DE EXECUÇÃO (PARA CIMA OU PARA BAIXO)
  const movePill = (index, direction) => {
    const updated = [...playlistPills];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setPlaylistPills(updated);
  };

  return (
    <div className="bg-black text-white rounded-3xl p-6 border border-zinc-800 shadow-2xl space-y-6 font-sans">
      
      {/* CABEÇALHO DA GRADE DA RÁDIO 24/7 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-black uppercase text-purple-400 tracking-tight">GRADE DA RÁDIO 24/7 & EXECUÇÃO POR PÍLULAS</h2>
          <p className="text-zinc-400 text-xs font-semibold mt-0.5">Programação automática do Auto-DJ e reordenamento da lista de reprodução.</p>
        </div>
        <button 
          onClick={() => alert('Nova programação adicionada à grade!')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus size={16} /> + Novo Horário
        </button>
      </div>

      {/* PAINEL DE PÍLULAS DE EXECUÇÃO REORDENÁVEIS (MODELO MOCADO) */}
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-xs font-black text-white uppercase flex items-center gap-2">
              <Move size={16} className="text-purple-400" /> Lista de Execução Sequencial (Pílulas Reordenáveis)
            </h3>
            <p className="text-[11px] text-zinc-500 font-medium">Utilize as setas para mover a ordem de execução das músicas e vinhetas no ar.</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {playlistPills.map((pill, idx) => (
            <div 
              key={pill.id} 
              className="bg-black p-4 rounded-2xl border border-zinc-800 flex items-center justify-between gap-4 hover:border-purple-600 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-mono font-black text-xs">
                  {idx + 1}
                </span>
                <div>
                  <div className="font-extrabold text-xs text-white uppercase">{pill.title}</div>
                  <span className="text-[10px] text-zinc-500 font-mono">Duração: {pill.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-zinc-900 text-zinc-300 font-black text-[10px] px-2.5 py-1 rounded-xl uppercase border border-zinc-800">
                  {pill.type}
                </span>
                
                {/* BOTÕES DE MOVER ORDEM (RECURSO DE PÍLULAS) */}
                <button 
                  onClick={() => movePill(idx, -1)}
                  disabled={idx === 0}
                  className="px-3 py-1 bg-zinc-800 hover:bg-purple-600 disabled:opacity-30 text-white rounded-lg text-xs font-black transition"
                  title="Mover para cima"
                >
                  ▲
                </button>
                <button 
                  onClick={() => movePill(idx, 1)}
                  disabled={idx === playlistPills.length - 1}
                  className="px-3 py-1 bg-zinc-800 hover:bg-purple-600 disabled:opacity-30 text-white rounded-lg text-xs font-black transition"
                  title="Mover para baixo"
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABELA DE PROGRAMAÇÃO 24 HORAS */}
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
        <h3 className="text-xs font-black text-white uppercase flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Clock size={16} className="text-purple-400" /> Grade Horária da Rádio 24 Horas
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-black text-zinc-400 uppercase font-black tracking-wider border-b border-zinc-800">
                <th className="py-3 px-4">HORÁRIO</th>
                <th className="py-3 px-4">NOME DO PROGRAMA</th>
                <th className="py-3 px-4 text-center">GÊNERO / ESTILO</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 font-medium text-white">
              {scheduleList.map((sch) => (
                <tr key={sch.id} className="hover:bg-zinc-800/60 transition">
                  <td className="py-3 px-4 font-mono font-black text-purple-400">{sch.time}</td>
                  <td className="py-3 px-4 font-extrabold uppercase text-white">{sch.program}</td>
                  <td className="py-3 px-4 text-center text-zinc-400 font-semibold">{sch.genre}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase ${
                      sch.status === 'Ao Vivo' || sch.status === 'Programa ao Vivo'
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      ● {sch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
