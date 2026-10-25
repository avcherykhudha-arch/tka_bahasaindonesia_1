/**
 * Local Storage Persistence Manager
 * Master TKA Bahasa Indonesia 2026
 */

import { ExamProgress, UserAnswer } from '../types/assessment';

const STORAGE_KEY_PROGRESS = 'master_tka_2026_progress_v1';
const STORAGE_KEY_PREFS = 'master_tka_2026_prefs_v1';

export type FontSizeSetting = 'sm' | 'md' | 'lg';

export interface UserPreferences {
  fontSize: FontSizeSetting;
  speechRate: number;
  volume: number;
  voiceIndex: number;
  autoSpeak: boolean;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  fontSize: 'md',
  speechRate: 1.0,
  volume: 1.0,
  voiceIndex: 0,
  autoSpeak: false,
};

export function getDefaultProgress(): ExamProgress {
  return {
    currentQuestionIndex: 0,
    answers: {},
    submittedQuestions: {},
    isCompleted: false,
    lastUpdated: Date.now(),
  };
}

export function saveExamProgress(progress: ExamProgress): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(
        STORAGE_KEY_PROGRESS,
        JSON.stringify({
          ...progress,
          lastUpdated: Date.now(),
        })
      );
    }
  } catch (e) {
    console.warn('Failed to save progress to localStorage:', e);
  }
}

export function loadExamProgress(): ExamProgress {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          currentQuestionIndex: parsed.currentQuestionIndex ?? 0,
          answers: parsed.answers ?? {},
          submittedQuestions: parsed.submittedQuestions ?? {},
          isCompleted: parsed.isCompleted ?? false,
          scoreResult: parsed.scoreResult,
          lastUpdated: parsed.lastUpdated ?? Date.now(),
        };
      }
    }
  } catch (e) {
    console.warn('Failed to load progress from localStorage:', e);
  }
  return getDefaultProgress();
}

export function clearExamProgress(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY_PROGRESS);
    }
  } catch (e) {
    console.warn('Failed to clear progress in localStorage:', e);
  }
}

export function savePreferences(prefs: Partial<UserPreferences>): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const current = loadPreferences();
      const updated = { ...current, ...prefs };
      window.localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('Failed to save preferences to localStorage:', e);
  }
}

export function loadPreferences(): UserPreferences {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(STORAGE_KEY_PREFS);
      if (data) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(data) };
      }
    }
  } catch (e) {
    console.warn('Failed to load preferences from localStorage:', e);
  }
  return { ...DEFAULT_PREFERENCES };
}
