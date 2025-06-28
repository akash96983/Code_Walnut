export class TimerAudio {
  private static instance: TimerAudio;
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  private constructor() {}

  static getInstance(): TimerAudio {
    if (!TimerAudio.instance) {
      TimerAudio.instance = new TimerAudio();
    }
    return TimerAudio.instance;
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async play(): Promise<void> {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.playLoop();
  }

  private async playLoop(): Promise<void> {
    if (!this.isPlaying) return;

    await this.playBeep();
    
    this.intervalId = window.setTimeout(() => {
      this.playLoop();
    }, 1000);
  }

  private async playBeep(): Promise<void> {
    try {
      await this.initializeAudioContext();
      
      if (!this.audioContext) {
        throw new Error('AudioContext not initialized');
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.5);

    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }

  stop(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }
}