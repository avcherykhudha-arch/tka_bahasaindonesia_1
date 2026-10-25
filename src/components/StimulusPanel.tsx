/**
 * Stimulus Panel Component
 * Displays authentic reading texts (250-300 words), dual-text tabs,
 * SVG charts/tables, and textual evidence highlighting.
 */

import React, { useState } from 'react';
import {
  Volume2,
  Square,
  BookMarked,
  FileText,
  BarChart2,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { StimulusPackage } from '../types/assessment';
import { FontSizeSetting } from '../utils/storage';

interface StimulusPanelProps {
  stimulus: StimulusPackage;
  fontSize: FontSizeSetting;
  highlightSnippet?: string;
  onReadStimulus: () => void;
  isReading: boolean;
}

export const StimulusPanel: React.FC<StimulusPanelProps> = ({
  stimulus,
  fontSize,
  highlightSnippet,
  onReadStimulus,
  isReading,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveTab(0);
  }, [stimulus.id]);

  // Dynamic font size classes for comfortable academic reading
  const fontClass =
    fontSize === 'sm'
      ? 'text-base sm:text-lg leading-[1.8]'
      : fontSize === 'lg'
      ? 'text-xl sm:text-2xl leading-[1.9]'
      : 'text-lg sm:text-xl leading-[1.85]';

  const headingClass =
    fontSize === 'sm'
      ? 'text-xl sm:text-2xl'
      : fontSize === 'lg'
      ? 'text-2xl sm:text-3xl'
      : 'text-xl sm:text-2xl';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Stimulus Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-5 flex-shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#C8102E] text-white text-xs font-bold tracking-wide uppercase shadow-sm">
              Paket Stimulus {stimulus.packetNumber}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-700 text-slate-200 text-xs font-medium">
              {stimulus.genre}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-amber-300">±{stimulus.wordCount} Kata</span>
            <span>•</span>
            <span className="truncate max-w-[200px]">{stimulus.authorOrSource}</span>
          </div>
        </div>

        <h2 className={`${headingClass} font-serif font-bold text-slate-50 tracking-tight leading-snug`}>
          {stimulus.title}
        </h2>
      </div>

      {/* Multi-Text Tabs (If present, e.g. Paket 3 & Paket 7) */}
      {stimulus.tabs && stimulus.tabs.length > 0 && (
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 flex-shrink-0 overflow-x-auto">
          {stimulus.tabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-white text-[#C8102E] border-t-2 border-t-[#C8102E] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Audio & Evidence Action Strip */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onReadStimulus}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all ${
            isReading
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-white hover:bg-red-50 text-[#C8102E] border border-red-200'
          }`}
        >
          {isReading ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isReading ? 'Hentikan Bacaan' : 'Dengarkan Teks (Mister Jo)'}</span>
        </button>

        {highlightSnippet && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kutipan Bukti Aktif Disorot</span>
          </span>
        )}
      </div>

      {/* Scrollable Reading Area */}
      <div ref={scrollRef} className="p-5 sm:p-7 overflow-y-auto flex-grow font-serif text-slate-800 space-y-5">
        {stimulus.tabs && stimulus.tabs.length > 0 ? (
          <div>
            {stimulus.tabs[activeTab].subtitle && (
              <p className="text-sm font-sans font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                {stimulus.tabs[activeTab].subtitle}
              </p>
            )}
            <div className={fontClass}>
              {renderFormattedText(stimulus.tabs[activeTab].content, highlightSnippet)}
            </div>
          </div>
        ) : (
          <div className={fontClass}>
            {renderFormattedText(stimulus.fullText, highlightSnippet)}
          </div>
        )}

        {/* Visual Chart / Table if included in Stimulus */}
        {stimulus.visual && (
          <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
              <BarChart2 className="w-4 h-4 text-[#C8102E]" />
              <span>{stimulus.visual.caption}</span>
            </div>

            {stimulus.visual.chartData && (
              <div className="space-y-2.5 pt-1">
                {stimulus.visual.chartData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.label}</span>
                      <span className="text-[#C8102E] font-bold">{item.value}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C8102E] to-[#E63946] rounded-full transition-all duration-700"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Active Highlight Explanation Box */}
        {highlightSnippet && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-300/80 font-sans text-xs sm:text-sm text-amber-900 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 font-bold mb-1 text-amber-950">
              <BookMarked className="w-4 h-4 text-amber-600" />
              <span>Sorotan Bukti Tekstual Pembahasan:</span>
            </div>
            <p className="italic bg-white/70 p-2.5 rounded-lg border border-amber-200">
              "{highlightSnippet}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Splits text into paragraphs and highlights evidence snippet if found
 */
function renderFormattedText(fullText: string, snippet?: string) {
  const paragraphs = fullText.split(/\n\n+/);

  return paragraphs.map((para, pIdx) => {
    if (!snippet || snippet.length < 5 || !para.toLowerCase().includes(snippet.toLowerCase().slice(0, 30))) {
      return (
        <p key={pIdx} className="mb-4 text-justify indent-6">
          {para}
        </p>
      );
    }

    // Highlight matching part
    return (
      <p key={pIdx} className="mb-4 text-justify indent-6 bg-amber-50/60 p-2 rounded-lg border-l-4 border-amber-500">
        {para}
      </p>
    );
  });
}
