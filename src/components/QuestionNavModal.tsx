/**
 * Question Navigation Grid Modal
 * Master TKA Bahasa Indonesia 2026
 */

import React, { useState } from 'react';
import { X, CheckCircle2, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { Question, UserAnswer, MainCompetency } from '../types/assessment';
import { isQuestionAnswerCorrect } from '../utils/irtScoring';

interface QuestionNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  submittedQuestions: Record<string, boolean>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionNavModal: React.FC<QuestionNavModalProps> = ({
  isOpen,
  onClose,
  questions,
  currentQuestionIndex,
  answers,
  submittedQuestions,
  onSelectQuestion,
}) => {
  const [filter, setFilter] = useState<'Semua' | MainCompetency>('Semua');

  if (!isOpen) return null;

  const filteredQuestions =
    filter === 'Semua'
      ? questions
      : questions.filter((q) => q.competency === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Navigasi 30 Soal Latihan TKA
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Pilih nomor soal untuk langsung berpindah halaman
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Navigasi"
            className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 border-b border-slate-200/80 bg-white flex flex-wrap gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFilter('Semua')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'Semua'
                ? 'bg-[#C8102E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua (30)
          </button>
          <button
            type="button"
            onClick={() => setFilter('Pemahaman Tekstual')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'Pemahaman Tekstual'
                ? 'bg-[#C8102E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tekstual (8)
          </button>
          <button
            type="button"
            onClick={() => setFilter('Pemahaman Inferensial')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'Pemahaman Inferensial'
                ? 'bg-[#C8102E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Inferensial (10)
          </button>
          <button
            type="button"
            onClick={() => setFilter('Evaluasi dan Apresiasi')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'Evaluasi dan Apresiasi'
                ? 'bg-[#C8102E] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Evaluasi (12)
          </button>
        </div>

        {/* Grid of 30 Numbers */}
        <div className="p-6 overflow-y-auto grid grid-cols-5 sm:grid-cols-6 gap-3">
          {filteredQuestions.map((q) => {
            const actualIndex = questions.findIndex((item) => item.id === q.id);
            const isCurrent = actualIndex === currentQuestionIndex;
            const isSubmitted = !!submittedQuestions[q.id];
            const hasAnswer = userAnswerExists(answers[q.id], q.questionType);
            const isCorrect = isSubmitted && isQuestionAnswerCorrect(q, answers[q.id]);

            let badgeStyle = 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-400';
            let label = 'Belum';

            if (isSubmitted) {
              if (isCorrect) {
                badgeStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-sm shadow-emerald-500/20';
                label = 'Benar';
              } else {
                badgeStyle = 'bg-rose-500 border-rose-600 text-white shadow-sm shadow-rose-500/20';
                label = 'Salah';
              }
            } else if (hasAnswer) {
              badgeStyle = 'bg-amber-100 border-amber-300 text-amber-900';
              label = 'Draft';
            }

            if (isCurrent) {
              badgeStyle += ' ring-4 ring-red-500/30 scale-105 font-black';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onSelectQuestion(actualIndex);
                  onClose();
                }}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${badgeStyle}`}
              >
                <span className="text-lg font-black">{q.number}</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-90">
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Legend Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300" />
            <span>Belum Dikerjakan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
            <span>Jawaban Tersimpan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            <span>Jawaban Benar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
            <span>Jawaban Belum Tepat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function userAnswerExists(answer: UserAnswer | undefined, type: string): boolean {
  if (!answer) return false;
  if (type === 'PG') return typeof answer === 'string' && answer.length > 0;
  if (type === 'PGK_MCMA') return Array.isArray(answer) && answer.length > 0;
  if (type === 'PGK_KATEGORI') {
    return (
      typeof answer === 'object' &&
      !Array.isArray(answer) &&
      Object.keys(answer).length > 0
    );
  }
  return false;
}
