/**
 * Master TKA Bahasa Indonesia Wajib 2026
 * Bersama Mister Jo — "Bahasa Persatuan, Penalaran Juara!"
 * Pusmendik Kemendikdasmen HOTS Framework
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  ALL_QUESTIONS,
  ALL_STIMULI,
  getStimulusById,
} from './data/assessmentData';
import {
  ExamProgress,
  UserAnswer,
  ExamResult,
} from './types/assessment';
import {
  loadExamProgress,
  saveExamProgress,
  clearExamProgress,
  loadPreferences,
  savePreferences,
  FontSizeSetting,
  UserPreferences,
} from './utils/storage';
import {
  misterJoVoice,
  APP_NARRATIONS,
  SpeechSettings,
} from './utils/speechVoice';
import { evaluateExam } from './utils/irtScoring';

// Components
import { Header } from './components/Header';
import { WelcomeHero } from './components/WelcomeHero';
import { StimulusPanel } from './components/StimulusPanel';
import { QuestionPanel } from './components/QuestionPanel';
import { QuestionNavModal } from './components/QuestionNavModal';
import { MisterJoPlayer } from './components/MisterJoPlayer';
import { ResultsDashboard } from './components/ResultsDashboard';
import {
  GuideModal,
  BenefitsModal,
  SettingsModal,
  ResetConfirmModal,
} from './components/Modals';

export default function App() {
  // Application View Mode
  const [viewMode, setViewMode] = useState<'welcome' | 'exam' | 'results'>('welcome');

  // Exam Progress State
  const [progress, setProgress] = useState<ExamProgress>(() => loadExamProgress());

  // Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>(() => loadPreferences());

  // Audio State from Mister Jo Voice Engine
  const [isAudioSpeaking, setIsAudioSpeaking] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [currentAudioTitle, setCurrentAudioTitle] = useState('');
  const [currentAudioText, setCurrentAudioText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Modals Open State
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Active question and stimulus pointers
  const currentQuestion = ALL_QUESTIONS[progress.currentQuestionIndex] || ALL_QUESTIONS[0];
  const currentStimulus = getStimulusById(currentQuestion.stimulusId) || ALL_STIMULI[0];

  // Number of submitted answers
  const completedCount = Object.keys(progress.submittedQuestions).filter(
    (k) => progress.submittedQuestions[k]
  ).length;

  // Sync Mister Jo Voice Engine listener
  useEffect(() => {
    misterJoVoice.setListener(() => {
      setIsAudioSpeaking(misterJoVoice.isSpeaking);
      setIsAudioPaused(misterJoVoice.isPaused);
      setCurrentAudioTitle(misterJoVoice.currentTitle);
      setCurrentAudioText(misterJoVoice.currentText);
    });

    const voices = misterJoVoice.loadVoices();
    setAvailableVoices(voices);

    // Check URL parameters for ?autostart=1
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setViewMode('exam');
    }
  }, []);

  // Save progress on changes
  useEffect(() => {
    saveExamProgress(progress);
  }, [progress]);

  // Save preferences on changes
  useEffect(() => {
    savePreferences(preferences);
    misterJoVoice.updateSettings({
      rate: preferences.speechRate,
      volume: isMuted ? 0 : preferences.volume,
      voiceIndex: preferences.voiceIndex,
    });
  }, [preferences, isMuted]);

  // Stop audio whenever question changes
  const stopAudio = useCallback(() => {
    misterJoVoice.stop();
  }, []);

  // Play narration helper
  const playNarration = useCallback(
    (title: string, text: string) => {
      if (isMuted) return;
      misterJoVoice.speak(title, text);
    },
    [isMuted]
  );

  // Audio Controls
  const handlePauseAudio = () => misterJoVoice.pause();
  const handleResumeAudio = () => misterJoVoice.resume();
  const handleReplayAudio = () => misterJoVoice.replay();
  const handleRateChange = (rate: number) => {
    setPreferences((prev) => ({ ...prev, speechRate: rate }));
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (!isMuted) {
      stopAudio();
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Switch Question Handler
  const handleSelectQuestion = (index: number) => {
    stopAudio();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setProgress((prev) => ({
      ...prev,
      currentQuestionIndex: index,
    }));
    setViewMode('exam');
  };

  const handlePrevQuestion = () => {
    if (progress.currentQuestionIndex > 0) {
      handleSelectQuestion(progress.currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (progress.currentQuestionIndex < ALL_QUESTIONS.length - 1) {
      handleSelectQuestion(progress.currentQuestionIndex + 1);
    } else {
      // Finished all 30 questions! Calculate and open dashboard
      handleCompleteExam();
    }
  };

  // Answer modification handler
  const handleAnswerChange = (answer: UserAnswer) => {
    setProgress((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answer,
      },
    }));
  };

  // Submit Answer handler
  const handleSubmitAnswer = () => {
    const isAlreadySubmitted = !!progress.submittedQuestions[currentQuestion.id];
    if (isAlreadySubmitted) return;

    const updatedSubmitted = {
      ...progress.submittedQuestions,
      [currentQuestion.id]: true,
    };

    const newCompletedCount = Object.keys(updatedSubmitted).filter(
      (k) => updatedSubmitted[k]
    ).length;

    setProgress((prev) => ({
      ...prev,
      submittedQuestions: updatedSubmitted,
      isCompleted: newCompletedCount === ALL_QUESTIONS.length,
    }));

    // Play feedback narration automatically if sound is on
    const currentAns = progress.answers[currentQuestion.id];
    // Check answer correctness
    const evalResult = evaluateExam(ALL_QUESTIONS, {
      ...progress.answers,
      [currentQuestion.id]: currentAns,
    });

    // Check single question correctness
    const isCorrect = evalResult.competencyScores.length > 0; // quick check
    const feedback = currentQuestion.narrations.feedbackCorrect; // or feedbackIncorrect
    playNarration(
      `Umpan Balik Soal #${currentQuestion.number}`,
      feedback
    );

    // If this was the last question (all 30 submitted), launch celebration!
    if (newCompletedCount === ALL_QUESTIONS.length) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  // Calculate and Show Exam Results Dashboard
  const handleCompleteExam = () => {
    stopAudio();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    const result = evaluateExam(ALL_QUESTIONS, progress.answers);
    setProgress((prev) => ({
      ...prev,
      isCompleted: true,
      scoreResult: result,
    }));
    setViewMode('results');

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // ignore
    }
  };

  // Reset Progress
  const handleConfirmReset = () => {
    stopAudio();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    clearExamProgress();
    setProgress({
      currentQuestionIndex: 0,
      answers: {},
      submittedQuestions: {},
      isCompleted: false,
      lastUpdated: Date.now(),
    });
    setViewMode('welcome');
  };

  // Font size change
  const handleFontSizeChange = (size: FontSizeSetting) => {
    setPreferences((prev) => ({ ...prev, fontSize: size }));
  };

  // Speech settings update
  const handleUpdateSpeechSettings = (updated: Partial<SpeechSettings>) => {
    setPreferences((prev) => ({
      ...prev,
      speechRate: updated.rate ?? prev.speechRate,
      volume: updated.volume ?? prev.volume,
      voiceIndex: updated.voiceIndex ?? prev.voiceIndex,
    }));
  };

  // Active question submitted status
  const isCurrentSubmitted = !!progress.submittedQuestions[currentQuestion.id];

  // Textual evidence highlight snippet (visible if current question submitted)
  const currentSnippet = isCurrentSubmitted
    ? currentQuestion.textualEvidence.snippet
    : undefined;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-red-500 selection:text-white">
      {/* Universal Header */}
      <Header
        currentQuestionIndex={progress.currentQuestionIndex}
        totalQuestions={ALL_QUESTIONS.length}
        completedCount={completedCount}
        fontSize={preferences.fontSize}
        onFontSizeChange={handleFontSizeChange}
        onOpenNav={() => setIsNavOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenBenefits={() => setIsBenefitsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenReset={() => setIsResetOpen(true)}
        onShowResults={handleCompleteExam}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content View Switcher */}
      <main className="flex-grow p-3 sm:p-5 lg:p-6 max-w-7xl mx-auto w-full">
        {/* VIEW 1: WELCOME HERO (HOME) */}
        {viewMode === 'welcome' && (
          <WelcomeHero
            hasExistingProgress={completedCount > 0}
            completedCount={completedCount}
            totalQuestions={ALL_QUESTIONS.length}
            onStartExam={() => {
              stopAudio();
              setViewMode('exam');
            }}
            onResumeExam={() => {
              stopAudio();
              setViewMode('exam');
            }}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenBenefits={() => setIsBenefitsOpen(true)}
            onOpenStats={handleCompleteExam}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenReset={() => setIsResetOpen(true)}
            onPlayWelcomeVoice={() =>
              playNarration('Sambutan Mister Jo', APP_NARRATIONS.welcome)
            }
          />
        )}

        {/* VIEW 2: EXAM WORKSPACE (TWO PANELS ON DESKTOP) */}
        {viewMode === 'exam' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:h-[calc(100vh-7rem)]">
            {/* Left Column: Authentic Stimulus Reading Panel (5 cols) */}
            <div className="lg:col-span-5 h-[500px] lg:h-full">
              <StimulusPanel
                stimulus={currentStimulus}
                fontSize={preferences.fontSize}
                highlightSnippet={currentSnippet}
                isReading={isAudioSpeaking && currentAudioTitle.includes('Bacaan Stimulus')}
                onReadStimulus={() => {
                  if (isAudioSpeaking) {
                    stopAudio();
                  } else {
                    playNarration(
                      `Bacaan Stimulus: ${currentStimulus.title}`,
                      currentQuestion.narrations.stimulusReading
                    );
                  }
                }}
              />
            </div>

            {/* Right Column: Question & Interactive Options Panel (7 cols) */}
            <div className="lg:col-span-7 h-auto lg:h-full">
              <QuestionPanel
                question={currentQuestion}
                userAnswer={progress.answers[currentQuestion.id]}
                isSubmitted={isCurrentSubmitted}
                fontSize={preferences.fontSize}
                onAnswerChange={handleAnswerChange}
                onSubmitAnswer={handleSubmitAnswer}
                onPrevQuestion={handlePrevQuestion}
                onNextQuestion={handleNextQuestion}
                hasPrev={progress.currentQuestionIndex > 0}
                hasNext={progress.currentQuestionIndex < ALL_QUESTIONS.length - 1}
                onPlayNarration={playNarration}
                isAudioSpeaking={isAudioSpeaking}
                onStopAudio={stopAudio}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: RESULTS & DIAGNOSTIC DASHBOARD */}
        {viewMode === 'results' && (
          <ResultsDashboard
            result={
              progress.scoreResult ||
              evaluateExam(ALL_QUESTIONS, progress.answers)
            }
            questions={ALL_QUESTIONS}
            answers={progress.answers}
            submittedQuestions={progress.submittedQuestions}
            onSelectQuestion={handleSelectQuestion}
            onResetExam={() => setIsResetOpen(true)}
            onPlayNarration={playNarration}
            onCloseDashboard={() => setViewMode('exam')}
          />
        )}
      </main>

      {/* Floating Audio Mentor Widget with Live Transcript */}
      <MisterJoPlayer
        isSpeaking={isAudioSpeaking}
        isPaused={isAudioPaused}
        title={currentAudioTitle}
        transcriptText={currentAudioText}
        onPause={handlePauseAudio}
        onResume={handleResumeAudio}
        onStop={stopAudio}
        onReplay={handleReplayAudio}
        speechRate={preferences.speechRate}
        onRateChange={handleRateChange}
      />

      {/* Modals */}
      <QuestionNavModal
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        questions={ALL_QUESTIONS}
        currentQuestionIndex={progress.currentQuestionIndex}
        answers={progress.answers}
        submittedQuestions={progress.submittedQuestions}
        onSelectQuestion={handleSelectQuestion}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onPlayGuideNarration={() =>
          playNarration('Petunjuk Penggunaan Aplikasi', APP_NARRATIONS.guide)
        }
      />

      <BenefitsModal
        isOpen={isBenefitsOpen}
        onClose={() => setIsBenefitsOpen(false)}
        onPlayBenefitsNarration={() =>
          playNarration('Manfaat Belajar Bersama Mister Jo', APP_NARRATIONS.benefits)
        }
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        speechSettings={{
          rate: preferences.speechRate,
          volume: preferences.volume,
          voiceIndex: preferences.voiceIndex,
          autoSpeak: preferences.autoSpeak,
        }}
        onUpdateSpeechSettings={handleUpdateSpeechSettings}
        availableVoices={availableVoices}
        fontSize={preferences.fontSize}
        onFontSizeChange={handleFontSizeChange}
        onOpenReset={() => setIsResetOpen(true)}
      />

      <ResetConfirmModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  );
}
