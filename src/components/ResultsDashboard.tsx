/**
 * Results Dashboard Component
 * Scaled Score 200-800, 2PL IRT Ability Estimation,
 * 3-Competency Diagnostic Charts, and Mister Jo Final Evaluation.
 */

import React from 'react';
import {
  Award,
  BarChart3,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Volume2,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ExamResult, Question, UserAnswer } from '../types/assessment';
import { isQuestionAnswerCorrect } from '../utils/irtScoring';

interface ResultsDashboardProps {
  result: ExamResult;
  questions: Question[];
  answers: Record<string, UserAnswer>;
  submittedQuestions: Record<string, boolean>;
  onSelectQuestion: (index: number) => void;
  onResetExam: () => void;
  onPlayNarration: (title: string, text: string) => void;
  onCloseDashboard: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  questions,
  answers,
  submittedQuestions,
  onSelectQuestion,
  onResetExam,
  onPlayNarration,
  onCloseDashboard,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Top Banner & Main Score Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#780A1C] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-10 text-white/5 font-black text-9xl select-none pointer-events-none">
          TKA
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Title & Badge */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Laporan Asesmen Pusmendik HOTS 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Dashboard Prestasi Literasi
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hasil simulasi berbasis Item Response Theory (IRT 2PL) untuk paket 30 soal penalaran kompleks Bahasa Indonesia Wajib.
            </p>
          </div>

          {/* Large Scaled Score Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 text-center flex flex-col items-center justify-center min-w-[240px] shadow-lg">
            <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest mb-1">
              SKOR ESTIMASI TKA
            </span>
            <div className="text-6xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-md">
              {result.scaledScore}
            </div>
            <div className="text-xs text-slate-300 font-semibold mt-1">
              Rentang Skala Baku: 200 – 800
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-900 shadow">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {result.scaledScore >= 700
                  ? 'Kategori: Peringkat Juara'
                  : result.scaledScore >= 550
                  ? 'Kategori: Siap Lolos PTN'
                  : 'Kategori: Butuh Penguatan'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 relative z-10">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 font-medium">Soal Benar</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {result.correctCount} <span className="text-sm font-normal text-slate-400">/ 30</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 font-medium">Soal Belum Tepat</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1">
              {result.totalQuestions - result.correctCount}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 font-medium">Persentase Akurasi</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">
              {result.accuracyPercentage}%
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 font-medium">Parameter Kemampuan (θ)</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-300 mt-1">
              {result.theta > 0 ? `+${result.theta.toFixed(2)}` : result.theta.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Mister Jo Voice Diagnostic Feedback */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8102E] to-red-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-red-500/20 flex-shrink-0">
          JO
        </div>
        <div className="flex-grow space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Evaluasi Langsung Mister Jo</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-[#C8102E]">
                Personal Feedback
              </span>
            </h3>
            <button
              type="button"
              onClick={() =>
                onPlayNarration('Evaluasi Hasil Belajar Mister Jo', result.teacherSummary)
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#C8102E] text-xs font-bold transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Analisis</span>
            </button>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            "{result.teacherSummary}"
          </p>
        </div>
      </div>

      {/* 3 Main Competencies Bar Charts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C8102E]" />
              <span>Analisis Performa Tiga Kompetensi Utama</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Sesuai Kerangka Asesmen Pusmendik Kemendikdasmen
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {result.competencyScores.map((comp) => {
            const barColor =
              comp.accuracy >= 75
                ? 'from-emerald-500 to-emerald-600'
                : comp.accuracy >= 50
                ? 'from-amber-500 to-amber-600'
                : 'from-rose-500 to-rose-600';

            return (
              <div key={comp.name} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between text-sm font-bold gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800">{comp.name}</span>
                    <span className="text-xs font-semibold text-slate-500">
                      ({comp.correctQuestions} dari {comp.totalQuestions} soal)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        comp.accuracy >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : comp.accuracy >= 50
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {comp.status}
                    </span>
                    <span className="text-slate-900 font-extrabold text-base">
                      {comp.accuracy}%
                    </span>
                  </div>
                </div>

                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.max(5, comp.accuracy)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 italic pt-2">
          *Catatan: Skor estimasi IRT dan analisis kompetensi ini adalah estimasi kemampuan terkalibrasi dua parameter (2PL) untuk paket latihan ini.
        </p>
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strongest Skills */}
        <div className="bg-emerald-50/70 rounded-3xl p-6 border border-emerald-200 space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Keterampilan Paling Kuat</span>
          </div>
          <ul className="space-y-2">
            {result.strongestSkills.map((skill, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-emerald-950 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs Improvement */}
        <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Keterampilan yang Perlu Ditingkatkan</span>
          </div>
          <ul className="space-y-2">
            {result.skillsToImprove.map((skill, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-amber-950 font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Rekomendasi Belajar Mandiri Selanjutnya</span>
        </div>
        <div className="space-y-2.5">
          {result.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-lg bg-[#C8102E] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review All 30 Questions Item-by-Item */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Tinjauan Butir Soal (1 – 30)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Klik nomor butir untuk membuka kembali stimulus, bukti teks, dan pembahasan lengkapnya
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {questions.map((q, idx) => {
            const isSub = !!submittedQuestions[q.id];
            const isCorrect = isSub && isQuestionAnswerCorrect(q, answers[q.id]);

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onSelectQuestion(idx);
                  onCloseDashboard();
                }}
                className={`p-3 rounded-2xl border text-left transition-all hover:scale-[1.02] flex items-center justify-between ${
                  isSub
                    ? isCorrect
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/80 border-rose-300 text-rose-950'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div>
                  <div className="font-extrabold text-sm">Soal #{q.number}</div>
                  <div className="text-[10px] font-semibold opacity-75">
                    {q.questionType}
                  </div>
                </div>
                {isSub ? (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )
                ) : (
                  <span className="text-[10px] font-bold text-slate-400">Belum</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={onResetExam}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-300 hover:border-red-400 text-slate-700 hover:text-[#C8102E] font-bold text-sm shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Seluruh Progres Latihan</span>
        </button>

        <button
          type="button"
          onClick={onCloseDashboard}
          className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#C8102E] to-[#E63946] hover:from-[#A00B22] hover:to-[#C8102E] text-white font-extrabold text-sm sm:text-base shadow-md transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Kembali ke Halaman Soal</span>
        </button>
      </div>
    </div>
  );
};
