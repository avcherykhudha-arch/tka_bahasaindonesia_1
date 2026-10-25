/**
 * IRT 2PL (Two-Parameter Logistic) Scoring Engine & Diagnostic Evaluator
 * Master TKA Bahasa Indonesia 2026
 */

import {
  Question,
  UserAnswer,
  ExamResult,
  CompetencyScore,
  MainCompetency,
} from '../types/assessment';

/**
 * Checks if user answer is fully correct (dichotomous 0/1 at question level)
 */
export function isQuestionAnswerCorrect(
  question: Question,
  userAnswer?: UserAnswer
): boolean {
  if (!userAnswer) return false;

  if (question.questionType === 'PG') {
    return (
      typeof userAnswer === 'string' &&
      userAnswer.trim().toUpperCase() ===
        (question.correctAnswer as string).trim().toUpperCase()
    );
  }

  if (question.questionType === 'PGK_MCMA') {
    if (!Array.isArray(userAnswer)) return false;
    const correctArr = question.correctAnswer as string[];
    if (userAnswer.length !== correctArr.length) return false;
    const sortedUser = [...userAnswer].map((k) => k.toUpperCase()).sort();
    const sortedCorrect = [...correctArr].map((k) => k.toUpperCase()).sort();
    return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
  }

  if (question.questionType === 'PGK_KATEGORI') {
    if (typeof userAnswer !== 'object' || Array.isArray(userAnswer)) return false;
    const correctMap = question.correctAnswer as Record<string, 'BENAR' | 'SALAH'>;
    const userMap = userAnswer as Record<string, 'BENAR' | 'SALAH'>;
    const keys = Object.keys(correctMap);
    return keys.every((key) => userMap[key] === correctMap[key]);
  }

  return false;
}

/**
 * Logistic 2PL Probability: P(theta) = 1 / (1 + exp(-a * (theta - b)))
 */
export function calculate2PLProbability(
  theta: number,
  a: number,
  b: number
): number {
  const z = a * (theta - b);
  // Guard against overflow
  if (z > 35) return 1.0;
  if (z < -35) return 0.0;
  return 1 / (1 + Math.exp(-z));
}

/**
 * Maximum A Posteriori (MAP) estimation of theta with standard normal prior N(0, 1)
 * Using Newton-Raphson optimization
 */
export function estimateThetaMAP(
  items: { a: number; b: number; correct: boolean }[]
): number {
  let theta = 0.0; // Start at prior mean 0
  const maxIterations = 25;
  const tolerance = 1e-5;

  for (let iter = 0; iter < maxIterations; iter++) {
    // f'(theta) = -theta + sum a_i * (u_i - P_i)
    // f''(theta) = -1 - sum a_i^2 * P_i * (1 - P_i)
    let firstDerivative = -theta;
    let secondDerivative = -1.0;

    for (const item of items) {
      const p = calculate2PLProbability(theta, item.a, item.b);
      const u = item.correct ? 1 : 0;
      firstDerivative += item.a * (u - p);
      secondDerivative -= item.a * item.a * p * (1 - p);
    }

    if (Math.abs(secondDerivative) < 1e-9) {
      break;
    }

    const step = firstDerivative / secondDerivative;
    theta = theta - step;

    // Constrain theta to realistic bounds [-3.0, 3.0]
    if (theta > 3.0) theta = 3.0;
    if (theta < -3.0) theta = -3.0;

    if (Math.abs(step) < tolerance) {
      break;
    }
  }

  return Math.max(-3.0, Math.min(3.0, theta));
}

/**
 * Converts ability theta [-3.0, +3.0] to scaled score [200, 800]
 */
export function convertThetaToScaledScore(theta: number): number {
  const boundedTheta = Math.max(-3.0, Math.min(3.0, theta));
  // Skor = round(200 + 600 * (theta + 3) / 6)
  const rawScore = 200 + (600 * (boundedTheta + 3.0)) / 6.0;
  const rounded = Math.round(rawScore);
  return Math.max(200, Math.min(800, rounded));
}

/**
 * Evaluates full exam result with diagnostics
 */
