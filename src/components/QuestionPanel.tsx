/**
 * Question Panel Component
 * Supports PG (single choice), PGK-MCMA (multiple choices checkbox),
 * and PGK-Kategori (3 statements Benar/Salah).
 * Features dual explanation modes: Normal Explanation & Fast Strategy.
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  Square,
  Zap,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  Check,
  RotateCcw,
  Info,
} from 'lucide-react';
import {
  Question,
  UserAnswer,
  QuestionOption,
  CategoryStatement,
} from '../types/assessment';
import { FontSizeSetting } from '../utils/storage';
import { isQuestionAnswerCorrect } from '../utils/irtScoring';

interface QuestionPanelProps {
  question: Question;
  userAnswer?: UserAnswer;
  isSubmitted: boolean;
  fontSize: FontSizeSetting;
  onAnswerChange: (answer: UserAnswer) => void;
  onSubmitAnswer: () => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPlayNarration: (title: string, text: string) => void;
  isAudioSpeaking: boolean;
  onStopAudio: () => void;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  userAnswer,
  isSubmitted,
  fontSize,
  onAnswerChange,
  onSubmitAnswer,
  onPrevQuestion,
  onNextQuestion,
  hasPrev,
  hasNext,
  onPlayNarration,
  isAudioSpeaking,
  onStopAudio,
}) => {
  const [activeExplanationTab, setActiveExplanationTab] = useState<'normal' | 'fast'>('normal');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [question.id]);

  const isCorrect = isSubmitted && isQuestionAnswerCorrect(question, userAnswer);

  // Validate answer completeness before enabling submit
  const isAnswerValidToSubmit = (): boolean => {
    if (!userAnswer) return false;
    if (question.questionType === 'PG') {
      return typeof userAnswer === 'string' && userAnswer.length > 0;
    }
    if (question.questionType === 'PGK_MCMA') {
      return Array.isArray(userAnswer) && userAnswer.length > 0;
    }
    if (question.questionType === 'PGK_KATEGORI') {
      if (typeof userAnswer !== 'object' || Array.isArray(userAnswer)) return false;
      const map = userAnswer as Record<string, string>;
      return ['A', 'B', 'C'].every(
        (key) => map[key] === 'BENAR' || map[key] === 'SALAH'
      );
    }
    return false;
  };

  // Handlers for answer changes
  const handleSelectPG = (key: string) => {
    if (isSubmitted) return;
    onAnswerChange(key);
  };

  const handleToggleMCMA = (key: string) => {
    if (isSubmitted) return;
    const current = Array.isArray(userAnswer) ? [...userAnswer] : [];
    const index = current.indexOf(key);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(key);
    }
    onAnswerChange(current);
  };

  const handleSelectKategori = (statementKey: string, value: 'BENAR' | 'SALAH') => {
    if (isSubmitted) return;
    const current =
      typeof userAnswer === 'object' && !Array.isArray(userAnswer)
        ? { ...(userAnswer as Record<string, 'BENAR' | 'SALAH'>) }
        : {};
    current[statementKey] = value;
    onAnswerChange(current);
  };

  // Typography scaling
  const promptFontClass =
    fontSize === 'sm'
      ? 'text-lg sm:text-xl font-bold leading-relaxed'
      : fontSize === 'lg'
      ? 'text-2xl sm:text-3xl font-extrabold leading-snug'
      : 'text-xl sm:text-2xl font-bold leading-snug';

  const optionFontClass =
    fontSize === 'sm'
      ? 'text-sm sm:text-base leading-relaxed'
      : fontSize === 'lg'
      ? 'text-lg sm:text-xl leading-relaxed'
      : 'text-base sm:text-lg leading-relaxed';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Question Header & Meta Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex-shrink-0 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-extrabold text-xs sm:text-sm shadow-sm tracking-wide">
              SOAL #{question.number} DARI 30
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                question.questionType === 'PG'
                  ? 'bg-blue-100 text-blue-800'
                  : question.questionType === 'PGK_MCMA'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {question.questionType === 'PG'
                ? 'Pilihan Ganda (1 Jawaban)'
                : question.questionType === 'PGK_MCMA'
                ? 'PG Kompleks (Multiple-Answer)'
                : 'PG Kompleks (Kategori Benar/Salah)'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
              Kesulitan: <strong className="text-slate-900">{question.difficulty}</strong>
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-slate-200/70 text-slate-600 font-mono text-[11px]" title="Parameter IRT 2PL">
              a={question.paramA} | b={question.paramB}
            </span>
          </div>
        </div>

        {/* Competency & Subcompetency Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-bold text-[#C8102E] bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-md">
            {question.competency}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 font-medium">
            Subkompetensi {question.subcompetency}: {question.subcompetencyName}
          </span>
        </div>
      </div>

      {/* Main Question Scroll Area */}
      <div ref={scrollRef} className="p-5 sm:p-7 overflow-y-auto flex-grow space-y-6">
        {/* Question Prompt */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <p className={`${promptFontClass} text-slate-900`}>{question.prompt}</p>
            <button
              type="button"
              onClick={() =>
                onPlayNarration(
                  `Pertanyaan Soal #${question.number}`,
                  question.narrations.questionAndOptions
                )
              }
              title="Dengarkan Pertanyaan"
              aria-label="Dengarkan Pertanyaan"
              className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-[#C8102E] text-slate-600 transition-colors flex-shrink-0"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {question.questionType === 'PGK_MCMA' && !isSubmitted && (
            <p className="text-xs sm:text-sm font-semibold text-purple-700 bg-purple-50 p-2.5 rounded-lg border border-purple-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>Petunjuk: Pilihlah SELURUH opsi yang benar (2 atau 3 jawaban). Gunakan kotak centang!</span>
            </p>
          )}

          {question.questionType === 'PGK_KATEGORI' && !isSubmitted && (
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span>Petunjuk: Setiap baris pernyataan wajib ditentukan apakah BENAR atau SALAH!</span>
            </p>
          )}
        </div>

        {/* ================= OPTIONS RENDERING ================= */}

        {/* 1. PG: Single Choice (Radio Cards) */}
        {question.questionType === 'PG' && question.options && (
          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = userAnswer === opt.key;
              const isCorrectKey = opt.key === question.correctAnswer;

              let cardStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
              if (isSelected && !isSubmitted) {
                cardStyle = 'border-[#C8102E] bg-red-50/50 ring-2 ring-red-500/20 text-slate-950';
              } else if (isSubmitted) {
                if (isCorrectKey) {
                  cardStyle = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30 text-emerald-950';
                } else if (isSelected && !isCorrectKey) {
                  cardStyle = 'border-red-400 bg-red-50/70 ring-2 ring-red-400/30 text-red-950';
                } else {
                  cardStyle = 'border-slate-200 bg-slate-50/60 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectPG(opt.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${cardStyle} ${
                    !isSubmitted ? 'cursor-pointer hover:shadow-sm' : 'cursor-default'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                      isSelected
                        ? isSubmitted
                          ? isCorrectKey
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-600 text-white'
                          : 'bg-[#C8102E] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className={`${optionFontClass} flex-grow pt-0.5`}>
                    {opt.text}
                  </span>
                  {isSubmitted && isCorrectKey && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  )}
                  {isSubmitted && isSelected && !isCorrectKey && (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. PGK-MCMA: Multiple-Answer (Checkbox Cards) */}
        {question.questionType === 'PGK_MCMA' && question.options && (
          <div className="space-y-3">
            {question.options.map((opt) => {
              const selectedArr = Array.isArray(userAnswer) ? userAnswer : [];
              const isSelected = selectedArr.includes(opt.key);
              const correctArr = Array.isArray(question.correctAnswer)
                ? question.correctAnswer
                : [];
              const isCorrectKey = correctArr.includes(opt.key);

              let cardStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
              if (isSelected && !isSubmitted) {
                cardStyle = 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-500/20 text-slate-950';
              } else if (isSubmitted) {
                if (isCorrectKey) {
                  cardStyle = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30 text-emerald-950';
                } else if (isSelected && !isCorrectKey) {
                  cardStyle = 'border-red-400 bg-red-50/70 ring-2 ring-red-400/30 text-red-950';
                } else {
                  cardStyle = 'border-slate-200 bg-slate-50/60 opacity-60 text-slate-600';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleToggleMCMA(opt.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${cardStyle} ${
                    !isSubmitted ? 'cursor-pointer hover:shadow-sm' : 'cursor-default'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-md border flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? isSubmitted
                          ? isCorrectKey
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-red-600 border-red-600 text-white'
                          : 'bg-purple-700 border-purple-700 text-white shadow-sm'
                        : 'border-slate-300 bg-slate-50 text-slate-600'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : opt.key}
                  </div>
                  <span className={`${optionFontClass} flex-grow pt-0.5`}>
                    {opt.text}
                  </span>
                  {isSubmitted && isCorrectKey && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex-shrink-0 mt-1">
                      Kunci Benar
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 3. PGK-KATEGORI: 3 Statements Benar / Salah Table */}
        {question.questionType === 'PGK_KATEGORI' && question.statements && (
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white">
              <div className="bg-slate-100/90 px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Pernyataan Evaluasi</span>
                <span className="w-44 text-center">Penilaian</span>
              </div>

              {question.statements.map((stmt) => {
                const map =
                  typeof userAnswer === 'object' && !Array.isArray(userAnswer)
                    ? (userAnswer as Record<string, 'BENAR' | 'SALAH'>)
                    : {};
                const currentVal = map[stmt.key];
                const correctMap = question.correctAnswer as Record<string, 'BENAR' | 'SALAH'>;
                const correctVal = correctMap[stmt.key];
                const isStmtCorrect = currentVal === correctVal;

                return (
                  <div
                    key={stmt.key}
                    className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSubmitted
                        ? isStmtCorrect
                          ? 'bg-emerald-50/40'
                          : 'bg-red-50/40'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {stmt.key}
                      </span>
                      <p className={`${optionFontClass} text-slate-800`}>{stmt.text}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 sm:w-44 justify-end sm:justify-center">
                      {/* Button BENAR */}
                      <button
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectKategori(stmt.key, 'BENAR')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          currentVal === 'BENAR'
                            ? isSubmitted
                              ? correctVal === 'BENAR'
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-red-600 border-red-600 text-white'
                              : 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : 'bg-white border-slate-300 text-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        BENAR
                      </button>

                      {/* Button SALAH */}
                      <button
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectKategori(stmt.key, 'SALAH')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          currentVal === 'SALAH'
                            ? isSubmitted
                              ? correctVal === 'SALAH'
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-red-600 border-red-600 text-white'
                              : 'bg-rose-600 border-rose-600 text-white shadow-sm'
                            : 'bg-white border-slate-300 text-slate-700 hover:border-rose-500'
                        }`}
                      >
                        SALAH
                      </button>

                      {isSubmitted && (
                        <span className="text-[11px] font-bold text-slate-500 ml-1">
                          (Kunci: <strong className="text-slate-900">{correctVal}</strong>)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PRE-SUBMIT ACTION CONTROLS ================= */}
        {!isSubmitted && (
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            {/* Strategy Hint Button */}
            <button
              type="button"
              onClick={() =>
                onPlayNarration(
                  `Petunjuk Strategi Soal #${question.number}`,
                  question.narrations.strategyHint
                )
              }
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Petunjuk Berpikir Mister Jo</span>
            </button>

            {/* Submit Button */}
            <button
              type="button"
              disabled={!isAnswerValidToSubmit()}
              onClick={onSubmitAnswer}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-extrabold shadow-md transition-all ${
                isAnswerValidToSubmit()
                  ? 'bg-gradient-to-r from-[#C8102E] to-[#E63946] hover:from-[#A00B22] hover:to-[#C8102E] text-white shadow-red-600/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>KIRIM JAWABAN</span>
            </button>
          </div>
        )}

        {/* ================= POST-SUBMIT EXPLANATIONS & STRATEGY ================= */}
        {isSubmitted && (
          <div className="pt-4 space-y-5 animate-fadeIn">
            {/* Feedback Banner */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-4 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl text-white ${
                  isCorrect ? 'bg-emerald-600' : 'bg-[#C8102E]'
                }`}
              >
                {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-extrabold">
                    {isCorrect ? 'Keren! Jawabanmu Tepat!' : 'Belum Tepat, Ini Kesempatan Belajar!'}
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      onPlayNarration(
                        `Umpan Balik Soal #${question.number}`,
                        isCorrect
                          ? question.narrations.feedbackCorrect
                          : question.narrations.feedbackIncorrect
                      )
                    }
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 shadow-sm"
                    title="Dengarkan Umpan Balik"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                  {isCorrect
                    ? question.narrations.feedbackCorrect
                    : question.narrations.feedbackIncorrect}
                </p>
              </div>
            </div>

            {/* Explanation Mode Tabs: Normal vs Fast Strategy */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setActiveExplanationTab('normal')}
                  className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    activeExplanationTab === 'normal'
                      ? 'bg-white text-[#C8102E] border-b-2 border-[#C8102E] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>PEMBAHASAN NORMAL</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveExplanationTab('fast')}
                  className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    activeExplanationTab === 'fast'
                      ? 'bg-white text-amber-700 border-b-2 border-amber-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>STRATEGI CEPAT MISTER JO</span>
                </button>
              </div>

              {/* TAB 1: PEMBAHASAN NORMAL */}
              {activeExplanationTab === 'normal' && (
                <div className="p-5 sm:p-6 space-y-5 text-sm sm:text-base leading-relaxed">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Analisis Akademis Bertahap (7 Dimensi Penjelasan)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onPlayNarration(
                          `Pembahasan Normal Soal #${question.number}`,
                          question.narrations.normalExplanationAudio
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-[#C8102E] text-xs font-bold hover:bg-red-100 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Pembahasan</span>
                    </button>
                  </div>

                  {/* A. Keterampilan yang diuji */}
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide text-[#C8102E]">
                      A. Keterampilan yang Diuji
                    </h5>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                      {question.normalExplanation.skillTested}
                    </p>
                  </div>

                  {/* B. Memahami tuntutan pertanyaan */}
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide text-[#C8102E]">
                      B. Memahami Tuntutan Pertanyaan
                    </h5>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                      {question.normalExplanation.questionDemand}
                    </p>
                  </div>

                  {/* C. Menemukan bukti tekstual */}
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide text-[#C8102E]">
                      C. Menemukan Bukti Tekstual
                    </h5>
                    <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80 text-amber-950 font-serif italic">
                      "{question.normalExplanation.textualEvidence}"
                    </div>
                  </div>

                  {/* D. Menganalisis bukti */}
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide text-[#C8102E]">
                      D. Menganalisis Bukti
                    </h5>
                    <p className="text-slate-700">
                      {question.normalExplanation.evidenceAnalysis}
                    </p>
                  </div>

                  {/* E. Menilai seluruh opsi */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide text-[#C8102E]">
                      E. Menilai Seluruh Opsi Jawaban
                    </h5>
                    <div className="space-y-2">
                      {question.normalExplanation.optionsReview.map((rev, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border text-xs sm:text-sm leading-relaxed ${
                            rev.verdict === 'Tepat'
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-2 mb-1">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] ${
                                rev.verdict === 'Tepat'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-300 text-slate-800'
                              }`}
                            >
                              Opsi {rev.key}
                            </span>
                            <span
                              className={
                                rev.verdict === 'Tepat'
                                  ? 'text-emerald-700 font-extrabold'
                                  : 'text-slate-600'
                              }
                            >
                              [{rev.verdict.toUpperCase()}]
                            </span>
                          </div>
                          <p>{rev.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* F. Menarik kesimpulan */}
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide text-[#C8102E]">
                      F. Menarik Kesimpulan Akhir
                    </h5>
                    <p className="text-slate-800 font-medium bg-red-50/60 p-3 rounded-lg border border-red-200/80">
                      {question.normalExplanation.conclusion}
                    </p>
                  </div>

                  {/* G. Pelajaran penting */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>G. Pelajaran Penting Penalaran Kritis</span>
                    </div>
                    <p className="leading-relaxed">
                      {question.normalExplanation.keyTakeaway}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: STRATEGI CEPAT MISTER JO */}
              {activeExplanationTab === 'fast' && (
                <div className="p-5 sm:p-6 space-y-5 text-sm sm:text-base leading-relaxed">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Teknik Efisien Membaca Kritis & Eliminasi
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onPlayNarration(
                          `Strategi Cepat Soal #${question.number}`,
                          question.narrations.fastStrategyAudio
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Strategi Cepat</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Langkah 1 */}
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                      <div className="flex items-center gap-2 font-extrabold text-xs text-amber-900 uppercase">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                          1
                        </span>
                        <span>Cermati Lebih Dahulu</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {question.fastStrategy.step1}
                      </p>
                    </div>

                    {/* Langkah 2 */}
                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                      <div className="flex items-center gap-2 font-extrabold text-xs text-blue-900 uppercase">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                          2
                        </span>
                        <span>Petunjuk Utama Keputusan</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {question.fastStrategy.step2}
                      </p>
                    </div>

                    {/* Langkah 3 */}
                    <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1">
                      <div className="flex items-center gap-2 font-extrabold text-xs text-rose-900 uppercase">
                        <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">
                          3
                        </span>
                        <span>Eliminasi Distraktor Lemah</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {question.fastStrategy.step3}
                      </p>
                    </div>

                    {/* Langkah 4 */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                      <div className="flex items-center gap-2 font-extrabold text-xs text-emerald-900 uppercase">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          4
                        </span>
                        <span>Konfirmasi Jawaban Akhir</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700">
                        {question.fastStrategy.step4}
                      </p>
                    </div>
                  </div>

                  {/* Fast Strategy Summary */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1.5 shadow-md">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Zap className="w-4 h-4" />
                      <span>Prinsip Cepat Mister Jo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {question.fastStrategy.summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 flex-shrink-0">
        <button
          type="button"
          disabled={!hasPrev}
          onClick={onPrevQuestion}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
            hasPrev
              ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 shadow-sm'
              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs font-semibold text-slate-500">
          Soal {question.number} dari 30
        </span>

        <button
          type="button"
          disabled={!hasNext}
          onClick={onNextQuestion}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all ${
            hasNext
              ? 'bg-slate-900 hover:bg-slate-800 text-white'
              : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Selanjutnya</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
