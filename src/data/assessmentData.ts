/**
 * Assessment Data Aggregator & Lookup
 * Master TKA Bahasa Indonesia 2026
 */

import { STIMULI } from './stimuli';
import { QUESTIONS_BATCH_1 } from './questionsBatch1';
import { QUESTIONS_BATCH_2 } from './questionsBatch2';
import { QUESTIONS_BATCH_3 } from './questionsBatch3';
import { Question, StimulusPackage } from '../types/assessment';

export const ALL_STIMULI: StimulusPackage[] = STIMULI;

export const ALL_QUESTIONS: Question[] = [
  ...QUESTIONS_BATCH_1,
  ...QUESTIONS_BATCH_2,
  ...QUESTIONS_BATCH_3,
];

export const STIMULUS_MAP: Record<string, StimulusPackage> = ALL_STIMULI.reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<string, StimulusPackage>
);

export const QUESTION_MAP: Record<string, Question> = ALL_QUESTIONS.reduce(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {} as Record<string, Question>
);

export function getStimulusById(id: string): StimulusPackage | undefined {
  return STIMULUS_MAP[id];
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_MAP[id];
}

export function getQuestionsByStimulusId(stimulusId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.stimulusId === stimulusId);
}
