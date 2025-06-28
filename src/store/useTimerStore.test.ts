import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { 
  addTimer, 
  deleteTimer, 
  toggleTimer, 
  updateTimer, 
  restartTimer, 
  editTimer 
} from '../store/useTimerStore';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

// Create a test store without localStorage to avoid side effects
const createTestStore = () => {
  const { timerSlice } = require('../store/useTimerStore');
  return configureStore({
    reducer: timerSlice.reducer,
  });
};

describe('Timer Store', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Create fresh store for each test
    const timerSlice = {
      name: 'timer',
      initialState: { timers: [] },
      reducers: {
        addTimer: (state: any, action: any) => {
          const newTimer = {
            ...action.payload,
            id: 'test-id-' + Date.now(),
            createdAt: Date.now(),
          };
          state.timers.push(newTimer);
        },
        deleteTimer: (state: any, action: any) => {
          state.timers = state.timers.filter((timer: any) => timer.id !== action.payload);
        },
        toggleTimer: (state: any, action: any) => {
          const timer = state.timers.find((timer: any) => timer.id === action.payload);
          if (timer) {
            timer.isRunning = !timer.isRunning;
          }
        },
        updateTimer: (state: any, action: any) => {
          const timer = state.timers.find((timer: any) => timer.id === action.payload);
          if (timer && timer.isRunning && timer.remainingTime > 0) {
            timer.remainingTime -= 1;
            if (timer.remainingTime <= 0) {
              timer.remainingTime = 0;
              timer.isRunning = false;
            }
          }
        },
        restartTimer: (state: any, action: any) => {
          const timer = state.timers.find((timer: any) => timer.id === action.payload);
          if (timer) {
            timer.remainingTime = timer.duration;
            timer.isRunning = false;
          }
        },
        editTimer: (state: any, action: any) => {
          const timer = state.timers.find((timer: any) => timer.id === action.payload.id);
          if (timer) {
            Object.assign(timer, action.payload.updates);
            timer.remainingTime = action.payload.updates.duration || timer.duration;
            timer.isRunning = false;
          }
        },
      },
    };

    store = configureStore({
      reducer: timerSlice.reducer,
    });
  });

  describe('addTimer', () => {
    it('should add a new timer to the store', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 300,
        isRunning: false,
      };

      store.dispatch(addTimer(newTimer));
      const state = store.getState();
      
      expect(state.timers).toHaveLength(1);
      expect(state.timers[0].title).toBe('Test Timer');
      expect(state.timers[0].description).toBe('Test Description');
      expect(state.timers[0].duration).toBe(300);
    });

    it('should generate unique IDs for multiple timers', () => {
      const timer1 = { title: 'Timer 1', description: '', duration: 60, remainingTime: 60, isRunning: false };
      const timer2 = { title: 'Timer 2', description: '', duration: 120, remainingTime: 120, isRunning: false };

      store.dispatch(addTimer(timer1));
      store.dispatch(addTimer(timer2));
      
      const state = store.getState();
      expect(state.timers).toHaveLength(2);
      expect(state.timers[0].id).not.toBe(state.timers[1].id);
    });
  });

  describe('deleteTimer', () => {
    it('should remove a timer from the store', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 300,
        isRunning: false,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(deleteTimer(timerId));
      state = store.getState();
      
      expect(state.timers).toHaveLength(0);
    });

    it('should not affect other timers when deleting one', () => {
      const timer1 = { title: 'Timer 1', description: '', duration: 60, remainingTime: 60, isRunning: false };
      const timer2 = { title: 'Timer 2', description: '', duration: 120, remainingTime: 120, isRunning: false };

      store.dispatch(addTimer(timer1));
      store.dispatch(addTimer(timer2));
      
      let state = store.getState();
      const firstTimerId = state.timers[0].id;

      store.dispatch(deleteTimer(firstTimerId));
      state = store.getState();
      
      expect(state.timers).toHaveLength(1);
      expect(state.timers[0].title).toBe('Timer 2');
    });
  });

  describe('toggleTimer', () => {
    it('should toggle timer running state from false to true', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 300,
        isRunning: false,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(toggleTimer(timerId));
      state = store.getState();
      
      expect(state.timers[0].isRunning).toBe(true);
    });

    it('should toggle timer running state from true to false', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 300,
        isRunning: true,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(toggleTimer(timerId));
      state = store.getState();
      
      expect(state.timers[0].isRunning).toBe(false);
    });
  });

  describe('updateTimer', () => {
    it('should decrease remaining time by 1 when timer is running', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 300,
        isRunning: true,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(updateTimer(timerId));
      state = store.getState();
      
      expect(state.timers[0].remainingTime).toBe(299);
      expect(state.timers[0].isRunning).toBe(true);
    });

    it('should stop timer when remaining time reaches 0', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 1,
        isRunning: true,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(updateTimer(timerId));
      state = store.getState();
      
      expect(state.timers[0].remainingTime).toBe(0);
      expect(state.timers[0].isRunning).toBe(false);
    });

    it('should not update timer when not running', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 300,
        isRunning: false,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(updateTimer(timerId));
      state = store.getState();
      
      expect(state.timers[0].remainingTime).toBe(300);
    });
  });

  describe('restartTimer', () => {
    it('should reset timer to original duration and stop it', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 150,
        isRunning: true,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      store.dispatch(restartTimer(timerId));
      state = store.getState();
      
      expect(state.timers[0].remainingTime).toBe(300);
      expect(state.timers[0].isRunning).toBe(false);
    });
  });

  describe('editTimer', () => {
    it('should update timer properties and reset to new duration', () => {
      const newTimer = {
        title: 'Test Timer',
        description: 'Test Description',
        duration: 300,
        remainingTime: 150,
        isRunning: true,
      };

      store.dispatch(addTimer(newTimer));
      let state = store.getState();
      const timerId = state.timers[0].id;

      const updates = {
        title: 'Updated Timer',
        description: 'Updated Description',
        duration: 600,
      };

      store.dispatch(editTimer({ id: timerId, updates }));
      state = store.getState();
      
      expect(state.timers[0].title).toBe('Updated Timer');
      expect(state.timers[0].description).toBe('Updated Description');
      expect(state.timers[0].duration).toBe(600);
      expect(state.timers[0].remainingTime).toBe(600);
      expect(state.timers[0].isRunning).toBe(false);
    });
  });
});
