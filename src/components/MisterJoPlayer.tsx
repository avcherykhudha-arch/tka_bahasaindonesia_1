/**
 * Mister Jo Floating Audio Mentor & Transcript Widget
 * Master TKA Bahasa Indonesia 2026
 */

import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  FileText,
  ChevronUp,
  ChevronDown,
  Sparkles,
  UserCheck,
} from 'lucide-react';

interface MisterJoPlayerProps {
  isSpeaking: boolean;
  isPaused: boolean;
  title: string;
  transcriptText: string;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReplay: () => void;
  speechRate: number;
  onRateChange: (rate: number) => void;
}

export const MisterJoPlayer: React.FC<MisterJoPlayerProps> = ({
  isSpeaking,
  isPaused,
  title,
  transcriptText,
  onPause,
  onResume,
  onStop,
  onReplay,
  speechRate,
  onRateChange,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);

  if (!isSpeaking && !isPaused && !transcriptText) {
    return null;
  }

  return (
    <aside
      aria-label="Pemutar Audio Mister Jo"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] animate-slideUp"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl border border-slate-700/80 shadow-2xl p-4 sm:p-5 overflow-hidden">
        {/* Mentor Identity & Waveform */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#C8102E] to-red-400 p-0.5 shadow-md flex-shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white font-extrabold text-sm border-2 border-red-500">
                  JO
                </div>
              </div>
              {isSpeaking && !isPaused && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-900"></span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm text-slate-100">
                  Mister Jo
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-600/90 text-white font-bold uppercase">
                  Mentor TKA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                {title || 'Sedang memandu pembelajaran...'}
              </p>
            </div>
          </div>

          {/* Audio Wave Visualizer */}
          <div className="flex items-center gap-1 h-6 px-2">
            {[40, 70, 100, 60, 90, 50].map((h, i) => (
              <span
                key={i}
                className={`w-1 bg-[#E63946] rounded-full transition-all duration-300 ${
                  isSpeaking && !isPaused ? 'animate-pulse' : 'opacity-40'
                }`}
                style={{
                  height: isSpeaking && !isPaused ? `${h}%` : '20%',
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            {/* Play/Pause Button */}
            {isPaused ? (
              <button
                type="button"
                onClick={onResume}
                aria-label="Lanjutkan Audio"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="Lanjutkan"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onPause}
                aria-label="Jeda Audio"
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white transition-colors"
                title="Jeda"
              >
                <Pause className="w-4 h-4 fill-current" />
              </button>
            )}

            {/* Replay Button */}
            <button
              type="button"
              onClick={onReplay}
              aria-label="Ulangi Audio"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Ulangi"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Stop Button */}
            <button
              type="button"
              onClick={onStop}
              aria-label="Hentikan Audio"
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-400 transition-colors"
              title="Berhenti"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Speech Rate Selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-[11px] font-bold text-slate-300">
              {[0.75, 1.0, 1.25].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => onRateChange(rate)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    speechRate === rate
                      ? 'bg-[#C8102E] text-white'
                      : 'hover:text-white'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Toggle Transcript View */}
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              aria-label={showTranscript ? 'Tutup Transkrip' : 'Buka Transkrip'}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Transkrip</span>
              {showTranscript ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Transcript Panel */}
        {showTranscript && transcriptText && (
          <div className="mt-3 p-3 bg-slate-950/90 rounded-2xl border border-slate-800 text-xs text-slate-300 max-h-40 overflow-y-auto leading-relaxed animate-fadeIn">
            <div className="font-bold text-slate-200 mb-1 text-[11px] uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teks Narasi Mister Jo:</span>
            </div>
            <p className="whitespace-pre-line">{transcriptText}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
