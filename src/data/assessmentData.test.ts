import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_STIMULI, ALL_QUESTIONS, STIMULUS_MAP } from './assessmentData';

test('1. Total number of questions is exactly 30', () => {
  assert.equal(ALL_QUESTIONS.length, 30);
});

test('2. Total number of stimuli packages is exactly 10', () => {
  assert.equal(ALL_STIMULI.length, 10);
});

test('3. Question type composition: 10 PG, 10 PGK-MCMA, 10 PGK-Kategori', () => {
  const pgCount = ALL_QUESTIONS.filter((q) => q.questionType === 'PG').length;
  const mcmaCount = ALL_QUESTIONS.filter((q) => q.questionType === 'PGK_MCMA').length;
  const kategoriCount = ALL_QUESTIONS.filter((q) => q.questionType === 'PGK_KATEGORI').length;

  assert.equal(pgCount, 10);
  assert.equal(mcmaCount, 10);
  assert.equal(kategoriCount, 10);
});

test('4. All 11 subcompetencies are covered', () => {
  const covered = new Set(ALL_QUESTIONS.map((q) => q.subcompetency));
  for (let i = 1; i <= 11; i++) {
    assert.equal(
      covered.has(i),
      true,
      `Subcompetency ${i} must be tested in at least one question!`
    );
  }
});

test('5. Competency composition conforms to blueprint (8 Tekstual, 10 Inferensial, 12 Evaluasi)', () => {
  const tekstual = ALL_QUESTIONS.filter((q) => q.competency === 'Pemahaman Tekstual').length;
  const inferensial = ALL_QUESTIONS.filter((q) => q.competency === 'Pemahaman Inferensial').length;
  const evaluasi = ALL_QUESTIONS.filter((q) => q.competency === 'Evaluasi dan Apresiasi').length;

  assert.equal(tekstual, 8, `Expected 8 Pemahaman Tekstual questions, got ${tekstual}`);
  assert.equal(inferensial, 10, `Expected 10 Pemahaman Inferensial questions, got ${inferensial}`);
  assert.equal(evaluasi, 12, `Expected 12 Evaluasi dan Apresiasi questions, got ${evaluasi}`);
});

test('6. All question IDs and stimulus IDs are unique and stable', () => {
  const qIds = new Set(ALL_QUESTIONS.map((q) => q.id));
  assert.equal(qIds.size, 30);

  const sIds = new Set(ALL_STIMULI.map((s) => s.id));
  assert.equal(sIds.size, 10);
});

test('7. Every question has a valid stimulus reference in STIMULUS_MAP', () => {
  for (const q of ALL_QUESTIONS) {
    const stimulus = STIMULUS_MAP[q.stimulusId];
    assert.notEqual(
      stimulus,
      undefined,
      `Question ${q.id} points to non-existent stimulus ${q.stimulusId}`
    );
    assert.equal(
      stimulus.title.length > 5,
      true,
      `Stimulus for question ${q.id} must have a valid title`
    );
  }
});

test('8. Options integrity: PG has 5 options, MCMA has 5 options, Kategori has 3 statements', () => {
  for (const q of ALL_QUESTIONS) {
    if (q.questionType === 'PG') {
      assert.equal(q.options?.length, 5, `Question ${q.id} (PG) must have exactly 5 options`);
      assert.equal(typeof q.correctAnswer, 'string');
      assert.equal(['A', 'B', 'C', 'D', 'E'].includes(q.correctAnswer as string), true);
    } else if (q.questionType === 'PGK_MCMA') {
      assert.equal(q.options?.length, 5, `Question ${q.id} (PGK_MCMA) must have exactly 5 options`);
      assert.equal(Array.isArray(q.correctAnswer), true);
      const arr = q.correctAnswer as string[];
      assert.equal(arr.length >= 2 && arr.length <= 3, true);
    } else if (q.questionType === 'PGK_KATEGORI') {
      assert.equal(q.statements?.length, 3, `Question ${q.id} (PGK_KATEGORI) must have exactly 3 statements`);
      assert.equal(typeof q.correctAnswer, 'object');
      const keys = Object.keys(q.correctAnswer as object);
      assert.equal(keys.length, 3);
      for (const k of ['A', 'B', 'C']) {
        const val = (q.correctAnswer as Record<string, string>)[k];
        assert.equal(['BENAR', 'SALAH'].includes(val), true);
      }
    }
  }
});

test('9. Quality check: Normal explanations, fast strategies, and 7 narrations exist on all 30 questions', () => {
  for (const q of ALL_QUESTIONS) {
    // Normal explanation
    assert.equal(q.normalExplanation.skillTested.length > 0, true);
    assert.equal(q.normalExplanation.questionDemand.length > 0, true);
    assert.equal(q.normalExplanation.textualEvidence.length > 0, true);
    assert.equal(q.normalExplanation.evidenceAnalysis.length > 0, true);
    assert.equal(q.normalExplanation.optionsReview.length >= 3, true);
    assert.equal(q.normalExplanation.conclusion.length > 0, true);
    assert.equal(q.normalExplanation.keyTakeaway.length > 0, true);

    // Fast strategy
    assert.equal(q.fastStrategy.step1.length > 0, true);
    assert.equal(q.fastStrategy.step2.length > 0, true);
    assert.equal(q.fastStrategy.step3.length > 0, true);
    assert.equal(q.fastStrategy.step4.length > 0, true);
    assert.equal(q.fastStrategy.summary.length > 0, true);

    // 7 Narrations
    assert.equal(q.narrations.intro.length > 0, true);
    assert.equal(q.narrations.stimulusReading.length > 0, true);
    assert.equal(q.narrations.questionAndOptions.length > 0, true);
    assert.equal(q.narrations.strategyHint.length > 0, true);
    assert.equal(q.narrations.normalExplanationAudio.length > 0, true);
    assert.equal(q.narrations.fastStrategyAudio.length > 0, true);
    assert.equal(q.narrations.feedbackCorrect.length > 0, true);
    assert.equal(q.narrations.feedbackIncorrect.length > 0, true);
  }
});

test('10. 2PL parameters are within specified boundaries (a: 0.7 - 1.8, b: -2.4 - 2.4)', () => {
  for (const q of ALL_QUESTIONS) {
    assert.equal(q.paramA >= 0.7 && q.paramA <= 1.8, true, `q${q.number} paramA out of range: ${q.paramA}`);
    assert.equal(q.paramB >= -2.4 && q.paramB <= 2.4, true, `q${q.number} paramB out of range: ${q.paramB}`);
  }
});
