import React, { useState } from 'react';
import { 
  Tv, Radio, Building2, FileText, Search, ArrowRight, ShieldCheck, Award, 
  Users, Calculator, ShieldAlert, Play, Quote, CheckCircle2, DollarSign,
  TrendingUp, ThumbsUp, Heart, Share2, Download, Eye, Newspaper, Calendar
} from 'lucide-react';
import BannerCarousel from '../components/BannerCarousel';
import StatCounter from '../components/StatCounter';

export default function HomePage({ news = [], unions = [], tvChannels = [], banners = [], jornais = [], settings, setCurrentPage }) {
  const [newsFilter, setNewsFilter] = useState('Todas');
  const [jornalFilter, setJornalFilter] = useState('Todos');
  const [newsPage, setNewsPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedVideo, setSelectedVideo] = useState(tvChannels[0] || null);
  const [likes, setLikes] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [loves, setLoves] = useState(89);
  const [hasLoved, setHasLoved] = useState(false);

  const categories = ['Todas', 'Institucional', 'Campanha Salarial', 'Segurança e Saúde', 'Jurídico'];
  const jornalCategories = ['Todos', 'Informativo Oficial', 'Boletim Jurídico', 'Edição Especial'];

  const defaultNews = [
    {
      id: "news-1",
      title: "FTTRESP lança nova plataforma digital com Web TV, Rádio Web 24h e Central de Sindicatos",
      slug: "fttresp-lanca-nova-plataforma-digital",
      category: "Institucional",
      summary: "Modernização completa da comunicação beneficia mais de 1,5 milhão de trabalhadores rodoviários e 97 sindicatos filiados no estado de SP.",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      date: "2026-08-14",
      author: "Redação FTTRESP"
    },
    {
      id: "news-2",
      title: "Campanha Salarial 2026/2027: FTTRESP mobiliza categoria pelo reajuste com ganho real",
      slug: "campanha-salarial-2026-2027",
      category: "Campanha Salarial",
      summary: "Diretoria reuniu lideranças sindicais em plenária estadual para definir pauta unificada de reivindicações.",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
      date: "2026-08-12",
      author: "Imprensa FTTRESP"
    },
    {
      id: "news-3",
      title: "Segurança e Condições de Trabalho: FTTRESP fiscaliza terminais e garagens de ônibus",
      slug: "fiscalizacao-terminais-garagens",
      category: "Segurança e Saúde",
      summary: "Equipes de fiscalização avaliam salas de descanso, pontos de apoio e instalações sanitárias para os motoristas.",
      imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      date: "2026-08-10",
      author: "Departamento de Segurança"
    }
  ];

  const displayNewsList = news && news.length > 0 ? news : defaultNews;

  const filteredNews = newsFilter === 'Todas' 
    ? displayNewsList 
    : displayNewsList.filter(n => n.category && n.category.toLowerCase() === newsFilter.toLowerCase());

  const totalNewsPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
  const currentNewsItems = filteredNews.slice((newsPage - 1) * itemsPerPage, newsPage * itemsPerPage);

  const [jornalPage, setJornalPage] = useState(1);
  const [jornalDateSearch, setJornalDateSearch] = useState('');
  const jornaisPerPage = 3;

  const displayJornais = jornais.length > 0 ? jornais : [
    {
      id: "j-1",
      title: "Jornal do Rodoviário SP - Edição Especial Campanha Salarial 2026",
      category: "Informativo Oficial",
      date: "2026-08-01",
      summary: "Confira a íntegra da pauta unificada de reivindicações e conquistas do setor no Estado de São Paulo.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "j-2",
      title: "Boletim FTTRESP - Orientação Jurídica e Direitos da Categoria",
      category: "Boletim Jurídico",
      date: "2026-07-15",
      summary: "Guia completo de direitos sobre horas extras, intervalo intrajornada e folgas dos motoristas.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "j-3",
      title: "Revista FTTRESP 2026 - O Papel dos 97 Sindicatos Filiados",
      category: "Edição Especial",
      date: "2026-06-30",
      summary: "Mapeamento completo da representatividade dos 1,5 milhão de trabalhadores rodoviários paulistas.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredJornais = displayJornais.filter(j => {
    const matchCategory = jornalFilter === 'Todos' || (j.category && j.category.toLowerCase() === jornalFilter.toLowerCase());
    const matchDate = !jornalDateSearch || (j.date && j.date.includes(jornalDateSearch)) || (j.title && j.title.toLowerCase().includes(jornalDateSearch.toLowerCase()));
    return matchCategory && matchDate;
  });

  const totalJornalPages = Math.max(1, Math.ceil(filteredJornais.length / jornaisPerPage));
  const currentJornalItems = filteredJornais.slice((jornalPage - 1) * jornaisPerPage, jornalPage * jornaisPerPage);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleLove = () => {
    if (!hasLoved) {
      setLoves(prev => prev + 1);
      setHasLoved(true);
    }
  };

  return (
    <div className="space-y-10 pb-12 font-sans bg-white">
      
      {/* 1. TICKER DE ÚLTIMAS NOTÍCIAS AO VIVO */}
      <div className="bg-black text-white text-xs py-2.5 px-4 border-b border-red-600 shadow-inner">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase shadow">Ao Vivo</span>
            <span className="font-extrabold text-white uppercase hidden sm:inline">Últimas FTTRESP:</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee inline-block text-slate-200 font-medium text-[11px]">
              {news.length > 0 ? (
                news.map((n, i) => (
                  <span key={n.id || `ticker-${i}`} className="mr-8">
                    <strong className="text-red-500">[{n.category}]</strong> {n.title} — <em>{n.date}</em>
                  </span>
                ))
              ) : (
                <span>FTTRESP lança novo portal digital com Web TV Multi-Canais, Rádio Web 24h e Central dos 97 Sindicatos Filiados em SP.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO SLIDER & CARROSSEL ADMINISTRÁVEL */}
      <BannerCarousel banners={banners} setCurrentPage={setCurrentPage} />

      {/* 3. CARDS DE ACESSO RÁPIDO A SERVIÇOS FEDERATIVOS */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            onClick={() => setCurrentPage('unions')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-md hover-lift cursor-pointer space-y-2 group hover:border-red-600"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black group-hover:bg-black transition shadow-md">
              <Building2 size={22} />
            </div>
            <h3 className="font-black text-black text-sm">97 Sindicatos SP</h3>
            <p className="text-zinc-600 text-xs">Busca de sindicatos por cidade e região.</p>
          </div>

          <div 
            onClick={() => setCurrentPage('salary')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-md hover-lift cursor-pointer space-y-2 group hover:border-red-600"
          >
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black group-hover:bg-red-600 transition shadow-md">
              <DollarSign size={22} />
            </div>
            <h3 className="font-black text-black text-sm">Pisos Salariais 2026</h3>
            <p className="text-zinc-600 text-xs">Tabela normativa por modalidade.</p>
          </div>

          <div 
            onClick={() => setCurrentPage('agreements')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-md hover-lift cursor-pointer space-y-2 group hover:border-red-600"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black group-hover:bg-black transition shadow-md">
              <FileText size={22} />
            </div>
            <h3 className="font-black text-black text-sm">Convenções Coletivas</h3>
            <p className="text-zinc-600 text-xs">Acordos de trabalho em PDF por setor.</p>
          </div>

          <div 
            onClick={() => setCurrentPage('calculator')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-md hover-lift cursor-pointer space-y-2 group hover:border-red-600"
          >
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black group-hover:bg-red-600 transition shadow-md">
              <Calculator size={22} />
            </div>
            <h3 className="font-black text-black text-sm">Simulador de Direitos</h3>
            <p className="text-zinc-600 text-xs">Cálculo de horas extras e adicionais.</p>
          </div>
        </div>
      </section>

      {/* 4. PALAVRA DO PRESIDENTE (DINÂMICA) */}
      <section className="container">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-black">
              <img 
                src={settings?.presidentPhotoUrl || "/uploads/1786915668288-Gemini_Generated_Image_ny94j1ny94j1ny94.jpg"} 
                alt={settings?.presidentName || "Presidente FTTRESP"}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-3 -right-3 bg-red-600 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md uppercase">
              {settings?.presidentTitle || "Presidência FTTRESP"}
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs text-red-600 font-extrabold uppercase tracking-wider">Mensagem da Liderança • {settings?.presidentName || "Valdir de Souza Pestana"}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-black">Palavra do Presidente</h2>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl italic text-black font-bold text-sm sm:text-base">
              "{settings?.presidentQuote || "A nossa força nasce da união dos 97 sindicatos filiados. Nenhum motorista ou trabalhador em transporte de São Paulo caminhará sozinho diante das adversidades."}"
            </div>

            <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed">
              {settings?.presidentMessage || "Trabalhamos diariamente pela unificação das cláusulas econômicas e sociais, novos acordos coletivos, salas de descanso dignas nos terminais e expansão do acesso aos direitos de toda a família rodoviária paulista."}
            </p>

            <button 
              onClick={() => setCurrentPage('president')}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md hover:scale-105 transition inline-flex items-center gap-2"
            >
              Ler Mensagem Completa do Presidente <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. MÓDULO TV FTTRESP — TRANSMISSÃO AO VIVO */}
      <section className="container">
        <div className="bg-black text-white rounded-3xl p-6 sm:p-8 border border-red-600 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-xs font-black text-red-500 uppercase tracking-wider">Plataforma Audiovisual FTTRESP</span>
              </div>
              <h2 className="text-2xl font-black text-white">TV FTTRESP — Transmissão Ao Vivo & Canais</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('webtv')}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition shadow-md"
            >
              Ver Grade Completa da TV
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-zinc-800 shadow-2xl">
                <iframe 
                  src={selectedVideo?.defaultVideoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"} 
                  title={selectedVideo?.name || "Web TV FTTRESP"}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <div>
                  <div className="text-xs text-red-500 font-extrabold uppercase">{selectedVideo?.badge || 'AO VIVO'}</div>
                  <div className="font-extrabold text-sm text-white">{selectedVideo?.name || 'TV FTTRESP Principal'}</div>
                  <div className="text-xs text-zinc-400">{selectedVideo?.currentShow || 'Jornal Rodoviário de SP'}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleLike}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      hasLiked ? 'bg-red-600 text-white' : 'bg-black text-white border border-zinc-800 hover:bg-zinc-800'
                    }`}
                  >
                    <ThumbsUp size={14} /> {likes}
                  </button>
                  <button 
                    onClick={handleLove}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      hasLoved ? 'bg-red-600 text-white' : 'bg-black text-white border border-zinc-800 hover:bg-zinc-800'
                    }`}
                  >
                    <Heart size={14} /> {loves}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h3 className="font-extrabold text-white text-sm">Canais de TV na Home ({tvChannels.filter(ch => ch.showOnHome !== false).length})</h3>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {tvChannels.filter(ch => ch.showOnHome !== false).map((ch, idx) => (
                  <div 
                    key={ch.id || `ch-${idx}`}
                    onClick={() => setSelectedVideo(ch)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                      selectedVideo?.id === ch.id 
                        ? 'bg-red-600 border-red-500 text-white shadow-md' 
                        : 'bg-zinc-900 border-zinc-800 hover:border-red-600 text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-black text-white border border-zinc-800 flex items-center justify-center font-black shrink-0">
                      <Tv size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-extrabold text-xs truncate">{ch.name}</div>
                      <div className="text-[10px] text-zinc-300 truncate">{ch.currentShow}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STAT COUNTERS */}
      <StatCounter />

      {/* 7. CENTRAL DOS 97 SINDICATOS FILIADOS */}
      <section className="container">
        <div className="bg-black text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-600 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="text-[11px] text-red-500 font-extrabold uppercase tracking-wider">Rede Federativa de SP</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">Central dos 97 Sindicatos Filiados</h2>
              <p className="text-zinc-400 text-xs sm:text-sm">Localize o sindicato da sua cidade ou região (Capital, ABCDMR, Campinas, Baixada, Interior, Vale).</p>
            </div>
            <button 
              onClick={() => setCurrentPage('unions')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition shrink-0"
            >
              Ver Diretório dos 97 Sindicatos
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {unions.slice(0, 3).map((u, idx) => (
              <div key={u.id || `union-${idx}`} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-1.5 hover:border-red-600 transition">
                <div className="text-[10px] font-extrabold text-red-500 uppercase">{u.region} • {u.city}</div>
                <div className="font-extrabold text-xs text-white line-clamp-2">{u.name}</div>
                <div className="text-[11px] text-zinc-400"><strong>Fone:</strong> {u.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NOVA SEÇÃO DE JORNAIS & INFORMATIVOS OFICIAIS (CARDS PAGINADOS) */}
      <section className="container space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[11px] text-red-600 font-extrabold uppercase tracking-wider">Publicações em PDF</span>
            <h2 className="text-2xl font-black text-black">Jornais & Informativos Oficiais</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* BUSCADOR DE JORNAIS POR DATA / ANO */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1.5 rounded-xl border border-zinc-300 text-xs shadow-inner">
              <Calendar size={14} className="text-red-600 ml-1" />
              <input 
                type="text"
                placeholder="Filtrar por data / ano (ex: 2026)..."
                value={jornalDateSearch}
                onChange={(e) => {
                  setJornalDateSearch(e.target.value);
                  setJornalPage(1);
                }}
                className="bg-transparent text-black text-[11px] font-bold outline-none placeholder:text-zinc-400 w-48"
              />
              {jornalDateSearch && (
                <button 
                  onClick={() => { setJornalDateSearch(''); setJornalPage(1); }}
                  className="text-zinc-400 hover:text-black font-black text-xs px-1"
                  title="Limpar busca de data"
                >
                  ✕
                </button>
              )}
            </div>

            {/* PÍLULAS DE CATEGORIA */}
            <div className="flex flex-wrap gap-1.5">
              {jornalCategories.map((cat, idx) => (
                <button
                  key={`cat-pill-${idx}`}
                  onClick={() => {
                    setJornalFilter(cat);
                    setJornalPage(1);
                  }}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition ${
                    jornalFilter === cat 
                      ? 'bg-red-600 text-white font-black shadow-sm' 
                      : 'bg-white text-black border border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentJornalItems.map((jornal, idx) => (
            <div key={jornal.id || `jornal-card-${idx}`} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-md hover-lift flex flex-col justify-between hover:border-red-600">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img src={jornal.imageUrl} alt={jornal.title} className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-500" />
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded uppercase shadow-md flex items-center gap-1">
                    <FileText size={10} /> {jornal.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 bg-black/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                    Edição em PDF
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-zinc-500 font-medium">{jornal.date} • Publicação FTTRESP</div>
                  <h3 className="font-extrabold text-black text-base leading-snug hover:text-red-600 transition line-clamp-2">
                    {jornal.title}
                  </h3>
                  <p className="text-zinc-600 text-xs line-clamp-3 leading-relaxed">
                    {jornal.summary}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 flex items-center gap-2">
                <a 
                  href={jornal.fileUrl || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Eye size={14} /> Ler Jornal em PDF
                </a>
                <a 
                  href={jornal.fileUrl || "#"} 
                  download
                  className="p-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl border border-zinc-800 transition"
                  title="Baixar Edição PDF"
                >
                  <Download size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLES DE PAGINAÇÃO DE JORNAIS */}
        {filteredJornais.length > 0 ? (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 shadow-sm">
            <span className="text-xs text-zinc-600 font-bold">
              Exibindo edições {((jornalPage - 1) * jornaisPerPage) + 1}–{Math.min(jornalPage * jornaisPerPage, filteredJornais.length)} de {filteredJornais.length} jornais em PDF publicados
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={jornalPage === 1}
                onClick={() => setJornalPage(prev => Math.max(prev - 1, 1))}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm"
              >
                ◄ Anterior
              </button>

              {Array.from({ length: totalJornalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={`j-pg-${pg}`}
                  onClick={() => setJornalPage(pg)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                    jornalPage === pg
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white text-black border border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={jornalPage === totalJornalPages}
                onClick={() => setJornalPage(prev => Math.min(prev + 1, totalJornalPages))}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm"
              >
                Próxima ►
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-200 text-center text-xs font-bold text-zinc-500 uppercase">
            Nenhum jornal ou informativo encontrado para os filtros selecionados.
          </div>
        )}
      </section>

      {/* 9. IMPRENSA E NOTÍCIAS EM GRID DE 3 EM 3 CARDS PAGINADO */}
      <section className="container space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <span className="text-[11px] text-red-600 font-extrabold uppercase tracking-wider">Imprensa FTTRESP</span>
            <h2 className="text-2xl font-black text-black">Últimas Notícias da Categoria</h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat, idx) => (
              <button
                key={`news-cat-${idx}`}
                onClick={() => {
                  setNewsFilter(cat);
                  setNewsPage(1);
                }}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition ${
                  newsFilter === cat 
                    ? 'bg-red-600 text-white font-black shadow-sm' 
                    : 'bg-white text-black border border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentNewsItems.map((item, idx) => (
            <div key={item.id || `news-card-${idx}`} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-md hover-lift flex flex-col justify-between hover:border-red-600">
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded uppercase shadow-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-zinc-500 font-medium">{item.date} • Por {item.author}</div>
                  <h3 className="font-extrabold text-black text-base leading-snug hover:text-red-600 transition line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 text-xs line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button className="text-red-600 font-bold text-xs flex items-center gap-1 hover:gap-1.5 transition">
                  Ler Matéria Completa <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLES DE PAGINAÇÃO DE NOTÍCIAS */}
        {filteredNews.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 shadow-sm">
            <span className="text-xs text-zinc-600 font-bold">
              Exibindo matérias {((newsPage - 1) * itemsPerPage) + 1}–{Math.min(newsPage * itemsPerPage, filteredNews.length)} de {filteredNews.length} notícias publicadas
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={newsPage === 1}
                onClick={() => setNewsPage(prev => Math.max(prev - 1, 1))}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm"
              >
                ◄ Anterior
              </button>

              {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={`pg-${pg}`}
                  onClick={() => setNewsPage(pg)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                    newsPage === pg
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white text-black border border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={newsPage === totalNewsPages}
                onClick={() => setNewsPage(prev => Math.min(prev + 1, totalNewsPages))}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 text-xs font-black uppercase text-black disabled:opacity-30 hover:bg-zinc-100 transition shadow-sm"
              >
                Próxima ►
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
