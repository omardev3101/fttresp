import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Tv, ArrowRight, Play } from 'lucide-react';

export default function BannerCarousel({ banners = [], setCurrentPage }) {
  const activeBanners = banners.filter(b => b.active !== false);
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
    <div className="container mx-auto my-4">
      <section 
        className="relative gradient-hero text-white py-8 sm:py-10 px-6 overflow-hidden rounded-3xl shadow-2xl border border-slate-800"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Dynamic Background Image Overlay */}
        {currentBanner.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={currentBanner.imageUrl} 
              alt="Banner background" 
              className="w-full h-full object-cover opacity-25 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
          </div>
        )}

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center min-h-[280px]">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4">
            {currentBanner.badge && (
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                {currentBanner.badge}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white transition-all duration-500">
              {currentBanner.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl transition-all duration-500">
              {currentBanner.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {currentBanner.btnText && (
                <button 
                  onClick={() => currentBanner.linkUrl && setCurrentPage(currentBanner.linkUrl)}
                  className="gradient-gold hover:opacity-95 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2"
                >
                  <Search size={16} /> {currentBanner.btnText}
                </button>
              )}

              <button 
                onClick={() => setCurrentPage('webtv')}
                className="bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 hover:border-amber-400 transition flex items-center gap-2"
              >
                <Tv size={16} className="text-amber-400" /> Assistir Web TV Ao Vivo
              </button>
            </div>
          </div>

          {/* Right Side Web TV Live Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[11px] font-black text-white uppercase tracking-wider">Web TV FTTRESP</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded">Multi-Canais</span>
              </div>

              <div 
                className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center group cursor-pointer"
                onClick={() => setCurrentPage('webtv')}
              >
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" 
                  alt="Web TV Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-70" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="w-12 h-12 rounded-full gradient-gold text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition z-10">
                  <Play size={22} fill="currentColor" className="ml-0.5" />
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                  <div className="text-[11px] text-amber-400 font-bold">Jornal Rodoviário de SP</div>
                  <div className="text-xs font-extrabold text-white truncate">Edição Especial: Conquistas Trabalhistas 2026</div>
                </div>
              </div>

              <button 
                onClick={() => setCurrentPage('webtv')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition"
              >
                Acessar todos os 4 Canais de TV <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows & Dots */}
        {activeBanners.length > 1 && (
          <div className="relative z-10 flex items-center justify-between mt-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition border border-slate-700"
                title="Slide Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNext}
                className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition border border-slate-700"
                title="Próximo Slide"
              >
                <ChevronRight size={18} />
              </button>
              <span className="text-[11px] text-slate-400 font-bold ml-2">
                Slide {currentIndex + 1} de {activeBanners.length}
              </span>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
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
