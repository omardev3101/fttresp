import React from 'react';
import { Quote, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PresidentWordPage({ setCurrentPage }) {
  return (
    <div className="container py-12 space-y-12">
      {/* Header */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Mensagem da Presidência FTTRESP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Palavra do Presidente</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Compromisso inabalável com os mais de 1,5 milhão de trabalhadores rodoviários e 97 sindicatos filiados no estado de São Paulo.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* President Photo Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
              alt="Presidente FTTRESP" 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xl font-black text-white">Diretoria Executiva FTTRESP</div>
              <div className="text-xs text-amber-400 font-bold">Presidente da Federação Rodoviária de SP</div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
              <Award size={16} /> Representatividade em Todo o Estado de SP
            </div>
            <p>Coordenação estadual dos 97 sindicatos parceiros, garantindo pisos salariais unificados e direitos sociais.</p>
          </div>
        </div>

        {/* President Statement */}
        <div className="lg:col-span-7 space-y-6 text-slate-800 leading-relaxed">
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-2xl space-y-2">
            <Quote size={32} className="text-amber-600 mb-2" />
            <p className="text-lg font-bold text-slate-900 italic">
              "A nossa força nasce da união dos 97 sindicatos filiados. Nenhum motorista ou trabalhador em transporte de São Paulo caminhará sozinho diante das adversidades do setor."
            </p>
          </div>

          <div className="space-y-4 text-base text-slate-700">
            <p>
              Companheiras e companheiros rodoviários de todo o Estado de São Paulo,
            </p>
            <p>
              Assumir a condução da <strong>FTTRESP (Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo)</strong> é um compromisso diário com a dignidade, com a segurança e com o futuro de mais de 1,5 milhão de pais e mães de família que movimentam a economia paulista.
            </p>
            <p>
              Em tempos de grandes transformações tecnológicas no transporte — desde a carga rodoviária, ônibus urbanos e intermunicipais até os entregadores de aplicativos — a FTTRESP renova a sua estrutura. Lançamos este novo portal moderno com <strong>Web TV Ao Vivo, Rádio Web 24h, consulta digital dos 97 sindicatos e convenções coletivas integradas</strong> para colocar a informação na palma da mão do trabalhador.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <CheckCircle2 size={24} className="text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">Defesa dos Pisos Salariais Unificados em SP</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <CheckCircle2 size={24} className="text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900">Salas de Descanso e Banheiros nos Terminais</span>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => setCurrentPage('unions')}
              className="gradient-gold text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2"
            >
              Conheça os 97 Sindicatos Filiados <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
