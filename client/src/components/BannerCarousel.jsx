import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Tv, ArrowRight } from 'lucide-react';

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
    <div className="container mx-auto my-3 font-sans">
      <section 
        className="relative gradient-hero text-white py-6 sm:py-7 px-6 overflow-hidden rounded-2xl shadow-xl border border-red-900/40"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Dynamic Background Image Overlay */}
        {currentBanner.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={currentBanner.imageUrl} 
              alt="Banner background" 
              className="w-full h-full object-cover opacity-30 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>
        )}

        {/* Full-width Slide Content (Web TV retirado do carrossel) */}
        <div className="relative z-10 space-y-3 max-w-4xl py-1">
          {currentBanner.badge && (
            <div className="inline-flex items-center gap-1.5 bg-red-600/90 border border-red-500 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              {currentBanner.badge}
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white transition-all duration-500">
            {currentBanner.title}
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl transition-all duration-500">
            {currentBanner.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {currentBanner.btnText && (
              <button 
                onClick={() => currentBanner.linkUrl && setCurrentPage(currentBanner.linkUrl)}
                className="gradient-gold hover:opacity-95 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-1.5"
              >
                <Search size={14} /> {currentBanner.btnText}
              </button>
            )}

            <button 
              onClick={() => setCurrentPage('webtv')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-red-500 transition flex items-center gap-1.5 shadow-md"
            >
              <Tv size={14} /> Assistir Web TV Ao Vivo
            </button>
          </div>
        </div>

        {/* Carousel Navigation Arrows & Dots */}
        {activeBanners.length > 1 && (
          <div className="relative z-10 flex items-center justify-between mt-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="p-1 rounded-lg bg-slate-900/80 hover:bg-red-600 text-white transition border border-slate-700"
                title="Slide Anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext}
                className="p-1 rounded-lg bg-slate-900/80 hover:bg-red-600 text-white transition border border-slate-700"
                title="Próximo Slide"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-[10px] text-slate-300 font-bold ml-2">
                Slide {currentIndex + 1} de {activeBanners.length}
              </span>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-5 bg-red-500' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
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
