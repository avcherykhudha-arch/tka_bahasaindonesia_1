import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isQuestionAnswerCorrect,
  calculate2PLProbability,
  estimateThetaMAP,
  convertThetaToScaledScore,
  evaluateExam,
} from './irtScoring';
import { Question } from '../types/assessment';

test('2PL Probability calculates properly within limits', () => {
  const pCenter = calculate2PLProbability(0, 1.0, 0);
  assert.equal(Math.abs(pCenter - 0.5) < 1e-4, true);

  const pHigh = calculate2PLProbability(2.0, 1.2, 0.5);
  assert.equal(pHigh > 0.8, true);

  const pLow = calculate2PLProbability(-2.0, 1.2, 0.5);
  assert.equal(pLow < 0.1, true);
});

test('Grading functions handle PG, PGK_MCMA, and PGK_KATEGORI', () => {
  const dummyPG: Question = {
    id: 'q1',
    number: 1,
    stimulusId: 's1',
    questionType: 'PG',
    competency: 'Pemahaman Tekstual',
    subcompetency: 1,
    subcompetencyName: 'Kata Serapan',
    indicator: 'Indikator',
    difficulty: 'Sedang',
    paramA: 1.2,
    paramB: 0.1,
    prompt: 'Soal?',
    options: [
      { key: 'A', text: 'Opt A' },
      { key: 'B', text: 'Opt B' },
      { key: 'C', text: 'Opt C' },
      { key: 'D', text: 'Opt D' },
      { key: 'E', text: 'Opt E' },
    ],
    correctAnswer: 'B',
    textualEvidence: { snippet: 'snip', location: 'loc', explanation: 'exp' },
    normalExplanation: {
      skillTested: 'skill',
      questionDemand: 'demand',
      textualEvidence: 'ev',
      evidenceAnalysis: 'ana',
      optionsReview: [],
      conclusion: 'conc',
      keyTakeaway: 'take',
    },
    fastStrategy: {
      step1: '1',
      step2: '2',
      step3: '3',
      step4: '4',
      summary: 'sum',
    },
    narrations: {
      intro: '',
      stimulusReading: '',
      questionAndOptions: '',
      strategyHint: '',
      normalExplanationAudio: '',
      fastStrategyAudio: '',
      feedbackCorrect: '',
      feedbackIncorrect: '',
    },
  };

  assert.equal(isQuestionAnswerCorrect(dummyPG, 'B'), true);
  assert.equal(isQuestionAnswerCorrect(dummyPG, 'b'), true);
  assert.equal(isQuestionAnswerCorrect(dummyPG, 'A'), false);

  const dummyMCMA: Question = {
    ...dummyPG,
    questionType: 'PGK_MCMA',
    correctAnswer: ['A', 'C', 'E'],
  };
  assert.equal(isQuestionAnswerCorrect(dummyMCMA, ['C', 'A', 'E']), true);
  assert.equal(isQuestionAnswerCorrect(dummyMCMA, ['A', 'C']), false);
  assert.equal(isQuestionAnswerCorrect(dummyMCMA, ['A', 'C', 'D']), false);

  const dummyKategori: Question = {
    ...dummyPG,
    questionType: 'PGK_KATEGORI',
    correctAnswer: { A: 'BENAR', B: 'SALAH', C: 'BENAR' },
  };
  assert.equal(
    isQuestionAnswerCorrect(dummyKategori, {
      A: 'BENAR',
      B: 'SALAH',
      C: 'BENAR',
    }),
    true
  );
  assert.equal(
    isQuestionAnswerCorrect(dummyKategori, {
      A: 'BENAR',
      B: 'BENAR',
      C: 'BENAR',
    }),
    false
  );
});

test('IRT scaled score conforms to [200, 800] boundaries', () => {
  const minScore = convertThetaToScaledScore(-3.0);
  assert.equal(minScore, 200);

  const maxScore = convertThetaToScaledScore(3.0);
  assert.equal(maxScore, 800);

  const midScore = convertThetaToScaledScore(0.0);
  assert.equal(midScore, 500);

  // Beyond boundary checks
  assert.equal(convertThetaToScaledScore(-5.0), 200);
  assert.equal(convertThetaToScaledScore(5.0), 800);
});

test('MAP estimation increases monotonically with higher scores', () => {
  const allWrong = Array.from({ length: 30 }, () => ({
    a: 1.0,
    b: 0.0,
    correct: false,
  }));
  const halfRight = Array.from({ length: 30 }, (_, i) => ({
    a: 1.0,
    b: 0.0,
    correct: i % 2 === 0,
  }));
  const allRight = Array.from({ length: 30 }, () => ({
    a: 1.0,
    b: 0.0,
    correct: true,
  }));

  const thetaLow = estimateThetaMAP(allWrong);
  const thetaMid = estimateThetaMAP(halfRight);
  const thetaHigh = estimateThetaMAP(allRight);

  assert.equal(thetaLow < thetaMid, true);
  assert.equal(thetaMid < thetaHigh, true);
});
