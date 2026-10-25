/**
 * Mister Jo Web Speech Voice Engine
 * Master TKA Bahasa Indonesia 2026
 */

export interface SpeechSettings {
  rate: number; // 0.75, 1.0, 1.25
  volume: number; // 0 to 1
  voiceIndex: number;
  autoSpeak: boolean;
}

export const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  rate: 1.0,
  volume: 1.0,
  voiceIndex: 0,
  autoSpeak: false,
};

export class MisterJoVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private onStateChangeCallback: (() => void) | null = null;

  public isSpeaking: boolean = false;
  public isPaused: boolean = false;
  public currentTitle: string = '';
  public currentText: string = '';
  public settings: SpeechSettings = { ...DEFAULT_SPEECH_SETTINGS };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public setListener(cb: () => void) {
    this.onStateChangeCallback = cb;
  }

  private notify() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback();
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const all = this.synth.getVoices();
    // Prioritize Indonesian voices (id-ID)
    const idVoices = all.filter((v) => v.lang.toLowerCase().startsWith('id'));
    this.voices = idVoices.length > 0 ? idVoices : all;
    return this.voices;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    return this.voices;
  }

  public speak(title: string, text: string) {
    if (!text) return;
    this.stop();

    this.currentTitle = title;
    this.currentText = text;

    if (!this.synth) {
      this.isSpeaking = true;
      this.notify();
      return;
    }

    try {
      // Clean markdown tags or bullets before speaking for smooth audio
      const cleanText = text
        .replace(/[*_#`~[\]]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = this.settings.rate;
      utterance.volume = this.settings.volume;

      const available = this.getAvailableVoices();
      if (available.length > 0) {
        const v = available[this.settings.voiceIndex] || available[0];
        utterance.voice = v;
        utterance.lang = v.lang || 'id-ID';
      } else {
        utterance.lang = 'id-ID';
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.isPaused = false;
        this.notify();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.notify();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.notify();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error, falling back to transcript display:', e);
      this.isSpeaking = false;
      this.notify();
    }
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.notify();
  }

  public replay() {
    if (this.currentText) {
      this.speak(this.currentTitle, this.currentText);
    }
  }

  public updateSettings(partial: Partial<SpeechSettings>) {
    this.settings = { ...this.settings, ...partial };
    this.notify();
  }
}

// Global voice singleton instance
export const misterJoVoice = new MisterJoVoiceEngine();

// Pre-defined application narrations
export const APP_NARRATIONS = {
  welcome: `Halo, pejuang TKA! Selamat datang di Master TKA Bahasa Indonesia 2026, bersama Mister Jo! Di sini, kita tidak hanya belajar memilih jawaban yang benar. Kita akan belajar bagaimana membaca secara kritis, menemukan bukti, memahami makna tersembunyi, dan menaklukkan soal penalaran tingkat tinggi. Sudah siap mengasah kemampuan literasimu? Yuk, kita mulai perjalanan menjadi pembaca yang cerdas dan bernalar hebat!`,

  guide: `Halo, saya Mister Jo. Sebelum mulai, saya jelaskan cara menggunakan aplikasi ini. Pertama, bacalah stimulus dengan teliti. Kamu juga bisa mendengarkannya melalui tombol narator. Kedua, pahami pertanyaannya sebelum memilih jawaban. Ketiga, untuk pilihan ganda biasa, pilih satu jawaban terbaik. Untuk pilihan ganda kompleks, kamu boleh memilih beberapa jawaban. Untuk benar-salah, tentukan penilaian pada setiap pernyataan. Keempat, kirim jawabanmu dan pelajari pembahasan lengkap serta strategi cepatnya. Kelima, gunakan hasil analisis untuk mengetahui kemampuan yang perlu kamu tingkatkan. Progresmu tersimpan secara otomatis pada perangkat ini. Ingat, tujuan kita bukan menebak, tetapi membangun penalaran berdasarkan bukti. Semangat belajar!`,

  benefits: `Melalui latihan ini, kamu akan meningkatkan kemampuan menemukan gagasan utama, membuat inferensi, mengevaluasi argumen, mengapresiasi sastra, dan menghindari jebakan pilihan jawaban. Semakin teliti kamu membaca, semakin tajam kemampuan bernalarmu!`,
};
