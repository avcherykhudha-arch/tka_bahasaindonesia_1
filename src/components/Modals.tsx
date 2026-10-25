/**
 * Modal Dialogs for Guide, Benefits, Voice Settings, and Reset Confirmation
 * Master TKA Bahasa Indonesia 2026
 */

import React from 'react';
import {
  X,
  BookOpen,
  Volume2,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { SpeechSettings } from '../utils/speechVoice';
import { FontSizeSetting } from '../utils/storage';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayGuideNarration: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  onPlayGuideNarration,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#C8102E] flex items-center justify-center font-bold">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Petunjuk Penggunaan Aplikasi</h3>
              <p className="text-xs text-slate-500 font-medium">Panduan resmi bersama Mister Jo</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Petunjuk"
            className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#C8102E] text-sm">Dengarkan Penjelasan Mister Jo</span>
              <p className="text-xs text-slate-600">Simak langsung narasi panduan belajar terarah</p>
            </div>
            <button
              type="button"
              onClick={onPlayGuideNarration}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C8102E] text-white text-xs font-bold shadow-sm hover:bg-red-700 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan</span>
            </button>
          </div>

          <ol className="space-y-3.5 list-none">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-slate-900">Baca Stimulus dengan Cermat:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Setiap paket memuat bacaan autentik (informasi, puisi, cerpen, naskah drama). Gunakan tombol narator jika ingin mendengarkan pelafalan teksnya.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-slate-900">Pahami Format Tiga Bentuk Soal:</strong>
                <ul className="text-xs text-slate-600 mt-1 space-y-1 list-disc list-inside">
                  <li><strong>Pilihan Ganda:</strong> Tepat 1 opsi paling benar (A, B, C, D, E).</li>
                  <li><strong>PG Kompleks Multiple-Answer:</strong> Pilih 2 atau 3 opsi yang benar menggunakan kotak centang.</li>
                  <li><strong>PG Kompleks Kategori:</strong> Wajib menentukan penilaian BENAR atau SALAH pada seluruh 3 baris pernyataan.</li>
                </ul>
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-slate-900">Kirim Jawaban & Pelajari Pembahasan:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Setelah menekan tombol <strong>KIRIM JAWABAN</strong>, pembahasan bertahap dan strategi cepat Mister Jo akan langsung terbuka lengkap dengan penyorotan bukti teks.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                4
              </span>
              <div>
                <strong className="text-slate-900">Penyimpanan Otomatis:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Seluruh progres latihanmu tersimpan otomatis di peramban ini sehingga kamu bisa melanjutkan kapan saja.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

interface BenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayBenefitsNarration: () => void;
}

export const BenefitsModal: React.FC<BenefitsModalProps> = ({
  isOpen,
  onClose,
  onPlayBenefitsNarration,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Manfaat Belajar Bersama Mister Jo</h3>
              <p className="text-xs text-slate-500 font-medium">Bahasa Persatuan, Penalaran Juara!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Manfaat"
            className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-900 text-sm">Dengarkan Motivasi Mister Jo</span>
              <p className="text-xs text-slate-600">Simak pesan inspiratif meningkatkan daya bernalar</p>
            </div>
            <button
              type="button"
              onClick={onPlayBenefitsNarration}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-sm hover:bg-amber-700 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm text-[#C8102E]">
                1. Penalaran HOTS Berbasis Bukti
              </h4>
              <p className="text-xs text-slate-600">
                Terbiasa membedakan klaim kuat vs spekulasi liar dan menemukan bukti tekstual yang valid di setiap wacana.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm text-[#C8102E]">
                2. Teknik Eliminasi Distraktor Cepat
              </h4>
              <p className="text-xs text-slate-600">
                Menguasai strategi cepat membaca kata kunci dan menyingkirkan jawaban pengecoh tanpa kehilangan akurasi ilmiah.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm text-[#C8102E]">
                3. Estimasi Skor Skala Baku 200–800
              </h4>
              <p className="text-xs text-slate-600">
                Mengetahui parameter kemampuan theta dan skor IRT 2PL yang mencerminkan bobot tingkat kesulitan butir secara objektif.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm text-[#C8102E]">
                4. Apresiasi Wacana & Sastra Indonesia
              </h4>
              <p className="text-xs text-slate-600">
                Memperkaya wawasan mengenai tata ruang kota, ekologi, sastra absurd, metafora puisi, dan dinamika sosial masyarakat kita.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechSettings: SpeechSettings;
  onUpdateSpeechSettings: (settings: Partial<SpeechSettings>) => void;
  availableVoices: SpeechSynthesisVoice[];
  fontSize: FontSizeSetting;
  onFontSizeChange: (size: FontSizeSetting) => void;
  onOpenReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  speechSettings,
  onUpdateSpeechSettings,
  availableVoices,
  fontSize,
  onFontSizeChange,
  onOpenReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pengaturan Pembelajaran</h3>
              <p className="text-xs text-slate-500 font-medium">Suara narator, ukuran huruf & progres</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Pengaturan"
            className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-800 font-sans">
          {/* Font Size Setting */}
          <div className="space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Ukuran Font Bacaan & Soal
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onFontSizeChange('sm')}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                  fontSize === 'sm'
                    ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Kecil (A−)
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('md')}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                  fontSize === 'md'
                    ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Standar (A)
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange('lg')}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                  fontSize === 'lg'
                    ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Besar (A+)
              </button>
            </div>
          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label htmlFor="voice-select" className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Pilihan Suara Narator Bahasa Indonesia
            </label>
            <select
              id="voice-select"
              value={speechSettings.voiceIndex}
              onChange={(e) =>
                onUpdateSpeechSettings({ voiceIndex: Number(e.target.value) })
              }
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-800"
            >
              {availableVoices.length === 0 ? (
                <option value={0}>Suara Bahasa Indonesia Default</option>
              ) : (
                availableVoices.map((v, idx) => (
                  <option key={idx} value={idx}>
                    {v.name} ({v.lang})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Speech Rate Setting */}
          <div className="space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Kecepatan Berbicara Narator
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.75, 1.0, 1.25].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => onUpdateSpeechSettings({ rate })}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                    speechSettings.rate === rate
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {rate}x {rate === 1.0 && '(Normal)'}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Progress Shortcut */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-rose-700">
              Atur Ulang Latihan
            </label>
            <p className="text-xs text-slate-500">
              Hapus semua rekaman jawaban dan skor untuk memulai latihan dari awal.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenReset();
              }}
              className="w-full py-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Seluruh Progres Latihan</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-scaleUp">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">
            Konfirmasi Reset Progres
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Apakah kamu yakin ingin menghapus seluruh progres latihan? Jawaban, skor, dan riwayat latihan akan direset ke kondisi awal.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors"
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-[#C8102E] hover:bg-red-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors"
          >
            YA, RESET PROGRES
          </button>
        </div>
      </div>
    </div>
  );
};
