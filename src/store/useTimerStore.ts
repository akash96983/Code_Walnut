import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../types/timer';

// Local storage key
const TIMERS_STORAGE_KEY = 'timer-app-timers';

// Load timers from localStorage
const loadTimersFromStorage = (): Timer[] => {
  try {
    const stored = localStorage.getItem(TIMERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load timers from localStorage:', error);
    return [];
  }
};

// Save timers to localStorage
const saveTimersToStorage = (timers: Timer[]) => {
  try {
    localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error('Failed to save timers to localStorage:', error);
  }
};

const initialState = {
  timers: loadTimersFromStorage(),
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      const newTimer = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      state.timers.push(newTimer);
      saveTimersToStorage(state.timers);
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);
      saveTimersToStorage(state.timers);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
        saveTimersToStorage(state.timers);
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer && timer.isRunning && timer.remainingTime > 0) {
        timer.remainingTime -= 1;
        // Only stop the timer when it reaches exactly 0
        if (timer.remainingTime <= 0) {
          timer.remainingTime = 0;
          timer.isRunning = false;
        }
        saveTimersToStorage(state.timers);
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
        saveTimersToStorage(state.timers);
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
        saveTimersToStorage(state.timers);
      }
    },
  },
});

const timerStore = configureStore({
  reducer: timerSlice.reducer,
});

export { timerStore };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};