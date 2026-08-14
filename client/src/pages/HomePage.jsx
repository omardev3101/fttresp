import React, { useState } from 'react';
import { Tv, Radio, Building2, FileText, Search, ArrowRight, ShieldCheck, Award, Users, Calculator, ShieldAlert, Play, Quote, Sun, CheckCircle2, DollarSign } from 'lucide-react';
import StatCounter from '../components/StatCounter';

export default function HomePage({ news, unions, tvChannels, setCurrentPage }) {
  const [newsFilter, setNewsFilter] = useState('Todas');
  const categories = ['Todas', 'Institucional', 'Campanha Salarial', 'Segurança e Saúde', 'Jurídico'];

  const filteredNews = newsFilter === 'Todas' 
    ? news 
    : news.filter(n => n.category.toLowerCase() === newsFilter.toLowerCase());

  return (
    <div className="space-y-16 pb-12 font-sans">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative gradient-hero text-white py-20 px-4 overflow-hidden rounded-b-[2.5rem] shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Plataforma Oficial FTTRESP 2026
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              União, Força e <span className="text-amber-400">Tecnologia</span> em Defesa dos Rodoviários de SP
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Conectando 97 sindicatos, convenções coletivas digitais, transmissão de Web TV ao vivo e Rádio Web 24h.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setCurrentPage('unions')}
                className="gradient-gold hover:opacity-95 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition flex items-center gap-2"
              >
                <Search size={18} /> Central dos 97 Sindicatos Filiados
              </button>

              <button 
                onClick={() => setCurrentPage('webtv')}
                className="bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3.5 rounded-2xl border border-slate-700 hover:border-amber-400 transition flex items-center gap-2"
              >
                <Tv size={18} className="text-amber-400" /> Assistir Web TV Ao Vivo
              </button>
            </div>
          </div>

          {/* Featured Web TV Player Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-black text-white uppercase tracking-wider">Web TV FTTRESP</span>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded">Multi-Canais</span>
              </div>

              <div 
                className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center group cursor-pointer"
                onClick={() => setCurrentPage('webtv')}
              >
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" 
                  alt="Web TV Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-70" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="w-16 h-16 rounded-full gradient-gold text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition z-10">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-xs text-amber-400 font-bold">Jornal Rodoviário de SP</div>
                  <div className="text-sm font-extrabold text-white truncate">Edição Especial: Conquistas Trabalhistas 2026</div>
                </div>
              </div>

              <button 
                onClick={() => setCurrentPage('webtv')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Acessar todos os 4 Canais de TV <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STAT COUNTERS (MODELO SINDMOTORISTAS) */}
      <StatCounter />

      {/* 3. PALAVRA DO PRESIDENTE (MODELO SINDMOTORISTAS) */}
      <section className="container">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
                alt="Presidente FTTRESP"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-4 -right-4 gradient-gold text-slate-950 text-xs font-black px-4 py-2 rounded-xl shadow-lg uppercase">
              Diretoria FTTRESP
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs text-amber-600 font-extrabold uppercase tracking-wider">Mensagem Oficial</span>
            <h2 className="text-3xl font-black text-slate-900">Palavra do Presidente</h2>
            
            <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-xl italic text-slate-800 font-medium">
              "A nossa missão à frente da FTTRESP é garantir que nenhum dos 1,5 milhão de trabalhadores rodoviários de São Paulo fique desamparado. A união dos 97 sindicatos filiados é a nossa maior força."
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Trabalhamos diariamente pela unificação das cláusulas econômicas e sociais, novos acordos coletivos, salas de descanso dignas nos terminais e expansão do acesso à saúde e lazer para toda a família rodoviária.
            </p>

            <button 
              onClick={() => setCurrentPage('president')}
              className="gradient-gold text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl hover:scale-105 transition inline-flex items-center gap-2"
            >
              Ler Mensagem Completa do Presidente <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CENTRAL DOS 97 SINDICATOS FILIADOS */}
      <section className="container">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs text-amber-400 font-extrabold uppercase tracking-wider">Rede Federativa de SP</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Central dos 97 Sindicatos Filiados</h2>
              <p className="text-slate-400 text-sm">Localize o sindicato da sua cidade ou região (Capital, ABCDMR, Campinas, Baixada, Interior, Vale).</p>
            </div>
            <button 
              onClick={() => setCurrentPage('unions')}
              className="gradient-gold text-slate-950 font-bold text-xs px-5 py-3 rounded-xl hover:scale-105 transition shrink-0"
            >
              Ver Diretório Completo dos 97 Sindicatos
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {unions.slice(0, 3).map((u) => (
              <div key={u.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-amber-500/50 transition">
                <div className="text-xs font-extrabold text-amber-400 uppercase">{u.region} • {u.city}</div>
                <div className="font-extrabold text-sm text-white line-clamp-2">{u.name}</div>
                <div className="text-xs text-slate-400"><strong>Fone:</strong> {u.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. JORNALISMO E NOTÍCIAS COM FILTRO POR CATEGORIA (MODELO SINDMOTORISTAS) */}
      <section className="container space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs text-amber-600 font-extrabold uppercase tracking-wider">Imprensa FTTRESP</span>
            <h2 className="text-3xl font-black text-slate-900">Últimas Notícias da Categoria</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsFilter(cat)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
                  newsFilter === cat 
                    ? 'bg-slate-900 text-amber-400 font-black shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-3">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover-lift flex flex-col justify-between">
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-slate-950/80 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-xs text-slate-400 font-medium">{item.date} • Por {item.author}</div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug hover:text-amber-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button className="text-amber-600 font-bold text-xs flex items-center gap-1.5 hover:gap-2 transition">
                  Ler Matéria Completa <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PISOS SALARIAIS & SERVIÇOS RÁPIDOS */}
      <section className="container">
        <div className="grid-3">
          <div 
            onClick={() => setCurrentPage('salary')}
            className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 hover-lift cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl gradient-gold text-slate-950 flex items-center justify-center font-black">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-extrabold">Tabela de Pisos Salariais 2026</h3>
            <p className="text-slate-300 text-sm">Consulte o piso salarial normativo do seu setor (Cargas, Urbano, Fretamento e Entregadores).</p>
            <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold">Consultar Tabela <ArrowRight size={14} /></span>
          </div>

          <div 
            onClick={() => setCurrentPage('agreements')}
            className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 hover-lift cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl gradient-gold text-slate-950 flex items-center justify-center font-black">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-extrabold">Convenções Coletivas Digitais</h3>
            <p className="text-slate-300 text-sm">Consulte acordos de trabalho organizados por ano e setor com leitor PDF embutido.</p>
            <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold">Acessar Documentos <ArrowRight size={14} /></span>
          </div>

          <div 
            onClick={() => setCurrentPage('colonies')}
            className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 hover-lift cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl gradient-gold text-slate-950 flex items-center justify-center font-black">
              <Sun size={24} />
            </div>
            <h3 className="text-xl font-extrabold">Colônias de Férias & Lazer</h3>
            <p className="text-slate-300 text-sm">Reservas com valores especiais para a família rodoviária em Praia Grande e Litoral Norte.</p>
            <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold">Ver Opções de Lazer <ArrowRight size={14} /></span>
          </div>
        </div>
      </section>
    </div>
  );
}
