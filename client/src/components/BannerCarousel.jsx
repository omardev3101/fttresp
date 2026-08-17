import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Tv } from 'lucide-react';

export default function BannerCarousel({ banners = [], setCurrentPage }) {
  const defaultBanners = [
    {
      id: "b-1",
      title: "União, Força e Tecnologia em Defesa dos Rodoviários de SP",
      subtitle: "Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo. Conectando 97 sindicatos, convenções coletivas digitais, Web TV e Rádio Web 24h.",
      badge: "Plataforma Oficial FTTRESP 2026",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      btnText: "Central dos 97 Sindicatos Filiados",
      linkUrl: "unions",
      active: true
    },
    {
      id: "b-2",
      title: "Convenções Coletivas Digitais & Pisos Salariais 2026",
      subtitle: "Consulte o piso salarial normativo e direitos atualizados do seu setor (Cargas, Urbano, Fretamento e Entregadores).",
      badge: "Acordos Coletivos de Trabalho",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
      btnText: "Ver Pisos & Convenções Coletivas",
      linkUrl: "salary",
      active: true
    }
  ];

  const displayBanners = banners && banners.length > 0 ? banners : defaultBanners;
  const activeBanners = displayBanners.filter(b => b.active !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length, isPaused]);

  if (!activeBanners || activeBanners.length === 0) {
    return null;
  }

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  return (
    <div className="container mx-auto my-4 font-sans">
      <section 
        className="relative bg-black text-white py-12 sm:py-16 px-8 sm:px-12 overflow-hidden rounded-3xl shadow-2xl border border-red-600/60 min-h-[400px] sm:min-h-[460px] flex flex-col justify-between"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Camada de Fundo Suave Blur (Ambiência de proporção) */}
        {currentBanner.imageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src={currentBanner.imageUrl} 
              alt="Banner background ambient" 
              className="w-full h-full object-cover opacity-20 blur-xl scale-110"
            />
            {/* Camada da Imagem 100% INTEIRA e VISÍVEL dentro do Banner sem cortes (object-contain) */}
            <img 
              src={currentBanner.imageUrl} 
              alt={currentBanner.title} 
              className="absolute inset-y-0 right-0 w-full lg:w-3/4 h-full object-contain object-right p-4 opacity-75 transition-all duration-700 pointer-events-none"
            />
            {/* Sombreamento degradê em preto puro */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
          </div>
        )}

        {/* Conteúdo do Banner com Legibilidade Alta */}
        <div className="relative z-10 space-y-5 max-w-3xl my-auto">
          {currentBanner.badge && (
            <div className="inline-flex items-center gap-2 bg-red-600 border border-red-500 text-white text-xs px-3.5 py-1 rounded-full font-black uppercase tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              {currentBanner.badge}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white transition-all duration-500 drop-shadow-md">
            {currentBanner.title}
          </h1>

          <p className="text-slate-200 text-sm sm:text-lg leading-relaxed max-w-2xl transition-all duration-500 font-medium">
            {currentBanner.subtitle}
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {currentBanner.btnText && (
              <button 
                onClick={() => currentBanner.linkUrl && setCurrentPage(currentBanner.linkUrl)}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition flex items-center gap-2"
              >
                <Search size={18} /> {currentBanner.btnText}
              </button>
            )}

            <button 
              onClick={() => setCurrentPage('webtv')}
              className="bg-zinc-900 hover:bg-black text-white font-black text-sm px-6 py-3.5 rounded-2xl border border-red-600 transition flex items-center gap-2 shadow-xl hover:scale-105"
            >
              <Tv size={18} /> Assistir Web TV Ao Vivo
            </button>
          </div>
        </div>

        {/* Setas e Indicadores de Navegação */}
        {activeBanners.length > 1 && (
          <div className="relative z-10 flex items-center justify-between mt-6 pt-3 border-t border-white/15">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-xl bg-black hover:bg-red-600 text-white transition border border-zinc-700 shadow-md"
                title="Slide Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-xl bg-black hover:bg-red-600 text-white transition border border-zinc-700 shadow-md"
                title="Próximo Slide"
              >
                <ChevronRight size={20} />
              </button>
              <span className="text-xs text-slate-300 font-bold ml-2">
                Slide {currentIndex + 1} de {activeBanners.length}
              </span>
            </div>

            {/* Marcadores em Pontos */}
            <div className="flex items-center gap-2">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-red-600' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
