/**
 * Header Component with Merah Putih Theme & Essential Controls
 * Master TKA Bahasa Indonesia 2026
 */

import React from 'react';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Award,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { FontSizeSetting } from '../utils/storage';

interface HeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  completedCount: number;
  fontSize: FontSizeSetting;
  onFontSizeChange: (size: FontSizeSetting) => void;
  onOpenNav: () => void;
  onOpenGuide: () => void;
  onOpenBenefits: () => void;
  onOpenSettings: () => void;
  onOpenReset: () => void;
  onShowResults: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  completedCount,
  fontSize,
  onFontSizeChange,
  onOpenNav,
  onOpenGuide,
  onOpenBenefits,
  onOpenSettings,
  onOpenReset,
  onShowResults,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Ribbon Merah Putih */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#C8102E] via-[#E63946] to-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#99001A] flex items-center justify-center text-white shadow-md shadow-red-500/20 ring-2 ring-red-100 flex-shrink-0">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight">TKA</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-[#C8102E]">
                  2026 HOTS
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  SMA / MA / SMK WAJIB
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none mt-0.5">
                Master TKA Bahasa Indonesia
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden md:block">
                Bersama <span className="font-semibold text-[#C8102E]">Mister Jo</span> — Bahasa Persatuan, Penalaran Juara!
              </p>
            </div>
          </div>

          {/* Quick Info & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font Sizer Controls */}
            <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => onFontSizeChange('sm')}
                aria-label="Ukuran font kecil"
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'sm' ? 'bg-white shadow text-[#C8102E]' : 'hover:text-slate-900'
                }`}
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('md')}
                aria-label="Ukuran font standar"
                className={`px-2.5 py-1 rounded transition-colors ${
                  fontSize === 'md' ? 'bg-white shadow text-[#C8102E]' : 'hover:text-slate-900'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('lg')}
                aria-label="Ukuran font besar"
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'lg' ? 'bg-white shadow text-[#C8102E]' : 'hover:text-slate-900'
                }`}
              >
                A+
              </button>
            </div>

            {/* Quick Audio Mute Toggle */}
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? 'Aktifkan Suara Narator' : 'Matikan Suara Narator'}
              aria-label={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
              className={`p-2 rounded-lg border transition-colors ${
                isMuted
                  ? 'bg-slate-100 border-slate-300 text-slate-400'
                  : 'bg-red-50 border-red-200 text-[#C8102E] hover:bg-red-100'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
            </button>

            {/* Progress Badge Button */}
            <button
              type="button"
              onClick={onOpenNav}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Soal {currentQuestionIndex + 1}/{totalQuestions}</span>
              </span>
              <span className="hidden sm:inline-block text-xs font-normal text-slate-500">
                ({completedCount} selesai)
              </span>
            </button>

            {/* Results / Dashboard Shortcut */}
            <button
              type="button"
              onClick={onShowResults}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Hasil & Skor</span>
            </button>

            {/* More Menu Dropdown trigger */}
            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Buka Menu Pengaturan"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
