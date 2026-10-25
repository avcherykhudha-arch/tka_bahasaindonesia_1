/**
 * Master TKA Bahasa Indonesia 2026 - Data Types & Assessment Schema
 * Pusmendik Kemendikdasmen Framework
 */

export type QuestionType = 'PG' | 'PGK_MCMA' | 'PGK_KATEGORI';

export type MainCompetency =
  | 'Pemahaman Tekstual'
  | 'Pemahaman Inferensial'
  | 'Evaluasi dan Apresiasi';

export interface SubCompetencyInfo {
  number: number;
  competency: MainCompetency;
  title: string;
  description: string;
}

export const SUB_COMPETENCIES: Record<number, SubCompetencyInfo> = {
  1: {
    number: 1,
    competency: 'Pemahaman Tekstual',
    title: 'Kata Serapan Daerah/Asing',
    description: 'Mengidentifikasi penggunaan kata serapan dari bahasa daerah atau bahasa asing dalam berbagai bidang.',
  },
  2: {
    number: 2,
    competency: 'Pemahaman Tekstual',
    title: 'Latar, Karakter & Fenomena',
    description: 'Mengidentifikasi latar, karakter, dan/atau fenomena berdasarkan kosakata yang digunakan dalam teks fiksi atau nonfiksi.',
  },
  3: {
    number: 3,
    competency: 'Pemahaman Tekstual',
    title: 'Kerangka & Bagan Teks',
    description: 'Menyusun kerangka atau bagan berdasarkan bagian-bagian penting dalam teks.',
  },
  4: {
    number: 4,
    competency: 'Pemahaman Inferensial',
    title: 'Ide Pokok, Nilai & Peristiwa',
    description: 'Menyimpulkan ide pokok, gagasan pendukung, tokoh, peristiwa, latar, konflik, atau nilai-nilai dalam teks.',
  },
  5: {
    number: 5,
    competency: 'Pemahaman Inferensial',
    title: 'Hubungan Makna Antarbagian',
    description: 'Menjelaskan hubungan makna antarkalimat dan/atau antarparagraf dalam teks.',
  },
  6: {
    number: 6,
    competency: 'Pemahaman Inferensial',
    title: 'Prediksi Kelanjutan Teks',
    description: 'Memprediksi lanjutan atau akhir uraian atau cerita berdasarkan bagian tertentu dalam teks.',
  },
  7: {
    number: 7,
    competency: 'Evaluasi dan Apresiasi',
    title: 'Relevansi Kehidupan Nyata',
    description: 'Menilai relevansi peristiwa dalam teks dengan kehidupan sehari-hari.',
  },
  8: {
    number: 8,
    competency: 'Evaluasi dan Apresiasi',
    title: 'Keakuratan & Kecukupan Data',
    description: 'Menilai keakuratan, kesesuaian, kecukupan, atau ketepatan informasi dalam teks.',
  },
  9: {
    number: 9,
    competency: 'Evaluasi dan Apresiasi',
    title: 'Ketepatan Penggunaan Bahasa',
    description: 'Menilai ketepatan dan kesesuaian penggunaan bahasa dalam teks.',
  },
  10: {
    number: 10,
    competency: 'Evaluasi dan Apresiasi',
    title: 'Penggambaran Karakter & Latar',
    description: 'Menilai ketepatan bagian teks untuk menggambarkan karakter, peristiwa, atau latar dalam teks fiksi.',
  },
  11: {
    number: 11,
    competency: 'Evaluasi dan Apresiasi',
    title: 'Respons Emosional Sastra',
    description: 'Menyimpulkan respons emosional terhadap unsur puisi, prosa, dan drama.',
  },
};

export interface StimulusTab {
  label: string;
  subtitle?: string;
  content: string;
}

export interface StimulusVisual {
  type: 'chart' | 'table' | 'infographic';
  caption: string;
  headers?: string[];
  rows?: (string | number)[][];
  chartData?: { label: string; value: number; unit?: string }[];
}

export interface StimulusPackage {
  id: string; // e.g. 'stimulus-1'
  packetNumber: number; // 1 to 10
  title: string;
  genre: string;
  wordCount: number;
  authorOrSource: string;
  fullText: string;
  tabs?: StimulusTab[];
  visual?: StimulusVisual;
}

export interface OptionReview {
  key: string;
  label?: string;
  verdict: 'Tepat' | 'Salah';
  reasoning: string;
}

export interface NormalExplanation {
  skillTested: string;
  questionDemand: string;
  textualEvidence: string;
  evidenceAnalysis: string;
  optionsReview: OptionReview[];
  conclusion: string;
  keyTakeaway: string;
}

export interface FastStrategy {
  step1: string; // Fokus cermat lebih dulu
  step2: string; // Petunjuk utama keputusan
  step3: string; // Eliminasi opsi lemah
  step4: string; // Konfirmasi jawaban akhir
  summary: string;
}

export interface Narrations {
  intro: string;
  stimulusReading: string;
  questionAndOptions: string;
  strategyHint: string;
  normalExplanationAudio: string;
  fastStrategyAudio: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface QuestionOption {
  key: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
}

export interface CategoryStatement {
  key: string; // 'A', 'B', 'C'
  text: string;
}

export type UserAnswer =
  | string // for PG e.g. 'B'
  | string[] // for PGK_MCMA e.g. ['A', 'C']
  | Record<string, 'BENAR' | 'SALAH'>; // for PGK_KATEGORI e.g. { A: 'BENAR', B: 'SALAH', C: 'BENAR' }

export interface Question {
  id: string;
  number: number; // 1 to 30
  stimulusId: string;
  questionType: QuestionType;
  competency: MainCompetency;
  subcompetency: number; // 1 to 11
  subcompetencyName: string;
  indicator: string;
  difficulty: 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  paramA: number; // Daya pembeda 2PL (0.7 - 1.8)
  paramB: number; // Tingkat kesulitan 2PL (-2.4 - +2.4)
  prompt: string;
  options?: QuestionOption[]; // 5 for PG & PGK_MCMA
  statements?: CategoryStatement[]; // 3 for PGK_KATEGORI
  correctAnswer: UserAnswer;
  textualEvidence: {
    snippet: string;
    location: string;
    explanation: string;
  };
  normalExplanation: NormalExplanation;
  fastStrategy: FastStrategy;
  narrations: Narrations;
}

export interface ExamProgress {
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  submittedQuestions: Record<string, boolean>;
  isCompleted: boolean;
  scoreResult?: ExamResult;
  lastUpdated: number;
}

export interface CompetencyScore {
  name: MainCompetency;
  totalQuestions: number;
  correctQuestions: number;
  accuracy: number;
  status: 'Perlu Latihan' | 'Cukup' | 'Kuat' | 'Sangat Unggul';
}

export interface ExamResult {
  theta: number;
  scaledScore: number; // 200 - 800
  correctCount: number;
  totalQuestions: number;
  accuracyPercentage: number;
  competencyScores: CompetencyScore[];
  strongestSkills: string[];
  skillsToImprove: string[];
  recommendations: string[];
  teacherSummary: string;
}