export function evaluateExam(
  questions: Question[],
  userAnswers: Record<string, UserAnswer>
): ExamResult {
  const itemResponses: { a: number; b: number; correct: boolean }[] = [];
  let correctCount = 0;

  const competencyMap: Record<
    MainCompetency,
    { total: number; correct: number }
  > = {
    'Pemahaman Tekstual': { total: 0, correct: 0 },
    'Pemahaman Inferensial': { total: 0, correct: 0 },
    'Evaluasi dan Apresiasi': { total: 0, correct: 0 },
  };

  const subcompetencyCorrect: Record<number, { total: number; correct: number; title: string }> = {};

  for (const q of questions) {
    const isCorrect = isQuestionAnswerCorrect(q, userAnswers[q.id]);
    if (isCorrect) correctCount++;

    itemResponses.push({
      a: q.paramA,
      b: q.paramB,
      correct: isCorrect,
    });

    if (!competencyMap[q.competency]) {
      competencyMap[q.competency] = { total: 0, correct: 0 };
    }
    competencyMap[q.competency].total += 1;
    if (isCorrect) competencyMap[q.competency].correct += 1;

    if (!subcompetencyCorrect[q.subcompetency]) {
      subcompetencyCorrect[q.subcompetency] = {
        total: 0,
        correct: 0,
        title: q.subcompetencyName,
      };
    }
    subcompetencyCorrect[q.subcompetency].total += 1;
    if (isCorrect) subcompetencyCorrect[q.subcompetency].correct += 1;
  }

  const theta = estimateThetaMAP(itemResponses);
  const scaledScore = convertThetaToScaledScore(theta);
  const accuracyPercentage = Math.round((correctCount / questions.length) * 100);

  const competencyScores: CompetencyScore[] = (
    Object.keys(competencyMap) as MainCompetency[]
  ).map((compName) => {
    const data = competencyMap[compName];
    const acc = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    let status: 'Perlu Latihan' | 'Cukup' | 'Kuat' | 'Sangat Unggul' = 'Perlu Latihan';
    if (acc >= 85) status = 'Sangat Unggul';
    else if (acc >= 70) status = 'Kuat';
    else if (acc >= 50) status = 'Cukup';

    return {
      name: compName,
      totalQuestions: data.total,
      correctQuestions: data.correct,
      accuracy: acc,
      status,
    };
  });

  // Identify strengths & weaknesses
  const subEntries = Object.entries(subcompetencyCorrect).map(([num, val]) => ({
    subNumber: Number(num),
    title: val.title,
    accuracy: val.total > 0 ? val.correct / val.total : 0,
    total: val.total,
    correct: val.correct,
  }));

  const strongestSkills = subEntries
    .filter((s) => s.accuracy >= 0.7)
    .sort((a, b) => b.accuracy - a.accuracy)
    .map((s) => `${s.title} (${Math.round(s.accuracy * 100)}% benar)`);

  const skillsToImprove = subEntries
    .filter((s) => s.accuracy < 0.7)
    .sort((a, b) => a.accuracy - b.accuracy)
    .map((s) => `${s.title} (${Math.round(s.accuracy * 100)}% benar)`);

  const recommendations: string[] = [];
  if (competencyMap['Pemahaman Tekstual'].correct < competencyMap['Pemahaman Tekstual'].total * 0.7) {
    recommendations.push(
      'Tingkatkan ketelitian menyisir kata serapan teknis dan penataan bagan/kerangka teks.'
    );
  }
  if (competencyMap['Pemahaman Inferensial'].correct < competencyMap['Pemahaman Inferensial'].total * 0.7) {
    recommendations.push(
      'Latih penalaran sintesis lintas paragraf untuk menarik inferensi yang didukung bukti penuh tanpa melompat ke asumsi pribadi.'
    );
  }
  if (competencyMap['Evaluasi dan Apresiasi'].correct < competencyMap['Evaluasi dan Apresiasi'].total * 0.7) {
    recommendations.push(
      'Asah kepekaan membedakan kesimpulan valid vs generalisasi berlebihan serta evaluasi ketepatan diksi dalam membangun atmosfer sastra.'
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'Pertahankan ketajaman analisis! Terus asah pembacaan teks fiksi filosofis dan teks komparatif jamak dengan tempo pengerjaan yang stabil.'
    );
  }

  let teacherSummary = '';
  if (scaledScore >= 700) {
    teacherSummary = `Luar biasa! Skor estimasi TKA kamu mencapai ${scaledScore} (Peringkat Juara). Kamu menunjukkan penalaran kritis tingkat tinggi, mampu mengintegrasikan bukti teks lintas wacana dengan sangat akurat. Tetap rendah hati dan pertahankan disiplin literasi membaca!`;
  } else if (scaledScore >= 550) {
    teacherSummary = `Bagus sekali! Skor estimasi TKA kamu berada di angka ${scaledScore}. Fondasi pemahaman tekstual dan inferensimu sudah solid. Fokuskan latihan berikutnya pada butir evaluasi kritis dan pembuktian distractor yang menjebak.`;
  } else {
    teacherSummary = `Perjalanan belajar baru dimulai! Skor estimasi kamu saat ini ${scaledScore}. Jangan berkecil hati, karena soal-soal ini dirancang berbobot HOTS tinggi. Pelajari pembahasan normal dan strategi cepat bersama Mister Jo di setiap butir untuk menguasai metode eliminasinya!`;
  }

  return {
    theta,
    scaledScore,
    correctCount,
    totalQuestions: questions.length,
    accuracyPercentage,
    competencyScores,
    strongestSkills: strongestSkills.length > 0 ? strongestSkills : ['Fondasi awal pemahaman dasar'],
    skillsToImprove: skillsToImprove.length > 0 ? skillsToImprove : ['Pertahankan konsistensi di seluruh indikator'],
    recommendations,
    teacherSummary,
  };
}
