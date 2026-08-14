import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Clock, ChevronDown, ChevronUp, Music } from 'lucide-react';

export default function FloatingRadioPlayer({ radioConfig }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log('Audio error:', err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
      {/* Audio HTML5 element */}
      <audio 
        ref={audioRef} 
        src={radioConfig?.streamUrl || "https://stream.zeno.fm/f3wvbbqmdg8uv"} 
        preload="none" 
      />

      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl shadow-2xl overflow-hidden text-white w-80 md:w-96 shadow-amber-500/10">
        {/* Top Header Panel */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Radio size={14} /> Rádio Web FTTRESP 24h
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-950 px-2 py-0.5 rounded-md font-mono text-slate-300 flex items-center gap-1">
              <Clock size={11} className="text-amber-400" /> {currentTime}
            </span>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white p-1"
            >
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
        </div>

        {/* Player Expanded Body */}
        {isExpanded && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center text-slate-950 font-black shrink-0 shadow-lg">
                  <Music size={22} className={isPlaying ? "animate-bounce" : ""} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider truncate">
                    {radioConfig?.currentDj || "AutoDJ FTTRESP Estúdio Central"}
                  </div>
                  <div className="text-sm font-semibold text-white truncate">
                    {radioConfig?.currentTrack || "Informativo FTTRESP - Conquistas 2026"}
                  </div>
                </div>
              </div>

              {/* Play / Pause Main Button */}
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full gradient-gold text-slate-950 flex items-center justify-center shrink-0 shadow-lg hover:scale-105 transition"
              >
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <button onClick={toggleMute} className="flex items-center gap-1.5 hover:text-amber-400 transition">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{isMuted ? 'Mudo' : 'Som Ligado'}</span>
              </button>

              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                Hora Certa Ativa
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
