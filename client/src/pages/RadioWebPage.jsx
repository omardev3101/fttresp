import React from 'react';
import { Radio, Mic, Music, Clock, Volume2, ShieldCheck, Headphones, Wifi } from 'lucide-react';

export default function RadioWebPage({ radioConfig }) {
  return (
    <div className="container py-10 space-y-10">
      {/* Header Banner */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Estúdio Virtual FTTRESP 24h
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Rádio Web FTTRESP — A Voz do Rodoviário</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Transmissão ininterrupta com música, notícias sindicais de hora em hora, boletins trabalhistas e participação dos trabalhadores rodoviários de todo o Estado de São Paulo.
        </p>
      </div>

      {/* Radio Studio Content */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Mic size={14} /> Estúdio Ao Vivo
              </span>
              <span className="text-xs text-amber-400 font-bold font-mono">128 kbps Stereo HQ</span>
            </div>

            <h2 className="text-2xl font-black text-white">{radioConfig?.stationName || "Rádio Web FTTRESP"}</h2>
            <p className="text-slate-300 text-sm">
              Programa Atual: <strong className="text-amber-400">{radioConfig?.currentTrack || "Informativo Sindical FTTRESP 2026"}</strong>
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-semibold uppercase">Locução & Produção</div>
              <div className="text-sm font-extrabold text-white">{radioConfig?.currentDj || "AutoDJ FTTRESP (Estúdio Central)"}</div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
              <Clock size={14} /> Sistema de Hora Certa & Vinhetas
            </div>
            <p>O áudio do player flutuante no rodapé do site toca de forma contínua sem travar ao mudar de página.</p>
          </div>
        </div>

        {/* Schedule / Playlist Info */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Headphones size={22} className="text-amber-600" /> Destaques da Programação da Rádio
          </h3>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-xs font-bold text-amber-600">07:00 - 09:00</div>
              <div className="font-extrabold text-slate-900">Primeira Hora Rodoviária</div>
              <div className="text-xs text-slate-500">Trânsito nas estradas de SP, previsão do tempo e manchetes do dia.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-xs font-bold text-amber-600">12:00 - 13:00</div>
              <div className="font-extrabold text-slate-900">Hora Certa Jurídica</div>
              <div className="text-xs text-slate-500">Tira-dúvidas de direitos trabalhistas dos motoristas com a equipe do Dr. Jurídico FTTRESP.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-xs font-bold text-amber-600">17:00 - 19:00</div>
              <div className="font-extrabold text-slate-900">Voz do Motorista nas Estradas</div>
              <div className="text-xs text-slate-500">Música sertaneja, mensagens dos rodoviários e informes dos 97 sindicatos filiados.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
