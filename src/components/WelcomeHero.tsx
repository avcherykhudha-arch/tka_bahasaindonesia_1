/**
 * Welcome Hero Component (Home / Landing View)
 * Displays big title, subtitle, Mister Jo welcome narator, and 7 primary action buttons.
 */

import React from 'react';
import {
  Play,
  RotateCcw,
  HelpCircle,
  Sparkles,
  BarChart2,
  Settings,
  Volume2,
  BookOpen,
  Award,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { APP_NARRATIONS } from '../utils/speechVoice';

interface WelcomeHeroProps {
  hasExistingProgress: boolean;
  completedCount: number;
  totalQuestions: number;
  onStartExam: () => void;
  onResumeExam: () => void;
  onOpenGuide: () => void;
  onOpenBenefits: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenReset: () => void;
  onPlayWelcomeVoice: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  hasExistingProgress,
  completedCount,
  totalQuestions,
  onStartExam,
  onResumeExam,
  onOpenGuide,
  onOpenBenefits,
  onOpenStats,
  onOpenSettings,
  onOpenReset,
  onPlayWelcomeVoice,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 sm:py-10 animate-fadeIn">
      {/* Hero Merah Putih Banner */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-[#780A1C] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-800 overflow-hidden text-center sm:text-left">
        {/* Decorative elements */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-200 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#E63946]" />
            <span>Tema: Merah Putih — Bahasa Persatuan</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              MASTER TKA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">
                BAHASA INDONESIA 2026
              </span>
            </h1>
            <p className="text-lg sm:text-2xl font-serif text-slate-200 font-medium">
              Belajar Bersama <strong className="text-amber-300 font-sans">Mister Jo</strong>
            </p>
            <p className="text-base sm:text-lg font-semibold text-red-200 tracking-wide">
              “Bahasa Persatuan, Penalaran Juara!”
            </p>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            30 Soal Latihan HOTS Penalaran Kompleks Bahasa Indonesia Wajib jenjang SMA/MA/SMK
            dengan stimulus autentik, estimasi skor IRT 200–800, serta narator interaktif Mister Jo.
          </p>

          {/* Mister Jo Welcome Speech Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onPlayWelcomeVoice}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-sm transition-all"
            >
              <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Dengarkan Sambutan Mister Jo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7 PRIMARY ACTION BUTTONS (MANDATORY IN PROMPT) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Menu Utama Pembelajaran
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Pilih tindakan untuk memulai atau mengelola simulasi belajar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. MULAI LATIHAN */}
          <button
            type="button"
            onClick={onStartExam}
            className="p-5 rounded-2xl bg-gradient-to-r from-[#C8102E] to-[#E63946] hover:from-[#A00B22] hover:to-[#C8102E] text-white text-left shadow-lg shadow-red-600/20 hover:scale-[1.02] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div>
              <div className="text-xs uppercase font-extrabold text-red-200 tracking-wider">
                Simulasi Baru
              </div>
              <div className="text-lg font-black mt-0.5">MULAI LATIHAN</div>
              <div className="text-xs text-red-100 mt-1 font-medium">
                Mulai dari Soal #1 (30 Soal HOTS)
              </div>
            </div>
            <Play className="w-7 h-7 text-white fill-current group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. LANJUTKAN PROGRES */}
          <button
            type="button"
            onClick={onResumeExam}
            className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              hasExistingProgress
                ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:scale-[1.02] cursor-pointer'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-80'
            }`}
          >
            <div>
              <div className="text-xs uppercase font-extrabold opacity-75 tracking-wider">
                Lanjutkan
              </div>
              <div className="text-lg font-black mt-0.5">LANJUTKAN PROGRES</div>
              <div className="text-xs opacity-75 mt-1 font-medium">
                {hasExistingProgress
                  ? `Melanjutkan (${completedCount} dari ${totalQuestions} selesai)`
                  : 'Belum ada progres tersimpan'}
              </div>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 3. PETUNJUK APLIKASI */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-left transition-all hover:scale-[1.01] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Panduan Sistem
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">
                PETUNJUK APLIKASI
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Cara kerja, 3 format soal & narator
              </div>
            </div>
            <HelpCircle className="w-6 h-6 text-slate-600" />
          </button>

          {/* 4. MANFAAT BELAJAR */}
          <button
            type="button"
            onClick={onOpenBenefits}
            className="p-5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-slate-800 text-left transition-all hover:scale-[1.01] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-xs uppercase font-bold text-amber-700 tracking-wider">
                Nilai Tambah
              </div>
              <div className="text-base font-extrabold text-amber-950 mt-0.5">
                MANFAAT BELAJAR
              </div>
              <div className="text-xs text-amber-800 mt-1">
                Keterampilan membaca & nalar HOTS
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-amber-600" />
          </button>

          {/* 5. STATISTIK BELAJAR */}
          <button
            type="button"
            onClick={onOpenStats}
            className="p-5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-slate-800 text-left transition-all hover:scale-[1.01] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-xs uppercase font-bold text-blue-700 tracking-wider">
                Evaluasi Mandiri
              </div>
              <div className="text-base font-extrabold text-blue-950 mt-0.5">
                STATISTIK BELAJAR
              </div>
              <div className="text-xs text-blue-800 mt-1">
                Skor IRT 200–800 & 3 kompetensi
              </div>
            </div>
            <BarChart2 className="w-6 h-6 text-blue-600" />
          </button>

          {/* 6. PENGATURAN NARATOR */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-left transition-all hover:scale-[1.01] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Kustomisasi Audio
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">
                PENGATURAN NARATOR
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Suara id-ID, tempo & ukuran teks
              </div>
            </div>
            <Settings className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* 7. RESET PROGRES */}
        <div className="pt-4 border-t border-slate-100 flex justify-center sm:justify-start">
          <button
            type="button"
            onClick={onOpenReset}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET PROGRES LATIHAN</span>
          </button>
        </div>
      </div>

      {/* Pusmendik Assessment Matrix Overview */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4 font-sans">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
          <BookOpen className="w-5 h-5 text-[#C8102E]" />
          <span>Matriks Kompetensi Membaca TKA Pusmendik</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
            <span className="font-extrabold text-blue-700 text-xs uppercase">
              Kompetensi I (8 Soal)
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Pemahaman Tekstual</h4>
            <p className="text-slate-600">
              Kata serapan asing/daerah, identifikasi latar & karakter, penyusunan kerangka dan bagan teks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
            <span className="font-extrabold text-purple-700 text-xs uppercase">
              Kompetensi II (10 Soal)
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Pemahaman Inferensial</h4>
            <p className="text-slate-600">
              Simpulan ide pokok, konflik batin, relasi makna antarkalimat/paragraf, prediksi kelanjutan uraian.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm">
            <span className="font-extrabold text-emerald-700 text-xs uppercase">
              Kompetensi III (12 Soal)
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Evaluasi dan Apresiasi</h4>
            <p className="text-slate-600">
              Relevansi kehidupan nyata, kecukupan data/bukti, ketepatan diksi, penggambaran latar, respons sastra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
